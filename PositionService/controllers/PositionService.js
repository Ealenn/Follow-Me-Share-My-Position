'use strict';

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = require('../config.js').mongodb.url
var mongoOptions = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

var socketUrl = require('../config.js').socket.url
var io = require('socket.io-client');
var socket = io.connect(socketUrl, {reconnect: true});

var findDocuments = function(db, ean, callback) {
  // Get the documents collection
  var collection = db.collection('position');
  // Find some documents
  collection.find({ean: ean}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

var insertDocument = function(db, newPosition, callback) {
  // Get the documents collection
  var collection = db.collection('position');
  // Insert some documents
  collection.insert(newPosition, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

var deleteOldDocument = function(db, ean, callback) {
    // Get the documents collection
    var collection = db.collection('position');
    // Insert some documents
    collection.remove({ ean : ean }, function(err, result) {
      assert.equal(err, null);
      callback(err, result);
    });
}

/* ------------------------------ */

exports.posEanGET = function(args, res, next) {
  /**
   * Return the last position of EAN
   *
   * ean String Unique ean of object
   * returns Position
   **/
   MongoClient.connect(url, mongoOptions, function(err, db) {
     assert.equal(null, err);

     if(err) {
       console.log(err)
       res.end();
     }

     var ean = args.ean.value || 0;
     var collection = db.collection('position');

     collection.find({ean: ean}).toArray(function(err, docs) {
      console.log('view', err)
      assert.equal(err, null);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(docs));
    });

     db.close();
   });
}

exports.posPOST = function(args, res, next) {
  /**
   * Send position for EAN
   *
   * position Position The new position of object (EAN) (optional)
   * returns Position
   **/
   MongoClient.connect(url, mongoOptions, function(err, db) {
     assert.equal(null, err);

     if(err) {
       res.end();
     }

     var newPosition = args.Position.value || {};

     deleteOldDocument(db, newPosition.ean, function (e) {
       console.log('delete:', e)
     })
     insertDocument(db, newPosition, function (docs) {
       if(docs.result.ok){
         res.setHeader('Content-Type', 'application/json');
         socket.emit('newPosition', newPosition);
         res.end(JSON.stringify(newPosition));
       } else {
         res.end();
       }

     });

     db.close();
   });
}

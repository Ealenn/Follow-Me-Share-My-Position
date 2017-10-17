'use strict';

var url = require('url');

var Position = require('./PositionService');

module.exports.posEanGET = function posEanGET (req, res, next) {
  Position.posEanGET(req.swagger.params, res, next);
};

module.exports.posPOST = function posPOST (req, res, next) {
  Position.posPOST(req.swagger.params, res, next);
};

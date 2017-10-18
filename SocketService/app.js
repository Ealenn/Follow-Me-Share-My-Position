var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('New Client');
    client.on('newPosition', function(data) {
        console.log('[->]', data)
        io.emit('position', data);
    });
});

var PORT = process.env.PORT || 8070;

server.listen(PORT);

console.log('Socket server start at port %s', PORT);

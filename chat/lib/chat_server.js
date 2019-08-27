const socketio = require('socket.io');
let io;
let guestNumber = 1;
let nickNames = {};
let namesUsed = [];
let currentRoom = {};

module.exports.listen = function(server) {
  io = socketio.listen(server);
  io.set('log level', 1);
  io.sockets.on('connection', function(socket) {

    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    joinRoom(socket, 'Lobby');
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);

    socket.on('rooms', function() {
      socket.emit('rooms', io.sockets.manager.rooms);
    });

    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {

}

function joinRoom(socket, roomName) {

}

function handleMessageBroadcasting(socket, nickNames) {

}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {

}

function handleRoomJoining(socket) {

}

function handleClientDisconnection(socket, nickNames, namesUsed) {

}
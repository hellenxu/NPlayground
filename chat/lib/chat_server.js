const socketio = require("socket.io");
let io;
let guestNumber = 1;
let nickNames = {};
let namesUsed = [];
let currentRoom = {};

module.exports.listen = function(server) {
  io = socketio.listen(server);
  io.set("log level", 1);
  io.sockets.on("connection", function(socket) {

    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    joinRoom(socket, "Lobby");
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);

    socket.on("rooms", function() {
      socket.emit("rooms", io.sockets.manager.rooms);
    });

    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};

// region helper functions
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  const name = "Guest" + guestNumber;
  nickNames[socket.id] = name;
  socket.emit("nameResult", {
    success: true,
    name: name
  });
  namesUsed.push(name);
  return guestNumber + 1;
}

function joinRoom(socket, roomName) {
  socket.join(roomName);
  currentRoom[socket.id] = roomName;
  socket.emit("joinResult", { room: roomName });
  socket.broadcast.to(roomName).emit("message", {
    text: `${nickNames[socket.id]} has joined ${roomName}.`
  });
  const usersInRoom = io.sockets.clients(roomName);
  if (usersInRoom.length > 1) {
    let usersInRoomSummary = `Users currently in ${roomName}: `;
    const usersStr = usersInRoom.filter((user) => {
      return user.id !== socket.id;
    }).join(", ");

    usersInRoomSummary += `${usersStr}.`;
    socket.emit("message", { text: usersInRoomSummary });
  }
}

function handleMessageBroadcasting(socket) {
  socket.on("message", function(message) {
    socket.broadcast.to(message.room).emit("message", {
      text: `${nickNames[socket.id]}: ${message.text}`
    });
  });
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  socket.on("nameAttempt", function(name) {
    if (name.indexOf("Guest") === 0) {
      socket.emit("nameResult", {
        success: false,
        message: "Names cannot begin with \"Guest\"."
      });
    } else {
      if (namesUsed.indexOf(name) === -1) {
        const previousName = nickNames[socket.id];
        const previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex];
        socket.emit("nameResult", {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit("message", {
          text: `${previousName} is now known as ${name}.`
        });
      } else {
        socket.emit("nameResult", {
          success: false,
          message: "That name is already in use."
        });
      }
    }
  });
}

function handleRoomJoining(socket) {

}

function handleClientDisconnection(socket, nickNames, namesUsed) {

}

// endregion
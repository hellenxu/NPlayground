const connect = require("socket.io").connect;

function divEscapedContent(message) {
  return $("<div></div>").text(message);
}

function divSystemContent(message) {
  return $("<div></div>").html(`<i>${message}</i>`);
}

function processInput(chatApp, socket) {
  const message = $("#send-message").val();
  let sysMessage;

  if (message.charAt(0) === "/") {
    sysMessage = chatApp.processCommand(message);
    if (sysMessage) {
      $("#messages").append(divSystemContent(sysMessage));
    }
  } else {
    chatApp.sendMessage($("#room").text(), message);
    $("#messages").append(divEscapedContent(message));
    // $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }

  // $('#send-message').val('');
}

const socket = connect();
$(document).ready(function() {
  const chatApp = new Chat(socket);

  socket.on('nameResult', function(result) {
    let message;
    if (result.success) {
      message = 'You are now known as ' + result.name + '.';
    } else {
      message = result.message;
    }
    $('#messages').append(divSystemContent(message));
  });

  socket.on('joinResult', function(result) {
    $('#room').text(result.room);
    $('#messages').append(divSystemContent('Room changed.'));
  });

  socket.on('message', function (message) {
    const newElement = $('<div></div>').text(message.text);
    $('#messages').append(newElement);
  });

  socket.on('rooms', function(rooms) {
    $('#room-list').empty();
    rooms.forEach((room) => {
      const formattedRoom = room.substring(1, room.length);
      if (formattedRoom !== '') {
        $('#room-list').append(divEscapedContent(formattedRoom));
      }
    });

    $('#room-list div').click(function() {
      chatApp.processCommand('/join ' + $(this).text());
      $('#send-message').focus();
    });
  });

  setInterval(function() {
    socket.emit('rooms');
  }, 1000);

  $('#send-message').focus();

  $('#send-form').submit(function() {
    processInput(chatApp, socket);
    return false;
  });

});

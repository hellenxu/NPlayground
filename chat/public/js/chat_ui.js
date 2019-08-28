function divEscapedContent(message) {
  return $('<div></div>').text(message);
}

function divSystemContent(message) {
  return $('<div></div>').html(`<i>${message}</i>`);
}

function processInput(chatApp, socket) {
  const message = $('#send-message').val();
  let sysMessage;

  if (message.charAt(0) === '/') {
    sysMessage = chatApp.processCommand(message);
    if (sysMessage) {
      $('#messages').append(divSystemContent(sysMessage));
    }
  } else {
    chatApp.sendMessage($('#room').text(), message);
    $('#messages').append(divEscapedContent(message));
    // $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }

  // $('#send-message').val('');
}
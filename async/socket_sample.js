const net = require('net');

// net.createServer(socket => {
//   socket.on('data', (data) => {
//     socket.write(data);
//   });
// }).listen(4008);

//socket#once only responds to a single event
// net.createServer(socket => {
//   socket.once('data', (data) => {
//     socket.write(data);
//   });
// }).listen(4008);

const events = require('events');

const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', (id, client) => {
  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) {
      this.clients[id].write(message);
    }
  };
  this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', (id) => {
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + ' has left the chat. \n');
});

const server = net.createServer((client) => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  client.on('connect', () => {
    channel.emit('join', id, client);
  });
  client.on('data', (data) => {
    data = data.toString();
    channel.emit('broadcast', id, data);
  });
  client.on('close', () => {
    channel.emit('leave', id)
  })
});

server.listen(4008);
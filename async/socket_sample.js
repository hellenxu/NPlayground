const net = require('net');

// net.createServer(socket => {
//   socket.on('data', (data) => {
//     socket.write(data);
//   });
// }).listen(4008);

//socket#once only responds to a single event
net.createServer(socket => {
  socket.once('data', (data) => {
    socket.write(data);
  });
}).listen(4008);
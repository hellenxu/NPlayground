const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('hello', () => {
  console.log(`Hi, hello events`);
});
eventEmitter.emit('hello');

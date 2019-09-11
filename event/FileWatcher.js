const events = require('events');
const fs = require('fs');
// const util = require('util');

// es6 uses extends to inherit another object's behaviors.
class FileWatcher extends events.EventEmitter{
  constructor(watchDir, processedDir) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }

  watch() {
    const watcher = this;
    fs.readdir(this.watchDir, ((err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        watcher.emit('process', file);
      });
    }));
  }

  start() {
    const watcher = this;
    fs.watchFile(this.watchDir, () => {
      watcher.watch();
    });
  }

  process(file) {
    const watchFile = `${this.watchDir}/${file}`;
    const processedFile = `${this.processedDir}/${file.toLowerCase()}`;
    fs.rename(watchFile, processedFile, (err) => {
      if (err) throw err;
    });
  }

}

// old way to inherit another object's behaviors
// util.inherits(FileWatcher, events.EventEmitter);

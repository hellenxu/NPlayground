const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const rssFeeds = '../data/rss_feeds.txt';

function checkForRSSFile() {
  if (fs.existsSync(rssFeeds)) {
    next(null, rssFeeds);
  } else {
    return next(new Error(`Missing RSS file: ${rssFeeds}`));
  }
}

function readRSSFile(filePath) {
  fs.readFile(filePath, (err, feedList) => {
    if (err) throw next(err);

    feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFeed(feedUrl) {
  request({uri: feedUrl}, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode !== 200) {
      return next(new Error('Abnormal response status code'))
    }
    next(null, body);
  });
}

function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);

  if (!handler.dom.items.length) {
    return next(new Error('No RSS items found'));
  }

  const item = handler.dom.items.shift();
  console.log(`title: ${item.title}`);
  console.log(`link: ${item.link}`);
}

const tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];
function next(err, result) {
  if (err) throw err;
  const currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

next();
const Discord = require("discord.js");
var RSS = require('rss');
const config = require("./config.json");
var fs = require('fs');
const express = require('express');

const client = new Discord.Client();

client.login(config.BOT_TOKEN);

let feed;
let firstMessage;

let app;
let port = 3000;

if (config.WEB_SERVER == "enabled") {
  app = express();

  app.use('/rss', express.static('rss'));

  app.listen(port, () => {
  console.log(`RSS server listening at http://localhost:${port}`)
  });

}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

client.on("message", function(message) {
  if (!firstMessage) { firstMessage = true, console.log("First Message!"); createFeed('Test', 'Test')}

  var author = message.author.username;
  var channel = message.channel.name;
  var text = message.content;

  console.log(`[${channel}] ${author}: ${text}`);

  addMessage(author, channel, text);
  updateRSS();
});

function addMessage(author, channel, message) {
  var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
  feed.item({
    title:  `[${channel}] ${author}: ${message}`,
    description: 'use this for the content. It can include html.',
    author: author, // optional - defaults to feed author property
    date: getDate(), // any format that js Date can parse.
 });
}

function createFeed(title, description) {
  feed = new RSS({
    title: title,
    description: description,
    feed_url: 'http://example.com/rss.xml',
    site_url: 'https://discord.com',
    language: 'en'
  });
}

function updateRSS() {
  fs.writeFile("rss/" + config.RSS_FILE, feed.xml(), function (err) {
  if (err) throw err;
  console.log('Saved Changes');
});
}

function getDate() {
  var now = new Date();
  return `${months[now.getMonth() - 1]} ${now.getDay()}, ${now.getFullYear()}`
}

console.log(`Creating Feed at ${config.RSS_FILE}`);
createFeed()
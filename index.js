'use strict'

const app = require('app');
const Browser = require('browser-window');
const clipboard = require("clipboard");
const twitter = require("./lib/tweet");



require('crash-reporter').start();
let mainWindow = null;
const ipc = require("electron").ipcMain;
app.on('window-all-closed', () => app.quit());
app.on('ready',() => {
  // twitter.publicStream().on("tweet",(tweet) => {
  //     mainWindow.webContents.send("tweet", JSON.stringify(tweet));
  // });
	mainWindow = new Browser({
		width: 600,
    height: 300,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
		});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	mainWindow.on('closed',() => mainWindow = null)
})

ipc.on("post" ,(sys,tweet) => {
 var tw = JSON.parse(tweet);
  tw = twitter.post(tw);
})

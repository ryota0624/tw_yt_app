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
  twitter.stream().on("tweet",(tweet) => {
      mainWindow.webContents.send("tweet", JSON.stringify(tweet));
  });
	mainWindow = new Browser({
		width: 800,
    height: 700,
    'min-width': 800,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
		});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	mainWindow.on('closed',() => {
		mainWindow = null
		 app.quit()
	})
})

ipc.on("post" ,(sys,tweet) => {
 var tw = JSON.parse(tweet);
  tw = twitter.post(tw);
})

let subWindows = [];
let windowNum = 0;
ipc.on("open-tweet" ,(sys,tweet) => {
 var newWindow_s = true;
 if(newWindow_s){
	((windowNum) => {
		 	newWindow_s = false;
  subWindows[windowNum] = new Browser({
	width: 350,
 	height: 300, 
	show: false,
	'accept-first-mouse': true,
  'title-bar-style': 'hidden'
	});
	subWindows[windowNum].on('closed', () => {
   subWindows[windowNum] = null; 
   newWindow_s = true;
  });

  subWindows[windowNum].loadUrl('file://' + __dirname + '/tweetWindow.html');
  subWindows[windowNum].show();
	setTimeout(() => subWindows[windowNum].webContents.send("tweet", {tweet, windowNum} ),1000);
	})(windowNum);
	windowNum++;
  }
})

ipc.on('close-tweet', (sys, num) => {
	subWindows[num].close();
})
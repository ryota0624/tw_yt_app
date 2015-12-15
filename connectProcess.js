var ipc = require("electron").ipcRenderer;
window.ipc = ipc;
var remote = require("remote");
window.remote = remote;
var clipboard = require("clipboard");
window.clipboard = clipboard;
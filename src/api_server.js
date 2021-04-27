/* eslint-disable no-undef */
/**
 * ws-server-express
 * Server sockets for ERPNext and Sockets.IO
 * author: Enrique Motilla <e@quad-tree.com>
 * last update: 2021-04-27 17:54
 */

const express = require('express');
const socketIO = require('socket.io');
const PORT = 9075;

const server = express()
  // .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server, {
  transports: ["polling"]
});


/**
 * Socket IO connection ***********************************************
 */
io.on('connection', (socket) => {
  var socketClient = socket.handshake.headers.origin
  console.log('Client connected    >>> ' + socketClient);
  socket.on('disconnect', () => console.log('Client disconnected <<< ' + socketClient));

  var log = function (options) {
    // log options init
  }
  log.prototype.constructor = log;
  log.prototype.console = function (text) {
    console.log(text + text)
  }
  var log = new log;


  socket.on('/qrcode/svg', async (msg) => {
    try {
      //console.log("/qrcode/svg OK");
      var qr = require("./qrcode_functions");
      var response = await qr.svg(msg);
      log.console(`${msg.route}: ${msg.text} = ${response}`)
      socket.emit(msg.route, response);
    } catch (error) {
      log.console(`ERROR: ${msg.route} = ${error}`)
    }
  });

  socket.on('/qrcode/png', async (msg) => {
    try {
      var qr = require("./qrcode_functions");
      var response = await qr.png_dataUrl(msg);
      log.console(`${msg.route}: ${msg.text} = ${response}`)
      socket.emit(msg.route, response);
    } catch (error) {
      log.console(`ERROR: ${msg.route} = ${error}`)
    }
  });

  socket.on('/bpm/task', async (msg) => {
    try {
      console.log("/bpm/task OK");
      log.console(`${msg.route}: ${JSON.stringify(msg.data)} ... task`)
      var response = "task......OK"
      socket.emit(msg.route, response);
    } catch (error) {
      log.console(`ERROR: ${msg.route} = ${error}`)
    }
  });


});
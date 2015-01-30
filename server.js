"use strict";
/*
 Run server.js to launch an app.js node instance on each CPU of the machine
 */

var cluster = require('cluster');

if (cluster.isMaster) {
  require('os').cpus().forEach(function () {
    cluster.fork();
  });
  cluster.on('death', function (worker) {
    console.log('worker ' + worker.pid + ' died');
    cluster.fork();
  });
} else {
  require('./app');
}
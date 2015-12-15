#! /usr/bin/env node

var spawn = require('child_process').spawn;
var command = './node_modules/.bin/webpack --config webpack.config.production.js';
var build = spawn('/bin/sh', ['-c', command], { stdio: [0,1,2] });

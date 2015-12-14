#! /usr/bin/env node

var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout); }
exec('cd ./page', puts);
exec('git status', puts);

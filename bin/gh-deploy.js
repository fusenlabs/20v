#! /usr/bin/env node

var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout); }
var copyFilesCommands = [
    'cp ./index.html ./page/',
    //'cp -r ./style/fonts/ ./page/',
    //'cp ./style/style.css ./page/style/',
    'rm -rf ./page/static',
    'cp -r ./dist/ ./page/static/',
].join(' && ');

var gitCommands = [
    'cd ./page',
    'git add -A',
    'git commit -a -m \'gh-pages update\'',
    'git push origin gh-pages --force'
].join(' && ');

exec(copyFilesCommands, puts);
exec(gitCommands, puts);

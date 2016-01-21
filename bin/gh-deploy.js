#! /usr/bin/env node

var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
    if (stderr) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
}

var copyFilesCommands = [
    'cp -R ./public/* ./page/',
    'rm -rf ./page/static',
    'cp -r ./dist/ ./page/static/',
    'rm page/.git/index.lock'
].join(' && ');

var gitCommands = [
    'cd ./page',
    'git add -A',
    'git commit -a -m "gh-pages update"',
    'git push origin gh-pages --force'
].join(' && ');

exec(copyFilesCommands, puts);
exec(gitCommands, puts);

'use strict';

var fs = require('fs');
var rimraf = require('rimraf');
var should = require('should');
var exec = require('child_process').exec;

module.exports = function(git) {


  beforeEach(function(done) {
    var repo = 'https://github.com/stephenlacy/gulp-git';
    git.clone(repo, {args: './test/tmp'}, function() {
      exec('git update-ref -d refs/tags/1.1.0', {cwd: './test/tmp'}, function(err) {
        if (err) return done(err);
        done();
      });
    });
  });

  it('should fetch a tag from remote origin', function(done) {
    git.fetch('origin', '', {cwd: './test/tmp'}, function() {
      fs.open('./test/tmp/.git/refs/tags/1.1.0', 'r', function(err, fd) {
        should.not.exist(err);
        fs.close(fd, function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    rimraf('./test/tmp', function(err) {
      if (err) return done(err);
      done();
    });
  });
};

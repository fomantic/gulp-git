'use strict';

// omit logging
var mock = require('mock-require');
mock('fancy-log', function() {});

var path = require('path');
var rimraf = require('rimraf');
var git = require('../');

// just so this file is clean
var util = require('./_util');

describe('gulp-git', function() {

  var testSuite = util.testSuite();

  testSuite.forEach(function(file) {
    var suite = path.basename(file, path.extname(file));
    describe(suite, function() {
      // the actual suite code
      if (/\.js$/.test(file)) {
        require('./' + file)(git, util);
      }
    });
  });

  // wipe
  after(function(done) {
    rimraf('./test/repo').then(function() {
      done();
    });
    done();
  });
});

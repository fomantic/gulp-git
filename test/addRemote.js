'use strict';

var fs = require('fs');

module.exports = function(git) {

  it('should add a Remote to the git repo', function(done) {
    var opt = {cwd: './test/repo/'};
    var origin = 'https://github.com/stephenlacy/gulp-git';
    git.addRemote('origin', origin, opt, function() {
      fs.statSync('./test/repo/.git/');
      fs.readFileSync('./test/repo/.git/config')
        .toString('utf8')
        .should.match(/https:\/\/github.com\/stephenlacy\/gulp-git/);
      done();
    });
  });

};

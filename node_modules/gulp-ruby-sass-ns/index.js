'use strict';

module.exports = function (options) {
  var spawn = require('win-spawn'),
      gutil = require('gulp-util'),
      sass = new require('stream').Transform({ objectMode: true }),
      path = require('path'),
      dargs = require('dargs'),
      sassCmd;

  options = options || {};

  sass._transform = function(file, enc, cb) {
    var defaults = [ '--load-path', file.base, '--stdin' ];
    var err = new Buffer(0);

    if (path.extname(file.path) === '.scss')
      defaults.unshift('--scss');

    options = dargs(options).concat(defaults);
    sassCmd = spawn('sass', options);

    sassCmd.stderr.on('data', function(data) {
      err = Buffer.concat(
        [err, data], err.length + data.length
      );
    });

    sassCmd.on('close', function(code) {
      if (err.length) sass.emit(
        'error', new gutil.PluginError(
          'gulp-ruby-sass-ns', err.toString()
        )
      );
      else if (code > 0) sass.emit(
      'error', new gutil.PluginError(
        'gulp-ruby-sass-ns', 'Exited with error code ' + code
      )
    );
    });

    file.pipe(sassCmd.stdin);

    file.contents = sassCmd.stdout;
    file.path = gutil.replaceExtension(file.path, '.css');

    sass.push(file);
    cb();
  };

  return sass;
};

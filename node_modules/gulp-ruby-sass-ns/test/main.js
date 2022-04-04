'use strict';

var plugin = require('..'),
    File = require('gulp-util').File,
    es = require('event-stream'),
    fs = require('fs'),
    EOL = require('os').EOL,
    css = 'body {' + EOL + '  background: yellow; }' + EOL,
    path = require('path'),
    scss,
    sass;

require('should');

describe('gulp-ruby-sass-ns', function() {
  beforeEach(function() {
    scss = new File({
      cwd: __dirname,
      base: __dirname,
      path: __dirname + '/fixtures/main.scss',
      contents: fs.createReadStream(__dirname + '/fixtures/main.scss')
    });
    sass = new File({
      cwd: __dirname,
      base: __dirname,
      path: __dirname + '/fixtures/main.sass',
      contents: fs.createReadStream(__dirname + '/fixtures/main.sass')
    });
  });
  it('works on streams', function(done) {
    es.readable(function(ct, cb) {
      this.emit('data', scss);
      this.emit('end');
      cb();
    })
    .pipe(plugin())
    .on('data', function(file) {
      file.pipe(es.map(function(data, cb) {
        data.toString().should.equal(css);
        cb();
        done();
      }));
    });
  });
  it('works on buffers', function(done) {
    es.readable(function(ct, cb) {
      scss.contents = fs.readFileSync(__dirname + '/fixtures/main.scss');
      this.emit('data', scss);
      this.emit('end');
      cb();
    })
    .pipe(plugin())
    .on('data', function(file) {
      file.pipe(es.map(function(data, cb) {
        data.toString().should.equal(css);
        cb();
        done();
      }));
    });
  });
  it('works for .sass', function(done) {
    es.readable(function(ct, cb) {
      this.emit('data', sass);
      this.emit('end');
      cb();
    })
    .pipe(plugin())
    .on('data', function(file) {
      file.pipe(es.map(function(data, cb) {
        data.toString().should.equal(css);
        cb();
        done();
      }));
    });
  });
  it('changes extension to .css', function(done) {
    es.readable(function(ct, cb) {
      this.emit('data', scss);
      this.emit('end');
      cb();
    })
    .pipe(plugin())
    .on('data', function(file) {
      path.basename(file.path).should.equal('main.css');
      done();
    });
  });
  it('supports options', function(done) {
    es.readable(function(ct, cb) {
      this.emit('data', scss);
      this.emit('end');
      cb();
    })
    .pipe(plugin({ style: 'compact' }))
    .on('data', function(file) {
      file.pipe(es.map(function(data, cb) {
        data.toString().should.equal('body { background: yellow; }' + EOL);
        cb();
        done();
      }));
    });
  });
});

- uses standard input & output instead of temp files
- no support for sourcemaps (use [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass))

### Install
```
npm install --save-dev gulp-ruby-sass-ns
```

### rubySass([options])

- `options` passed along the sass command

### Example

```
gulp.src('styles/*.scss')
.pipe(rubySass({ style: 'compact' })
.pipe(gulp.dest('dist/styles'));
```

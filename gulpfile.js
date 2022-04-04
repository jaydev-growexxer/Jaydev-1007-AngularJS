const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

gulp.task("styles", () => {
  return gulp
    .src("assets/styles/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./assets/styles/css/"));
});

gulp.task("default", gulp.series(["styles"]));

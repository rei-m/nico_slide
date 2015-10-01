var gulp = require('gulp'),
    bower = require('bower'),
    bowerFiles = require('main-bower-files');

// Bowerインストール用のタスク.
gulp.task('bower', function() {
  bower.commands.install().on('end', function () {
    return gulp
      .src(bowerFiles())
      .pipe(gulp.dest('js/lib'));
  });
});

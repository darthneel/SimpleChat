var gulp = require('gulp');

//Plugins
var browserify = require('browserify');
var reactify = require('reactify')
var source = require('vinyl-source-stream');


// Default
gulp.task('default', ['js', 'watch']);

// Browserify
gulp.task('js', function() {
  browserify('./public/js/uncompiled/script.js')
    .transform(reactify) 
    .bundle()
    .pipe(source('bundled.js'))
    .pipe(gulp.dest('public/js'));
});

 
// Watchers 
gulp.task('watch', function() {
    gulp.watch('public/js/uncompiled/*', ['js']);
});

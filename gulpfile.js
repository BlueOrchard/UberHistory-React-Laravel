var gulp = require('gulp');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');
var wait = require('gulp-wait');

var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var devCSS = 'dev/css/';
var devJS = 'dev/js/';

gulp.task('cssPack', function() {
    var sassFiles,
        cssFiles,
        themeInfo;

    sassFiles = gulp.src(devCSS + 'style-style-main.scss')
        .pipe(wait(500))
        .pipe(sass());

    cssFiles = gulp.src(devCSS + '*.css');

    return merge(sassFiles, cssFiles)
           .pipe(concat('style.css'))
           .pipe(prefix())
           .pipe(gulp.dest("."));
});

gulp.task('packReact', function(){
    //process.env.NODE_ENV = 'production';
    return browserify({
            entries: [devJS + 'app.js']
        })
        .transform(babelify.configure({
            presets : ["react", "es2015", "stage-0"],
            plugins: [
                "transform-decorators-legacy",
            ]
        }))
        .bundle()
        .pipe(source('bundle.js'))
        //.pipe(streamify(uglify()))
        .pipe(gulp.dest('public/js/'));
})

gulp.task('default', ['cssPack', 'packReact'], function() {
    gulp.watch(devCSS + '*.css', ['cssPack']);
    gulp.watch(devCSS + '*.scss', ['cssPack']);
    gulp.watch(devCSS + 'import/*.scss', ['cssPack']);

    gulp.watch(devJS + '*.js', ['packReact']);
    gulp.watch(devJS + 'components/*.js', ['packReact']);
    gulp.watch(devJS + 'routes/*.js', ['packReact']);
    gulp.watch(devJS + 'store/*.js', ['packReact']);
})
'use strict';
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    series = require('stream-series');
var clean = require('gulp-clean');
var sass = require('gulp-sass'),
    nib = require('nib'),
    minifyCss = require('gulp-minify-css'),
    uncss = require('gulp-uncss');
var eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify');

var wiredep = require('wiredep').stream,
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files');


// server
gulp.task('server', function () {
    connect.server({
        root: './',
        hostname: '0.0.0.0',
        port: 8000,
        livereload: true
    });
});

//enlint
gulp.task('eslint', function () {
    return gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

// scss
gulp.task('css', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

// html
gulp.task('html', function () {
    gulp.src('./src/views/**/*.html')
    .pipe(gulp.dest('./dist/views'))
        .pipe(connect.reload());
});

// inject
gulp.task('inject', ['wiredep'], function () {
    var utilStream = gulp.src(['./dist/*.js', '!./dist/app.module.js'], {
        read: false
    });
    var appStream = gulp.src(['./dist/app.module.js'], {
        read: false
    });
    gulp.src('./dist/index.html')
        .pipe(inject(series(appStream, utilStream), {
            relative: true
        }))
        .pipe(inject(
            gulp.src(['./dist/*.css'], {
                read: false
            }), {
                relative: true
            }
        ))
        .pipe(gulp.dest('./dist'));
});

// wiredep
gulp.task('wiredep', function () {
    gulp.src('./dist/index.html')
        .pipe(wiredep({
            directory: './lib',
            exclude: [/requirejs/]
        }))
        .pipe(gulp.dest('./dist'));
});

// useref
gulp.task('compress', function () {
    gulp.src('./dist/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify({
            mangle: true
        })))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('./dist'));
});

// uncss
gulp.task('uncss', function () {
    gulp.src('./dist/app.css')
        .pipe(uncss({
            html: ['./dist/index.html']
        }))
        .pipe(gulp.dest('./dist'));
});

// copy
//gulp.task('copy', ["clean"], function () {
gulp.task('copy', function () {//
    // gulp.src('./lib/bootstrap/fonts/**')
    //     .pipe(gulp.dest('./dist/fonts'));
    // gulp.src('./lib/font-awesome/fonts/**')
    //     .pipe(gulp.dest('./dist/fonts'));
    //
    gulp.src('./src/index.html')
        //.pipe(useref())
        .pipe(gulp.dest('./dist'));
    gulp.src('./src/**/*.png')
        //.pipe(useref())
        .pipe(gulp.dest('./dist'));
    
});

// watch
gulp.task('watch', function () {
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/**/*.scss'], ['css', 'inject']);
    gulp.watch(['./src/**/*.js', './gulpfile.js'], ['eslint', 'inject']);
    //gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task("clean", function () {
    gulp.src('./dist/*')
        .pipe(clean());
});

// index
gulp.task('index', function () {
    var utilStream = gulp.src(['./src/*.js', '!./src/app.module.js'], {
        read: false
    });
    var appStream = gulp.src(['./src/views/visualStation/components/gis/extend/interactionSelect.js','./src/app.module.js'], {
        read: false
    });
    // inject  // wiredep
    gulp.src('./src/index.html')
        .pipe(wiredep({
            directory: './lib',
            exclude: [/angular-leaflet-directive/, /angularAMD/, /requirejs/]
        }))
        .pipe(inject(series(appStream, utilStream), {
            relative: true
        }))
        .pipe(inject(
            gulp.src(['./src/*.css'], {
                read: false
            }), {
                relative: true
            }
        ))
        //.pipe(useref())
        .pipe(gulp.dest('./dist'));
});

//gulp.task('default', ['server', 'eslint', 'inject', 'wiredep', 'watch']);
//gulp.task('default', ['server', 'watch']);
gulp.task('build', ['copy', 'uncss']); // 'compress', "clean", 
gulp.task('default', ['server', 'css', 'eslint', 'html', 'index', 'watch']); // 'server', 'eslint', , 'watch'



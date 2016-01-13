/* eslint-env node */
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

var webpackOptions = {
    output: {
        filename: 'touch-imagelightbox.js',
        library: 'LightBox',
        libraryTarget: "var"
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

gulp.task('pack', function() {
    return gulp.src('./src/LightBox.js')
        .pipe(webpack(webpackOptions))
        //.pipe(gulp.dest('./dist'));
        .pipe(gulp.dest('./demo'));
});

gulp.task('default', ['pack']);

gulp.task('watch', function () {
    //gulp.watch('./src/LightBox.js', ['pack'])

    webpackOptions.watch = true;

    return gulp.src('./src/LightBox.js')
        .pipe(webpack(webpackOptions))
        //.pipe(gulp.dest('./dist'));
        .pipe(gulp.dest('./demo'));
});

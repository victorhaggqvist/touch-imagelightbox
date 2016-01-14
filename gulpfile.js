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

gulp.task('style', function () {
    return gulp.src('./style/touch-imagelightbox.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./demo'));
});

var webpackOptions = {
    entry: {
        ActivityIndicator: './src/Plugins/ActivityIndicator.js',
        Overlay: './src/Plugins/Overlay.js',
        CloseButton: './src/Plugins/CloseButton.js',
        Core: './src/LightBox.js'
    },
    output: {
        filename: "LightBox.[name].js",
        library: ["LightBox", "[name]"],
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
    return gulp.src('').pipe(webpack(webpackOptions)).pipe(gulp.dest('./demo'));

    //return gulp.src(['./src/LightBox.js', './src/Plugins/*.js'])
    //    .pipe(webpack(webpackOptions))
    //    //.pipe(gulp.dest('./dist'));
    //    .pipe(gulp.dest('./demo'));
});

gulp.task('default', ['pack']);

gulp.task('watch', function () {
    //gulp.watch('./src/LightBox.js', ['pack'])

    webpackOptions.watch = true;

    gulp.src('').pipe(webpack(webpackOptions)).pipe(gulp.dest('./demo'));

    //return gulp.src(['./src/LightBox.js', './src/Plugins/*.js'])
    //    .pipe(webpack(webpackOptions))
    //    //.pipe(gulp.dest('./dist'));
    //    .pipe(gulp.dest('./demo'));
});

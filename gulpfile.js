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
        Captions: './src/Plugins/Captions.js',
        Navigation: './src/Plugins/Navigation.js',
        Core: './src/LightBox.js'
    },
    output: {
        filename: 'LightBox.[name].js',
        library: ['LightBox','[name]'],
        libraryTarget: "var"
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['add-module-exports']
                }
            }
        ]
    }
};

gulp.task('pack', function() {
    return gulp.src('')
        .pipe(webpack(webpackOptions))
        .pipe(gulp.dest('./demo'));
});

gulp.task('default', ['pack']);

gulp.task('watch', function () {
    webpackOptions.watch = true;
    gulp.src('')
        .pipe(webpack(webpackOptions))
        .pipe(gulp.dest('./demo'));
});

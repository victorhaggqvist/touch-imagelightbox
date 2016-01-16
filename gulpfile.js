/* eslint-env node */
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var concat = require('gulp-concat');
var header = require('gulp-header');
var rename = require('gulp-rename');
var exec = require('child_process').exec;

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

gulp.task('watch', function () {
    webpackOptions.watch = true;
    gulp.src('')
        .pipe(webpack(webpackOptions))
        .pipe(gulp.dest('./demo'));
});

gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('uglify', ['pack', 'clean'], function() {
    return gulp.src('./demo/LightBox.*.js')
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('dist'));
});

var bannerPlugins = ['/**',
  ' * Image LightBox Plugins - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' * @author <%= pkg.authors%>',
  ' */',
  ''].join('\n');

gulp.task('buildjs', ['uglify'], function() {
    return gulp.src(['./dist/LightBox.*.js', '!./dist/LightBox.Core.js', '!./dist/LightBox.Plugins.js'])
        .pipe(concat('LightBox.Plugins.js'))
        .pipe(rename({suffix: ".min"}))
        .pipe(header(bannerPlugins, { pkg : pkg }))
        .pipe(gulp.dest('./dist'));
});

var banner = ['/**',
  ' * Image LightBox - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' * @author <%= pkg.authors%>',
  ' */',
  ''].join('\n');

var pkg = require('./bower.json');
gulp.task('makecore', ['buildjs'], function() {
    gulp.src(['./dist/LightBox.Core.min.js'])
        .pipe(header(banner, { pkg : pkg }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('csso', ['style'], function() {
    return gulp.src('./demo/touch-imagelightbox.css')
        .pipe(csso())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
    exec('rm -r dist');
});

gulp.task('build', ['makecore','csso']);

gulp.task('default', ['pack']);

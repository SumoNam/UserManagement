"use strict"

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint = require('gulp-eslint'); 
var sass = require('gulp-sass');

var config = {
	port: 8888,
	devBaseUrl: 'http://localhost',
	paths:{
		html: './src/*.html',
		js: './src/**/*.js',
    images: './src/images/*',
    scss: './src/styles/**/*.scss',
    fonts: './src/fonts/*',
		dist: './dist',
		mainJs: [
      './src/main.js',
      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      './src/utils/utils.js'
    ]	
}};

gulp.task('connect', function() {
    connect.server({
    	root:['dist'],
    	port: config.port,
    	base: config.devBaseUrl,
    	livereload: true
    })
});


gulp.task('open',['connect'], function() {
    gulp.src('dist/index.html')
      .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
    	.transform(reactify)
    	.bundle()
    	.on('error', console.error.bind(console))
    	.pipe(source('bundle.js'))
    	.pipe(gulp.dest(config.paths.dist + '/scripts'))
    	.pipe(connect.reload())
});

gulp.task('sass', function () {
  return gulp.src(config.paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
    gulp.src(config.paths.images)
      .pipe(gulp.dest(config.paths.dist + '/images'))
      .pipe(connect.reload());
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
      .pipe(lint({config: 'eslint.config.json'}))
      .pipe(lint.format());
});

gulp.task('fonts', function() {
    gulp.src(config.paths.fonts)
      .pipe(gulp.dest(config.paths.dist + '/fonts'))
      .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js','lint']);
    gulp.watch(config.paths.scss, ['sass']);
});

gulp.task('default',['js', 'html', 'images', 'sass', 'fonts', 'lint','watch','open']);
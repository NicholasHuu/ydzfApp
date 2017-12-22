var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var del = require('del');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var runSequence = require('run-sequence');

gulp.task('serve', ["gulpInject"], function() {
    browserSync.init({
        server: "./www"
    });
    
    gulp.watch("./www/index.html").on('change', browserSync.reload);
    gulp.watch("src/**/*.js",["gulpInject"]);
    gulp.watch("src/**/*.scss",["gulpInject"]);
    gulp.watch("src/**/*.html",["updateHtml"]).on('change', browserSync.reload);
});

gulp.task('refBowerComponents',function() {
    gulp.src('src/**/*').pipe(gulp.dest('www'));
    setTimeout(function () {
        del(['www/app/**/*.scss','www/app/**/**/*.scss']);
    },500);
});

gulp.task('clean', function () {
    del("www/*");
});

gulp.task('gulpInject',["webpack","sass"],function() {
	var target = gulp.src('./www/index.html');
	var sources = gulp.src([
		'./www/*.js',
        './www/lib/*.js',
		'./www/*.css'], {read: false},{relative: true});
	return target.pipe(inject(sources,{ignorePath:"/www"})).pipe(gulp.dest('./www'));
});

gulp.task("updateHtml",function () {
	return gulp.src("src/app/**/*.html")
		.pipe(gulp.dest("www/app"))
});

gulp.task('jsBabel',function() {
    return gulp.src(['src/app/**/*.js','src/app/**/**/*.js'])
               .pipe(babel({
		            presets: ['es2015']
		        }))
		       .pipe(gulp.dest('www/app'));     
});

gulp.task('webpack', ["jsBabel"], function() {
  return gulp.src(['www/app/**/*.js','www/app/**/**/*.js'])
    		 .pipe(webpack({
    		 	output: {
				   filename: 'appBundle.js'
				}
    		 }))
    		 .pipe(gulp.dest('www/'));
});

gulp.task('sass', function () {
  return gulp.src('src/app/main/app.scss')
    		 .pipe(sass().on('error', sass.logError))
    		 .pipe(gulp.dest('www'));
});

gulp.task('default', function() {
    runSequence('clean')
	setTimeout(function () {
        runSequence('refBowerComponents',function () {
			setTimeout(function () {
                runSequence('serve')
            },2000)
        })
    },2000);
});

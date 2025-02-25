const gulp = require('gulp');
const strip = require('gulp-strip-comments');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');
const prettify = require('gulp-jsbeautifier');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const webp = require('gulp-webp');
const named = require('vinyl-named');

// BrowserSync
function browserSyncTask(done) {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        notify: false,
    });
    done();
}

// WebP Conversion
function webpTask() {
    return gulp
        .src(['src/img/**/*.jpg', 'src/img/**/*.png'])
        .pipe(webp({ quality: 90 }))
        .pipe(gulp.dest('./dist/img/webp'));
}

// Nunjucks Templates
function nunjucksTask() {
    return gulp
        .src('src/pages/**/*.njk')
        .pipe(plumber())
        .pipe(nunjucksRender({
            path: ['src/templates/'],
        }))
        .pipe(prettify({
            indent_size: 4,
            preserve_newlines: true,
            max_preserve_newlines: 0,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

// SASS Compilation
function sassTask() {
    return gulp
        .src(['./src/scss/style.scss', './src/scss/fonts.scss'])
        .pipe(sourcemaps.init({ largeFile: true }))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

// JavaScript Processing
function jsTask() {
    return gulp
        .src(['src/js/script.js'])
        .pipe(named())
        .pipe(webpackStream({
            mode: 'development',
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ['@babel/plugin-transform-runtime', {
                                    regenerator: true,
                                }],
                            ],
                        },
                    },
                }],
            },
        }))
        .pipe(uglify())
        .pipe(strip())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

// Libraries Concatenation
function libsTask() {
    return gulp
        .src([
            'src/js/libs/jquery-3.4.1.js',
            'src/js/libs/magnific-popup.min.js',
            'src/js/libs/select2.min.js',
            'src/js/libs/swiper.min.js',
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(strip())
        .pipe(gulp.dest('dist/js/libs'))
        .pipe(browserSync.stream());
}

// Image Optimization
function imageminTask() {
    return gulp
        .src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
}

// Watch Files
function watchFiles() {
    gulp.watch('src/scss/**/*.scss', sassTask);
    gulp.watch(['src/libs/**/*.js', 'src/js/**/*.js'], jsTask);
    gulp.watch(['src/pages/**/*.njk', 'src/templates/**/*.njk'], nunjucksTask);
}

// Define Complex Tasks
const build = gulp.series(gulp.parallel(sassTask, jsTask, nunjucksTask));
const watch = gulp.parallel(watchFiles, browserSyncTask);

// Export Tasks
exports.webp = webpTask;
exports.nunjucks = nunjucksTask;
exports.sass = sassTask;
exports.js = jsTask;
exports.libs = libsTask;
exports.imagemin = imageminTask;
exports.build = build;
exports.watch = watch;
exports.default = watch;

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');/* сжатие изображений */
const htmlmin = require('gulp-htmlmin'); /* сжатие html */

//задача автообновления страницы браузера, baseDir: "src" директория рабочих файлов проекта
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});
// задачи конвертации из sass in css с переименованием в min
// autoprefixer автоматическая расстановка префиксов webkit, -ms, -o, -moz, кроссбраузерность
// cleanCSS минификация CSS, убирает ненужные запятые, преобразует цвет в хекс код и .т.д. для уменьшения веса файла css
// двумя действиями .pipe(sass() сделали 2 файла css один style.css не сжатый для себя и style.min.css сжатый для выгрузки
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("src/css"))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});
/* задача слежения за файлами html */
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});
/* Задача минизации файлов html и последующее копирование их в папку dist */
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

/* Задача копирования скрипт файлов в папку dist */
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest("dist/js"));
});

/* Задача копирования папки шрифтов в папку dist */
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest("dist/fonts"));
});

/* Задача копирования папки icons в папку dist */
gulp.task('icons', function () {
    return gulp.src('src/icons/**/*.*')
        .pipe(gulp.dest("dist/icons"));
});

/* Задача копирования папки mailer в папку dist */
gulp.task('mailer', function () {
    return gulp.src('src/mailer/**/*.*')
        .pipe(gulp.dest("dist/mailer"));
});

/* Задача зжатия и копирования папки img в папку dist */
gulp.task('images', function () {
    return gulp.src('src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images'));
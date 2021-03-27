const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
//задача автообновления страницы браузера, baseDir: "src" директория рабочих файлов проекта
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
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
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
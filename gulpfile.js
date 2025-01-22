// Импорт пакетов
const gulp = require("gulp");
const less = require("gulp-less");
const stylus = require("gulp-stylus");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const newer = require("gulp-newer");
const browsersync = require("browser-sync").create();
const del = require("del");
const fileInclude = require("gulp-file-include");

// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
  html: {
    src: ["src/*.html"],
    dest: "dist/",
  },
  styles: {
    src: [
      "src/styles/**/*.sass",
      "src/styles/**/*.scss",
      "src/styles/**/*.styl",
      "src/styles/**/*.less",
      "src/styles/**/*.css",
    ],
    dest: "dist/css/",
  },
  scripts: {
    src: ["src/scripts/**/*.ts", "src/scripts/**/*.js"],
    dest: "dist/js/",
  },
  img: {
    src: "src/img/**",
    dest: "dist/img/",
  },
};

// Очистка каталога dist
function clean() {
  return del(["dist/*", "!dist/img"]);
}

// Обработка HTML
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(
      fileInclude({
        basepath: "@file",
        prefix: "@@",
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream());
}

// Обработка стилей
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(
      rename({
        basename: "style",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

// Обработка скриптов
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream());
}

// Сжатие изображений
function img() {
  return gulp
    .src(paths.img.src)
    .pipe(newer(paths.img.dest))
    .pipe(imagemin({ progressive: true }))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.img.dest));
}

// Наблюдение за изменениями
function watch() {
  browsersync.init({
    server: {
      baseDir: "./dist",
      files: ["dist/**/*.html"], // Следить за изменениями в HTML
    },
  });

  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, img);
}

// Экспорт задач
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.watch = watch;

exports.default = gulp.series(
  clean,
  html,
  gulp.parallel(styles, scripts, img),
  watch
);

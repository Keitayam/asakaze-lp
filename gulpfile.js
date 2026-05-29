const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer").default;

/* ===============================
   CSS (Sass)
=============================== */
function cssTask() {
  return src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

/* ===============================
   JS
=============================== */
function jsTask() {
  return src("src/js/**/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest("dist/js"));
}

/* ===============================
   HTML
=============================== */
function htmlTask() {
  return src("src/html/**/*.html")
    .pipe(plumber())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

/* ===============================
   BrowserSync
=============================== */
function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  watch("src/scss/**/*.scss", cssTask);
  watch("src/js/**/*.js", jsTask).on("change", browserSync.reload);
  watch("src/html/**/*.html", htmlTask);
}

/* ===============================
   Default
=============================== */
exports.default = series(
  parallel(htmlTask, cssTask, jsTask),
  browserSyncTask
);
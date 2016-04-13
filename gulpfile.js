var gulp = require('gulp'),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    babelify = require("babelify"),
    webserver = require('gulp-webserver'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    uuid = require('node-uuid'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    ngHtml2Js = require("gulp-ng-html2js"),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    del = require('del'),
    Q = require('q'),
    streamify = require('gulp-streamify'),
    globbing = require('gulp-css-globbing'),
    ngAnnotate = require('gulp-ng-annotate'),
    Server = require('karma').Server,
    protractor = require('gulp-protractor').protractor,
    envify = require('envify'),
    sass = require('gulp-sass');

var source_paths = {
  sass: './source/sass/app.scss',
  js: './source/app.js',
  all_sass: './source/**/*.scss',
  all_js: './source/**/*.js',
  all_html: './source/**/*.html',
  images: './sources/images/**/*',
  html_index: './source/index.html',
  partials: './source/components/**/*.html',
  partials_dest: './source/partials',
  dev_css: './build/css',
  dev_js: './build/js',
  dev_html: './build/',
  prod_css: './dist/css',
  prod_js: './dist/js',
  prod_html: './dist',
  unit_test: __dirname + '/test/karma.conf.js',
  protractor_test: './test/protractor.conf.js',
  e2e: ['./test/e2e/**/*.js'],
}

tasks = {
  baseBrowserify: function() {
   return browserify([source_paths.js], {
      transform: [
        'babelify'
      ]})
      .transform('envify')
      .bundle()
      .on('error', function(e) { console.log(e.message) })
      .pipe(source('app.js'))
  },
  prodBrowserify: function() {
    return tasks.baseBrowserify()
      .pipe(ngAnnotate())
      .pipe(streamify(uglify()))
      .pipe(rename(tasks.assetProdName('js')))
      .pipe(gulp.dest(source_paths.prod_js))
  },
  devBrowserify: function() {
    return tasks.baseBrowserify()
      .pipe(gulp.dest(source_paths.dev_js));
  },
  prodCss: function() {
    return gulp.src(source_paths.sass)
      .pipe(globbing({extensions: ['.scss']}))
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(rename(tasks.assetProdName('css')))
      .pipe(gulp.dest(source_paths.prod_css));
  },
  copyImages: function(type) {
    return gulp.src(source_paths.images)
        .pipe(gulp.dest('./'+type+'/images'));
  },
  devCss: function() {
    return gulp.src(source_paths.sass)
      .pipe(globbing({extensions: ['.scss']}))
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest(source_paths.dev_css));
  },
  injectHtml: function(dest, injected_files) {
    return gulp.src(source_paths.html_index)
      .pipe(inject(injected_files,
                  {
                    ignorePath: ['dist', 'build', 'source'],
                    removeTags: true,
                  }))
      .pipe(gulp.dest(dest))
  },
  BaseNgHtml: function(dest) {
    return gulp.src(source_paths.partials)
      .pipe(htmlmin({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(ngHtml2Js({
        moduleName: "App.partialsPrecompile"
      }))
      .pipe(concat("index.js"))
      .pipe(gulp.dest(dest))
  },
  assetProdName: function(type) {
    var name = "app-" + uuid.v1() + "." + type;
    return name
  },
}

gulp.task('clean', function() {
  var deferred = Q.defer();
  del(source_paths.prod_html, function() {
    deferred.resolve();
  });
  return deferred.promise;
});

gulp.task('sass', tasks.devCss)

gulp.task('browserify', tasks.devBrowserify)

gulp.task('ngHtml', function() {
  return tasks.BaseNgHtml(source_paths.partials_dest)
})

gulp.task('inject', ['ngHtml'], function() {
  return tasks.injectHtml(
    source_paths.dev_html,
    es.merge(tasks.devCss(), tasks.copyImages('build'),tasks.devBrowserify())
  )
})

gulp.task('inject:prod',['ngHtml'], function() {
  return tasks.injectHtml(
    source_paths.prod_html,
    es.merge(tasks.prodCss(), tasks.copyImages('dist'), tasks.prodBrowserify())
  )
});

gulp.task('build', ['inject'])

gulp.task('build:watch', ['build'], function() {
  gulp.watch(source_paths.all_sass, ['sass'])
  gulp.watch(source_paths.all_js, ['browserify'])
  gulp.watch(source_paths.all_html, ['inject'])
});

gulp.task('dist', ['clean','inject:prod']);

gulp.task('serve', ['build:watch'],function() {
  return gulp.src('build')
    .pipe(webserver({open: true, livereload: true}));
});

gulp.task('serve:dist',function() {
  return gulp.src('dist')
    .pipe(webserver({open: true}));
});

/**
*  * Run test once and exit
*   */
gulp.task('test', ['build'] ,function (done) {
  return new Server({
    configFile: source_paths.unit_test,
    singleRun: true
  }, done).start();
});

/**
*  * Watch for file changes and re-run tests on each change
*   */
gulp.task('tdd', ['build:watch'], function (done) {
  return new Server({
    configFile: source_paths.unit_test
  }, done).start();
});

gulp.task('e2e', function() {
  return gulp.src(source_paths.e2e)
  .pipe(protractor({
    configFile: source_paths.protractor_test,
  }))
  .on('error', function(e) { throw e })
})

gulp.task('default', ['build']);

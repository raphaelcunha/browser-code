'use strict';

const browserSync   = require('browser-sync');
const del           = require('del');
const gulp          = require('gulp');
const gutil         = require('gulp-util');
const ftp           = require('gulp-ftp');
const historyApi    = require('connect-history-api-fallback');
const karma         = require('karma');
const tslint        = require('gulp-tslint');
const webpack       = require('webpack');
const WebpackServer = require('webpack-dev-server');


//=========================================================
//  PATHS
//---------------------------------------------------------
const paths = {
  src: {
    ts: 'src/**/*.ts'
  },
  target: 'target'
};


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {
  browserSync: {
    files: [paths.target + '/**/*'],
    notify: false,
    open: false,
    port: 3000,
    reloadDelay: 500,
    server: {
      baseDir: paths.target
    }
  },

  karma: {
    configFile: __dirname + '/karma.conf.js'
  },

  tslint: {
    report: {
      options: {emitError: true},
      type: 'verbose'
    }
  },

  webpack: {
    dev: './webpack.dev',
    dist: './webpack.dist'
  }
};


//=========================================================
//  TASKS
//---------------------------------------------------------
gulp.task('clean.target', () => del(paths.target));



gulp.task('serve', done => {
  config.browserSync.server.middleware = [historyApi()];
  browserSync.create()
    .init(config.browserSync, done);
});



gulp.task('ts', done => {
  let conf = require(config.webpack.dist);
  webpack(conf).run((error, stats) => {
    if (error) throw new gutil.PluginError('webpack', error);
    gutil.log(stats.toString(conf.stats));
    done();
  });
});


//===========================
//  BUILD
//---------------------------
gulp.task('build', gulp.series(
  'clean.target',
  'ts'
));


//===========================
//  DEVELOP
//---------------------------
gulp.task('default', gulp.task('serve.dev'));


//===========================
//  TEST
//---------------------------
function karmaServer(options, done) {
  let server = new karma.Server(options, error => {
    if (error) process.exit(error);
    done();
  });

  server.start();
}


gulp.task('deploy_ftp', function () {
  return gulp.src('target/*')
      .pipe(ftp({
        host: 'ftp.upjs.com.br',
        user: 'upjs',
        pass: 'ra153315'
      }))
      // you need to have some kind of stream after gulp-ftp to make sure it's flushed
      // this can be a gulp plugin, gulp.dest, or any kind of stream
      // here we use a passthrough stream
      .pipe(gutil.noop());
});


//===========================
//  RELEASE
//---------------------------
gulp.task('dist', gulp.series(
  'build'
));

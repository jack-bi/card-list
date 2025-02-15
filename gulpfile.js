var gulp = require('gulp')
var replace = require('gulp-replace')
var shell = require('gulp-shell')
// var del = require('del')
// var util = require('gulp-util');
var _ = require('lodash');
var argv = require('yargs').argv;
var isMM = (argv.mm === undefined) ? false : true;
var currentVersion;

// var CDN_PATH = 'https://mm3833cdn.bgbet3.com/qpcdn/qp-m/for-mm-lp'

// 打包
gulp.task('webpack', shell.task([
  'node --max_old_space_size=8192 build/build.js'
]))

//replace manifest.js
gulp.task('replace-manifest-js', ['replace-js'], () => {
  var version = currentVersion;
  var stream = gulp.src(`./dist/static/js/manifest.js`)
  .pipe(replace(/"\/WILL_BE_REPLACE\/"/g, 'window.CDN_PATH'))
  .pipe(replace(/static\/js\//g, `/${version}/static/js/`))
    .pipe(gulp.dest(`./dist/static/js/`))
  return stream
})

//replace app.css
gulp.task('replace-app-css', ['replace-manifest-js'], () => {
  var stream = gulp.src(`./dist/static/css/**`)
    // See http://mdn.io/string.replace#Specifying_a_string_as_a_parameter
    .pipe(replace(/\/WILL_BE_REPLACE\//g, '/'))
    .pipe(replace(/\/image-qp/g, '/qpcdn/qp-m/image-qp'))
    .pipe(gulp.dest(`./dist/static/css/`))
  return stream
})

//路徑前置補上CDN變數
gulp.task('replace-js', ['getMaxVersion'], () => {
  var stream = gulp.src(`./dist/static/js/**`)
    .pipe(replace(/url\(\/image-qp/g, 'url(" + window.CDN_PATH + "./image-qp'))
    .pipe(gulp.dest(`./dist/static/js/`))
  return stream
})

gulp.task('getMaxVersion', ['webpack'], () => {
    var fs = require("fs");
    var files = fs.readdirSync('./dist');
    var versions = _.filter(files, function(f) {
        return /\d{4,6}-\d{2}/.test(f);
    })
    // if(versions.length == 0)
    versions.push(getDate() + '-00');
    var max = _.max(versions);
    var temp = max.split('-');
    currentVersion = temp[0] +  '-' + _.padStart((parseInt(temp[1], 10) + 1), 2, '0');
    if(isMM) currentVersion = 'for-mm-lp';
    console.log('version = ' + currentVersion);
})

gulp.task('moveToVersion', ['replace-app-css'], () => {
  var version = currentVersion;
  var stream = gulp.src('./dist/static/**/*')
    .pipe(gulp.dest(`./dist/${version}/static`))
  return stream
})

//MMdd
function getDate() {
  var d = new Date();
  return (d.getFullYear() - 2000 ) + _.padStart((d.getMonth() + 1), 2, '0') + '' + _.padStart(d.getDate(), 2, '0');
}

var start = (t) => {
  return new Promise((resolve, reject) => {
    console.log(` Task ${t} start..\n`)
    gulp.start(t, () => {
      console.log(` Task ${t} complete..\n`)
      resolve()
    })
  })
}
gulp.task('default', [], () => {
  start('moveToVersion')
})

/*
1.webpack  打包
2.取得版號
3.replace-js  URL(/image-qp) 替換
4.replace-manifest-js WILL_BE_REPLACE替換
5.replace-app-css WILL_BE_REPLACE替換
6.doCopyImage 複製 image
7.moveToVersion
*/

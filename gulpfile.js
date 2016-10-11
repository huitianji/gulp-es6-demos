var gulp = require("gulp");
var minify = require('gulp-minify-css');
var $ = require('gulp-load-plugins')();

//监听less
gulp.task('copyless', function () {

    //less
    gulp.src(['src/less/*.less', '!src/less/_*.less'])
        .pipe($.less())
        .pipe(minify())
        .pipe(
            gulp.dest('dist/css/')
        )
        .pipe($.connect.reload());//通知浏览器重启

});

//监听html
gulp.task("watchHtml", function () {

    //html
    gulp.src(['src/pages/*.html'])
        .pipe(
            $.connect.reload()//通知浏览器重启
        )

});

//监听js
gulp.task("watchJs", function () {

    gulp.src(['src/js/*.js', '!src/js/*.tmp.js'])////指定要处理的文件
        .pipe(
            $.babel({
                presets:['es2015']
            })
        )
        .pipe($.concat('main.js'))//把多个js文件合并成一个js文件
        .pipe($.uglify())          //对合并后的main.js文件进行压缩
        .pipe(
            gulp.dest('dist/js')
        )
        .pipe($.connect.reload());//通知浏览器重启

});
//监听img图片
gulp.task("watchImg", function () {

    gulp.src(['src/images/**/*.{jpg,png}'])
        .pipe($.imagemin())
        .pipe(
            gulp.dest('dist/images/')
        )
        .pipe($.connect.reload());//通知浏览器重启

});

gulp.task('watch', function () {

    //gulp.watch(['src/pages/*.html', 'src/less/*.less'], ['copyless']);

    gulp.watch(['src/**'], ['copyless', 'watchHtml', 'watchJs', 'watchImg']);

});

gulp.task('server', function () {
    $.connect.server({
        root:'./',
        port:8080,
        livereload:true//启动实时刷新功能
    });
});

gulp.task('default', ['watch','server']);//运行此任务的时候会在8080上
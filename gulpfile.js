const concat = require('gulp-concat');
const filter = require('gulp-filter');
const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const wrapper = require('gulp-wrapper');
const htmlbuild = require('gulp-htmlbuild');

gulp.task('default', function () {
    return gulp.src([
            'index.js',
            'fonts/**/*.js'
        ])
        .pipe(concat({ path: 'index.js' }))
        .pipe(wrapper({
            header: '(function () {\n/* start:pxlr-fonts */\n',
            footer: '/* end:pxlr-fonts */\n}());\n'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('gh-pages', function () {
    var jsFilter = filter('**/*.js', {restore: true});
    var htmlFilter = filter('**/*.html', {restore: true});

    return gulp.src([
            'bower_components/simple-web-modules/index.js',
            'bower_components/pxlr-core/dist/index.js',
            'bower_components/pxlr-gl/dist/index.js',
            'fonts/**/*',
            'demo/**/*',
            'index.js'
        ])
        .pipe(jsFilter)
        .pipe(concat({ path: 'demo.js' }))
        .pipe(jsFilter.restore)
        .pipe(htmlFilter)
        .pipe(htmlbuild({
            js: htmlbuild.preprocess.js(function (block) {
                block.write('demo.js');
                block.end();
            })
        }))
        .pipe(htmlFilter.restore)
        .pipe(ghPages());
});

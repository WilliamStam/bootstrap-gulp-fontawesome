var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var path = require('path');
var tap = require("gulp-tap")
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var run = require('gulp-run-command').default;

var replace_src = function (folder) {
    return 'assets' + path.sep + folder
}
var replace_dist = function (folder) {
    return path.sep + 'dist' + path.sep + folder
}

gulp.task('files.scss', () => {
    return gulp.src(['./app/assets/css/**/*.scss', '!./app/assets/css/**/*.scss/*/**'], { nodir: true, base: '.' })
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(function (file) {
            file.dirname = file.dirname.replace('assets' + path.sep + 'css', 'static' + path.sep + 'css');
            console.log(" > " + file.dirname + path.sep + file.basename + file.extname)
        }))
        .pipe(gulp.dest("."));
});


gulp.task('folders.scss', () => {
    return gulp.src('./app/assets/css/**/*.scss/index.scss', { base: '.' })
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(function (file) {
            folder = file.dirname.replace('assets' + path.sep + 'css', 'static' + path.sep + 'css').split(path.sep)
            name = folder.pop()
            bname = name.split(".")
            bname.pop()
            bname = bname.join(".")
            folder = folder.join(path.sep)
            file.dirname = folder
            file.basename = bname
            console.log(" > " + file.dirname + path.sep + file.basename + file.extname)
        }))
        // .pipe(autoprefixer({
        //     cascade: false
        // }))
        // .pipe(cleanCSS())
        .pipe(gulp.dest("."));
});

gulp.task('files.js', () => {
    return gulp.src(['./app/assets/js/**/*.js', '!./app/assets/js/**/*.js/*/**'], { nodir: true, base: '.' })

        .pipe(rename(function (file) {
            file.dirname = file.dirname.replace('assets' + path.sep + 'js', 'static' + path.sep + 'js');
            console.log(" > " + file.dirname + path.sep + file.basename + file.extname)
        }))
        .pipe(gulp.dest("."));
});

gulp.task('folders.js', () => {
    return gulp.src('./app/assets/js/**/*.js/index.js', { base: '.' })
        .pipe(tap(function (file, t) {
            files_to_concat = JSON.parse(file.contents.toString())

            folder = file.dirname
            outputFilename = folder.split(path.sep).pop()
            outputFolder = folder.replace('assets' + path.sep + 'js', 'static' + path.sep + 'js')
            outputFolder = outputFolder.split(path.sep)
            outputFolder.pop()
            outputFolder = outputFolder.join(path.sep)


            var orgiCWD = process.cwd();
            try {
                process.chdir(folder);
            } catch (err) {
                console.log('chdir: ' + err);
            }


            var files_to_concat_with_path = files_to_concat.map(function (e) {
                ret = e
                resolve = require('path').resolve
                ret = resolve(ret)


                return ret;
            });
            try {
                process.chdir(orgiCWD);
            } catch (err) {
                console.log('chdir: ' + err);
            }


            return gulp.src(files_to_concat_with_path, { base: folder })
                .pipe(concat(outputFilename, { newLine: '\n\r;/*********************************/;\n\r' }))
                .pipe(rename(function (file) {
                    file.dirname = outputFolder
                    console.log(" > " + file.dirname + path.sep + file.basename + file.extname);
                }))
                .pipe(gulp.dest("."));

        }))

});

gulp.task('fonts', () => {
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest("./app/static/fonts/"));
});
gulp.task('images', () => {
    return gulp.src('./app/assets/images/*')
        .pipe(gulp.dest("./app/static/images/"));
});



gulp.task('build', gulp.parallel('files.scss', 'folders.scss', 'files.js', 'folders.js', 'fonts', 'images'));


gulp.task('watch', () => {
    gulp.watch(['./app/assets/css/**/*.scss', '!./app/assets/css/**/*.scss/*/**'], gulp.series(['files.scss']));
    gulp.watch('./app/assets/css/**/*.scss/**/*.scss', gulp.series(['folders.scss']));
    gulp.watch(['./app/assets/js/**/*.js', '!./app/assets/js/*.js/*/**'], gulp.series(['files.js']));
    gulp.watch('./app/assets/js/**/*.js/**/*.js', gulp.series(['folders.js']));
    gulp.watch('./app/assets/images/*', gulp.series(['images']));
});




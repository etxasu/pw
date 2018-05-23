const fs = require('fs')
const child_process = require('child_process')

const gulp = require('gulp')
const babel = require('gulp-babel')
const webpack = require('webpack')
const eslint = require('gulp-eslint')

const del = require('del')


gulp.task('clean', () => del(['build']))

gulp.task('copy_static', ['clean'], () =>
    gulp.src('static/*')
        .pipe(gulp.dest('build/static'))
)

gulp.task('copy_config', ['copy_static'], () =>
    gulp.src('config/*.json')
        .pipe(gulp.dest('build/config'))
)

gulp.task('lint_js', ['copy_config'], () =>
    gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
)

gulp.task('build_js', ['lint_js'], () =>
    gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build/js'))
)

gulp.task('bundle_js', ['build_js'], (cb) => {
    webpack(require('./webpack.config.js'), (err, stats) => {
        if(err) {
            console.error(err.stack || err)
            if(err.details) {
                console.error(err.details)
            }
            cb(err)
            return
        }

        console.log(stats.toString({colors: true}))
        cb()
    })
})

gulp.task('build', ['bundle_js'])

gulp.task('run', ['build'], (cb) => {
    let childProc = child_process.spawn('node', ['js/server_main.js'], {cwd: 'build'})

    childProc.stdout.pipe(process.stdout)
    childProc.stderr.pipe(process.stderr)

    childProc.on('close', () => cb())
})

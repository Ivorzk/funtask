const path = require('path')
const gulp = require('gulp')
const replace = require('gulp-replace')

// export
module.exports = (name) => {
  console.log(process.execPath)
  console.log(__dirname)
  console.log(process.cwd())
  // copy templates
  gulp.src(`${__dirname}/../plugin-tpl/**/*`)
    .pipe(gulp.dest(path.resolve(`./${name}/`)))
}

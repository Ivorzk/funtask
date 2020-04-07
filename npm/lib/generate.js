const path = require('path')
const gulp = require('gulp')
const replace = require('gulp-replace')
const chalk = require('chalk')
// tasker
const Tasks = function() {}

// options
const options = {}

// copy templates
Tasks.prototype.copyTemplates = () => {
  gulp.src([`${__dirname}/../plugin-tpl/**/*`, `!${__dirname}/../plugin-tpl/package.json`])
    .pipe(gulp.dest(path.resolve(`./${options.name}/`)))
}

// replace variables
Tasks.prototype.replaceVariables = () => {
  gulp.src([`${__dirname}/../plugin-tpl/package.json`, `${__dirname}/../plugin-tpl/app.yaml`])
    .pipe(replace('${name}', `funtask-${options.name}`))
    .pipe(replace('${description}', `a funtask app`))
    .pipe(replace('${keywords}', `keywords`))
    .pipe(replace('${repository}', ``))
    .pipe(gulp.dest(path.resolve(`./${options.name}/`)))
}

// export
module.exports = (name) => {
  // init options
  options.name = name

  // create instance
  var io = new Tasks()

  // copy templates
  io.copyTemplates()

  // replace variables
  io.replaceVariables()

  console.log(chalk.yellow('Application built successfully !'))
}

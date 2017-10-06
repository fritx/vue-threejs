require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig

var isLibTarget = process.env.TARGET === 'lib'
if (isLibTarget) {
  webpackConfig = require('./webpack.lib.conf')
} else {
  webpackConfig = require('./webpack.prod.conf')
}

var spinner = ora('building for production...')
spinner.start()

let dir
if (isLibTarget) {
  dir = path.join(config.build.libRoot)
} else {
  // dir = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
  dir = path.join(config.build.assetsRoot)
}

rm(dir, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))

    if (!isLibTarget) console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

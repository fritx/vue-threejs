let { resolve } = require('path')
let webpack = require('webpack')

module.exports = {
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .merge({
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      })

    if (process.env.TARGET === 'lib') {
      config.plugin('externals')
        .use(webpack.ExternalsPlugin, ['commonjs2', [
          'vue',
          'dat.gui',
          'oimo',
          'three'
        ]])
    }
  },
}

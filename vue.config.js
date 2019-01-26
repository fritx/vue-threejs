let isLib = process.env.TARGET === 'lib'

module.exports = {
  css: {
    extract: !isLib
  },
  chainWebpack: config => {
    if (isLib) {
      // https://github.com/vuejs/vue-cli/issues/2646
      config.merge({
        externals: {
          vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            root: 'Vue',
          },
          three: {
            commonjs: 'three',
            commonjs2: 'three',
            root: 'THREE',
          },
          'dat.gui': {
            commonjs: 'dat.gui',
            commonjs2: 'dat.gui',
            // https://github.com/dataarts/dat.gui/blob/1b18f7227e56c8b5071337732342101501b9fa95/rollup.config.js#L30
            root: 'dat',
          },
          oimo: {
            commonjs: 'oimo',
            commonjs2: 'oimo',
            // https://github.com/lo-th/Oimo.js/blob/0ce1c3d8ff3f857d9180035076a70d8d6976a3e6/rollup.config.js#L7
            root: 'OIMO',
          },
        }
      })
    }
  },
}

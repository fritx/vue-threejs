let isLib = process.env.TARGET === 'lib'

module.exports = {
  css: {
    extract: !isLib
  },
  chainWebpack: config => {
    // todo
  },
}

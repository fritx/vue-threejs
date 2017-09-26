let vueComs = {}

let vueContext = require.context('./', true, /\.vue$/)
vueContext.keys().forEach(path => {
  let com = vueContext(path)
  vueComs[com.name] = com
  exports[com.name] = com
})

let loaderContext = require.context('./threex/loaders', false, /\.js$/)
loaderContext.keys().forEach(path => {
  let com = loaderContext(path).default
  // fix: uglify would kill the function name
  let name = path.match(/([^/]+)\.js$/)[1]
  exports[name] = com
})

exports.install = Vue => {
  Object.keys(vueComs).forEach(k => {
    // fix: name 'object3d' is required,
    // or it would be parsed to 'object-3-d' somewhere else
    let rk = k
    if (k === 'Object3D') rk = 'object3d'
    Vue.component(rk, vueComs[k])
  })
}

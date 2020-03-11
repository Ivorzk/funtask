let modules = require.context('./modules', true, /\.js$/)
const funtask = modules.keys().reduce((funtask, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modules(modulePath)
  funtask[moduleName] = value.default
  return funtask
}, {})
export default funtask

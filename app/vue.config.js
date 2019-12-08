module.exports = {
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: 'funtask://./' // Make sure to add "./" to the end of the protocol
    }
  }
}

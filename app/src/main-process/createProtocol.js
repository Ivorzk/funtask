import {
  protocol
} from 'electron'
import * as path from 'path'
import {
  readFile
} from 'fs'
import {
  URL
} from 'url'

export default (scheme, workspace) => {
  protocol.registerBufferProtocol(
    scheme,
    (request, respond) => {
      let pathName = new URL(request.url).pathname
      pathName = decodeURI(pathName) // Needed in case URL contains spaces
      console.log(path.join(workspace, pathName, request.url), 'path')
      readFile(path.join(workspace, pathName), (error, data) => {
        if (error) {
          console.error(`Failed to register ${scheme} protocol`, error)
        }
        let extension = path.extname(pathName).toLowerCase()
        let mimeType = ''

        if (extension === '.js') {
          mimeType = 'text/javascript'
        } else if (extension === '.html') {
          mimeType = 'text/html'
        } else if (extension === '.css') {
          mimeType = 'text/css'
        } else if (extension === '.svg' || extension === '.svgz') {
          mimeType = 'image/svg+xml'
        } else if (extension === '.json') {
          mimeType = 'application/json'
        }

        respond({
          mimeType,
          data
        })
      })
    },
    error => {
      if (error) {
        console.error(`Failed to register ${scheme} protocol`, error)
      }
    }
  )
}

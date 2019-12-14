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
      // console.log(path.join(workspace, pathName, request.url), 'path')
      console.log(pathName, 'pathName')
      readFile(path.join(__dirname, pathName), (error, data) => {
        if (error) {
          readFile(path.join(workspace, 'funtask_' + pathName.substring(1, pathName.length)), (error, data) => {
            if (error) console.error(`Failed to register ${scheme} protocol`, error)
            output(data)
          })
        } else {
          output(data)
        }
      })

      let output = (data) => {
        let extension = path.extname(pathName).toLowerCase()
        let mimeType = ''
        // try {
        //   data = await readFileSync(path.join(workspace, pathName), 'utf-8')
        // } catch (e) {
        //   console.error(`Failed to register ${scheme} protocol`, error)
        // }
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
      }

    },
    error => {
      if (error) {
        console.error(`Failed to register ${scheme} protocol`, error)
      }
    }
  )
}

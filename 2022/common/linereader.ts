import fs  from 'fs'
import path  from 'path'
import readline from 'readline'

interface Options {
  bufferSize: number
  skipBlank: boolean
}

let buffer = ''
let lineBuffered = 0
export default function rl (taskPath: string, readerCallback: (line:string) => void, onEndCallback: () => void, options = {
  buffeSize: 1,
  skipBlank: false
}) { const _rl = readline.createInterface({ input: fs.createReadStream(path.join(taskPath)) })
  _rl.on('line', (line: string) => {
    if(line.trim() === '' && options.skipBlank) {
      return
    }

    if(options.buffeSize === 1) {
      readerCallback(line)
    }
    
    buffer += line + (lineBuffered === options.buffeSize - 1 ? '' : '\n')
    lineBuffered++
    if(lineBuffered === options.buffeSize) {
      lineBuffered = 0
      readerCallback(buffer),
      buffer = ''
    }

  })
  _rl.on('close', onEndCallback)
}

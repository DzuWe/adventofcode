import fs from 'fs'
import path from 'path'
import readline from 'readline'

export function rl (taskPath, readerCallback, onEndCallback) {
  const _rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(taskPath))
  })

  _rl.on('line', readerCallback)
  _rl.on('close', onEndCallback)
}

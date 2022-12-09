import fs  from 'fs'
import path  from 'path'
import readline from 'readline'

export default function rl (taskPath: string, readerCallback: (line:string) => void, onEndCallback: () => void) { const _rl = readline.createInterface({ input: fs.createReadStream(path.join(taskPath)) })
  _rl.on('line', readerCallback)
  _rl.on('close', onEndCallback)
}

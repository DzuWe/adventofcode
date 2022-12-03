import { rl as _rl } from '../common/linereader.js'

let max = 0
let tempMax = 0

_rl(
  './input/input.txt',
  (line) => {
    if (!line.trim()) {
      max = tempMax > max ? tempMax : max
      tempMax = 0
    } else tempMax += Number.parseInt(line)
  },
  () => console.log(sum)
)

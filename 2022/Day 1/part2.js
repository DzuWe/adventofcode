import { rl as _rl } from '../common/linereader.js'

let max = Array(3).fill(0)
let tempMax = 0

_rl(
  './input/input.txt',
  (line) => {
    if (!line.trim()) {
      updateArrayIfNeeded(tempMax)
      tempMax = 0
    } else tempMax += Number.parseInt(line)
  },
  () => console.log(sum)
)

function updateArrayIfNeeded(num) {
  if (num > max[max.length - 1]) {
    max[max.length - 1] = num
    max = sort(max)
  }
}

function sort(arr) {
  return arr.sort((a, b) => b - a)
}

import rl from '../common/linereader.js'

let sum = 0

rl(
  './input/input.txt',
  (line) => {
    const arr = line.split(' ').map(getAction)
    sum += getScore(arr)
  },
  () => console.log(sum)
)

function getAction(str) {
  if (str.match(/[AX]/)) {
    return 1
  }
  if (str.match(/[BY]/)) {
    return 2
  }
  if (str.match(/[CZ]/)) {
    return 3
  }
}

function getScore(numArr) {
  return numArr[1] + getCondition(numArr)
}

function getCondition(numArr) {
  const a = numArr[0]
  const b = numArr[1]
  const sub = a - b
  if (!sub) {
    return 3
  }
  if ([1, -2].indexOf(sub) !== -1) {
    return 0
  }
  return 6
}

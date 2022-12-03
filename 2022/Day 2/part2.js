import { rl as _rl } from '../common/linereader.js'

let sum = 0

_rl(
  './input/input.txt',
  (line) => {
    const [figure, condition] = line.split(' ')
    sum += getScore(figure, condition)
  },
  () => console.log(sum)
)

// [figureWeight, winFigureWeight, loseFigureWeight]
function getFigureWeight(figure) {
  if (figure === 'A') {
    return [1, 2, 3]
  }

  if (figure === 'B') {
    return [2, 3, 1]
  }

  return [3, 1, 2]
}

function getScore(figure, condition) {
  const [current, win, lose] = getFigureWeight(figure)
  if (condition === 'Y') {
    return 3 + current
  }
  if (condition === 'Z') {
    return 6 + win
  }

  return 0 + lose
}

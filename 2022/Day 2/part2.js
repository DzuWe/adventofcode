import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: fs.createReadStream('./input/input.txt'),
})

let sum = 0

rl.on('line', (line) => {
  const [figure, condition] = line.split(' ')
  sum += getScore(figure, condition)
})

rl.on('close', () => console.log(sum))

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

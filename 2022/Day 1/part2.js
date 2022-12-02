import fs from 'fs'
import readline from 'readline'

let max = Array(3).fill(0)
let tempMax = 0

const reader = readline.createInterface({
  input: fs.createReadStream('./input/input.txt'),
})

reader.on('line', (line) => {
  if (!line.trim()) {
    updateArrayIfNeeded(tempMax)
    tempMax = 0
  } else tempMax += Number.parseInt(line)
})

reader.on('close', () => console.log('Answer is: %s', max.reduce((acc, el) => acc + el, 0)))

function updateArrayIfNeeded (num) {
  if(num > max[max.length - 1]) {
    max[max.length - 1] = num
    max = sort(max)
  } 
}

function sort (arr) {
  return arr.sort((a,b) => b - a)
}


import fs from 'fs'
import readline from 'readline'

let max = 0
let tempMax = 0

const reader = readline.createInterface({
  input: fs.createReadStream('./input/input.txt'),
})

reader.on('line', (line) => {
  if (!line.trim()) {
    max = tempMax > max ? tempMax : max
    tempMax = 0
  } else tempMax += Number.parseInt(line)
})

reader.on('close', () => console.log('Answer is: %s', max))

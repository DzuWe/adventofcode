import { rl } from '../common/linereader.js'

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let sum = 0

rl('./input/input.txt',
  (line) => {
    const points = getPriority( getRepeatedItem(line))
    sum += points
  },
  () => console.log(sum))


function getPriority(str) {
  return priority.indexOf(str) + 1
}

function getRepeatedItem(line) {
  const middle = line.length / 2
  const containers = [line.slice(0, middle), line.slice(middle)]
  for (let i = 0; i < containers[0].length; i++) {
    const el = containers[0][i];
    if(containers[1].includes(el)) { 
      return el
    }
  }
}

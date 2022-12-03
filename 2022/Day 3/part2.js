import { rl } from '../common/linereader.js'

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let sum = 0
let group = []

rl(
  './input/input.txt',
  (line) => {
    group.push(line)

    if (group.length === 3) {
      sum += getPriority(getRepeatedItem(group))
      group = []
    }
  },
  () => console.log(sum)
)

function getPriority(str) {
  return priority.indexOf(str) + 1
}

function getRepeatedItem(group) {
  let [first, second, third] = group
  for (let i = 0; i < first.length; i++) {
    const char = first[i]
    if(second.includes(char) && third.includes(char)) {
      return char
    }
  }

}

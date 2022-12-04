import rl from '../common/linereader.js'

let overlaps = 0

rl(
  './input/input.txt',
  (line) => {
    const [first, second] = parceGroup(line)
    const isOverlap = isPartialOverlap(first, second) || isPartialOverlap(second, first)
    overlaps += isOverlap ? 1 : 0
  },
  () => {
    console.log(`Overlaps: ${overlaps}`)
  }
)

function parceGroup(line) {
  const [first, second] = line.split(',')
  const firstNumbers = first.split('-').map(el=> Number(el))
  const secondNumbers = second.split('-').map(el=> Number(el))
  //  [min, max][]
return [firstNumbers, secondNumbers]
}

function isPartialOverlap(first, second) {
  for (let i = second[0]; i < second[1] + 1; i++) {
    if (first.indexOf(i) !== -1) {
      return true
    }
  }
  return false
}


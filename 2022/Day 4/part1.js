import rl from '../common/linereader.js'

let totalOverlaps = 0

rl(
  './input/input.txt',
  (line) => {
    const [first, second] = parceGroup(line)
    totalOverlaps += isTotalOverlap(first, second) || isTotalOverlap(second, first) ? 1 : 0
  },
  () => console.log(`TotalOverlaps: ${totalOverlaps}`)

)


function parceGroup(line) {
  const [first, second] = line.split(',')
  const firstNumbers = first.split('-').map(el => Number(el))
  const secondNumbers = second.split('-').map(el => Number(el))
  //  [min, max][]
  return [firstNumbers, secondNumbers]
}

function isTotalOverlap(first, second) {
  return first[0] >= second[0] && first[1] <= second[1]
}

import rl from '../common/linereader.js'

rl(
  './input/input.txt',
  line => console.log(getStartUniqSequence(line)),
  () => { }
)

function getStartUniqSequence(line) {
  const sequence = []
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (sequence.length < 14) {
      sequence.push(char)
    }

    if (sequence.length === 14) {
      const setLength = new Set(sequence).size

      if (setLength !== 14) {
        sequence.shift()
      } else {
        return i + 1
      }
    }
  }
  return
}

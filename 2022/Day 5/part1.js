import rl from '../common/linereader.js'

const movePhase = false
let initialCargo = ''
let cargo

rl(
  './input/input.txt',
  (line) => {
    const phase = getPhase(line)

    switch (phase) {
      case 'cargo': // Parsing cargo create
        initialCargo += line + '\n'
        break
      case 'arrangements': // Setup object of cargo
        initialCargo = initialCargo.slice(0, -1) // remove last \n from initial cargo
        cargo = createCargoStands(line)
        fillCargo(cargo, initialCargo)
        break
      case 'move': { // Moving cargo
        move(cargo,  getCommands(line))
        break
      }
      default:
        break
    }
  },
  () => console.log(getLastItemOf(cargo))
)

function getPhase(line) {
  if (line.includes('[')) {
    return 'cargo'
  }
  if (line.includes('move')) {
    return 'move'
  }
  if (line.startsWith(' 1')) {
    return 'arrangements'
  }
  return 'unknown'
}

function createCargoStands(line) {
  return line
    .replaceAll(' ', '')
    .split('')
    .reduce((acc, el) => {
      const idx = line.indexOf(el)
      acc[el] = { idx, arr: [] }
      return acc
    }, {})
}

function fillCargo(cargo, crates) {
  crates
    .match(/^.+$/gm)
    .reverse()
    .forEach((line) =>
      Object.entries(cargo).forEach(([key, value]) => {
        const char = line[value.idx]
        if (char !== ' ') {
          value.arr.push(char)
        }
      })
    )
}

function getCommands(command) {
  return command.match(/ \d.?/g).map(el => Number(el.trim()))
}

function move(cargo, [count, from, to]) {
  const cargoFrom = cargo[from].arr
  const moveBlock = cargoFrom.splice(cargoFrom.length - (count), cargoFrom.length).reverse()
  cargo[to].arr = [...cargo[to].arr, ...moveBlock]
}

function getLastItemOf(cargo) {
  return Object.entries(cargo).reduce((acc, [key, value]) => {
    return acc + value.arr.pop()
  }, '')
}

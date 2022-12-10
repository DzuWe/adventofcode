import rl from '../common/linereader.js'
let screen: string[][] = Array(6)
  .fill(0)
  .map(() => Array(40).fill('.'))
let signalRegister = 1
let cycle = 0
let signalStrenght: Record<string, number> = {}

rl(
  './2022/Day 10/input/input.txt',
  (line: string) => {
    const [command, register] = getCommand(line)
    if (command === 'noop') {
      registerCycle()
      return
    }
    if (command === 'addx' && register !== null) {
      for (let i = 0; i < 2; i++) {
        registerCycle()
        if (i === 0) {
          continue
        }
        signalRegister += register
      }
    }
  },
  () => {
    console.log(Object.values(signalStrenght).reduce((acc,el) => acc + el, 0))
    console.log(screen.map(el => el.join('')))
  }
)

type ParsedCommand = ['noop' | 'addx', number | null]

function getCommand(str: string): ParsedCommand {
  const [command, strenght] = str.split(' ')
  return [command, strenght ? parseInt(strenght) : null] as ParsedCommand
}

function draw() {
  const [row, cell] = getCellPosition()
  screen[row][cell] = isActive(cell) ? '#' : '.'
}

function registerCycle() {
  cycle++
  if (cycle % 40 === 20) {
    signalStrenght[cycle.toString()] = cycle * signalRegister
  }
  draw()
}

function getCellPosition(): [number, number] {
  const row = Math.ceil(cycle / 40)
  let cell
  if (Number.isInteger(cycle / 40)) {
    cell = 39
  } else {
    cell = (cycle % 40) - 1
  }
  return [row - 1, cell]
}

function isActive(cell: number) {
  return (
    [signalRegister - 1, signalRegister, signalRegister + 1].indexOf(cell) !==
    -1
  )
}

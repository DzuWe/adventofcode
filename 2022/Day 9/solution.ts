import rl from '../common/linereader.js'

enum Direction {
  Left = 'L',
  Right = 'R',
  Up = 'U',
  Down = 'D',
}
const partOneTailPositions = new Set()
const partTwoTailPositions = new Set()

type Vector = { x: number; y: number }
type MoveDirection = [dir: Direction, steps: string]

//  Initial position
const rope: Vector[] = new Array(10)
  .fill(0)
  .map(() => ({ x: 0, y: 0 }))

rl(
  './2022/Day 9/input/input.txt',
  (line: string) => {
    move(line.split(' ') as MoveDirection)
  },
  () => {
    console.log(partOneTailPositions.size)
    console.log(partTwoTailPositions.size)
  }
)

function move([direction, count]: MoveDirection) {
  let [head, neck] = rope

  for (let i = 0; i < parseInt(count); i++) {
    moveHead(head, direction)
    for (let j = 1; j < rope.length; j++) {
      const _head = rope[j - 1]
      const _tail = rope[j]

      if (!isTouching(_head, _tail)) {
       rope[j] = moveTail(_head, _tail)
      }
    }
    partOneTailPositions.add(`${neck.x},${neck.y}`)
    partTwoTailPositions.add(`${rope[9].x},${rope[9].y}`)
  }
}

function moveHead(head: Vector, direction: Direction) {
  switch (direction) {
    case Direction.Up:
      head.y++
      break
    case Direction.Down:
      head.y--
      break
    case Direction.Left:
      head.x--
      break
    case Direction.Right:
      head.x++
      break
    default:
      break
  }
}


function moveTail(head: Vector, tail: Vector) {
  const _tail = { ...tail }
  let dX = tail.x - head.x
  let dY = tail.y - head.y

  if(dX > 0) { _tail.x--}
  else if(dX < 0) {_tail.x++}
  if(dY > 0) { _tail.y-- }
  else if(dY < 0) {_tail.y++}
  return _tail
}

function isTouching(head: Vector, tail: Vector) {
  const dX = Math.abs(head.x - tail.x)
  const dY = Math.abs(head.y - tail.y)

  return dX <= 1 && dY <= 1
}

import rl from '../common/linereader.js'
const readerOptions = {
  bufferSize: 1,
  skipBlank: true,
}

const maze: Node[][] = []

const NOT_VISITED_DISTANCE = -1
let END_COORDINATES = ''
let START_COORDINATES = ''

type Node = [Coordinates, Weight, Distance]
type Weight = number
type Distance = number
type Coordinates = string

rl(
  './input/input.txt',
  (line: string) => {
    // Gettin maze array
    const WEIGHT = 'abcdefghijklmnopqrstuvwxyzE'
    const row = line.split('').map((el, idx) => {
      if(el === 'S') {
        START_COORDINATES = stringifyCoordinates(maze.length, idx)
        return 0
      }
      if(el === 'E') {
        END_COORDINATES = stringifyCoordinates(maze.length, idx)
      }
      return WEIGHT.indexOf(el)
    })

    maze.push(
      row.map((weight, idx) => {
        return [
          stringifyCoordinates(maze.length, idx),
          weight,
          NOT_VISITED_DISTANCE,
        ]
      })
    )
  },
  () => {
    const startNode = getDistanceToEnd((node) => node[0] === START_COORDINATES)
    console.log('Part 1: ', startNode![2] - 2) // ignore first and last cell step

    let flatMaze = maze.flat()
    .filter(el => el[1] === 0) // filter all 'a' cells
    .filter(el => el[2] !== -1 ) // filter all reacheable 'a' cells
    .sort((a, b) => a[2] - b[2]) // sort
    console.log('Part 2: ', flatMaze[0][2] - 2) // ignore first and last cell step
  },
  readerOptions
)

function getNode(coords: Coordinates): Node {
  const [y, x] = getCoordinates(coords)
  return maze[y][x]
}

function getDistanceToEnd(breakFunction: (node: Node) => boolean) {
  const endNode = getNode(END_COORDINATES)
  endNode[2] = 0
  const query = [endNode]

  const traverse = (query: Node[]) => {
    while (query.length > 0) {
      const node = query.shift()!

      if (breakFunction(node)) {
        return node
      }

      getAdjustedValidNodes(node).forEach((n) => {
        if (n[2] === NOT_VISITED_DISTANCE) {
          n[2] = node[2] + 1
          query.push(n)
        }
      })
    }
  }
  return traverse(query)
}

function getAdjustedValidNodes([coords, weight]: Node): Node[] {
  const nodes = []
  const [y0, x0] = getCoordinates(coords)
  const top = maze?.[y0 - 1]?.[x0]
  const bottom = maze?.[y0 + 1]?.[x0]
  const left = maze[y0][x0 - 1]
  const right = maze[y0][x0 + 1]

  if (top && top[1] - weight >= -1) {
    nodes.push(top)
  }
  if (bottom &&  bottom[1] - weight >= -1) {
    nodes.push(bottom)
  }
  if (left &&  left[1] - weight >= -1) {
    nodes.push(left)
  }
  if (right &&  right[1] - weight >= -1) {
    nodes.push(right)
  }
  return nodes
}

function getCoordinates(coordinates: Coordinates): [number, number] {
  // Y-X
  const [y, x] = coordinates.split('-')!.map((el) => parseInt(el))
  return [y, x]
}

function stringifyCoordinates(y: number, x: number): Coordinates {
  // Y-X
  return `${y}-${x}`
}

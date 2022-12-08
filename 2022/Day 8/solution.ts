import { count } from 'console'
import rl from '../common/linereader.js'
interface Tree {
  height: number
  score: [up: number, left: number, down: number, right: number]
  visible: boolean
}
type Direction = 'horisontal' | 'vertical'

const field: Tree[][] = []
rl(
  './2022/Day 8/input/input.txt',
  (line) => {
    field.push(
      line.split('').map((el) => ({
        height: Number(el),
        score: [0, 0, 0, 0],
        visible: false,
      }))
    )
  },
  () => {
    findVisibleInRows(field)
    findVisibleInColumns(field)
    const flat = field.flat()
    const count = flat.reduce((acc, el) => acc + (el.visible ? 1 : 0), 0)
    const maxScore = flat.map((el) =>
      el.score.reduce((acc, num) => (acc === undefined ? num : acc * num))
    )
    const scores = flat.map(el => el.score.reduce((acc, num) => acc === undefined ? num : acc * num ))
    console.log(Math.max(...scores))
  }
)

function logic(tree: Tree, hightest?: number) {
  if (hightest === undefined) {
    tree.visible = true
    return tree.height
  }

  if (tree.height > hightest) {
    tree.visible = true
    return tree.height
  }

  return hightest
}

function getScore(row: Tree[], currentIdx: number) {
  const leftSide = currentIdx !== 0 ? row.slice(0, currentIdx).reverse() : []
  const rightSide = currentIdx !== row.length - 1 ? row.slice(currentIdx + 1) : []
  const currentTreeHeight = row[currentIdx].height
  let leftScore = 0
  let rightScore = 0
  let blockedView = false

  leftSide.forEach((tree) => {
    if (blockedView) return
    const comparableTreeHeight = tree.height
    if ((comparableTreeHeight < currentTreeHeight) && !blockedView) {
      leftScore++
    }
    if (comparableTreeHeight >= currentTreeHeight) {
      blockedView = true
      leftScore++
    }
  })

  blockedView = false
  rightSide.forEach((tree) => {
    if (blockedView) return
    const comparableTreeHeight = tree.height
    if ((comparableTreeHeight < currentTreeHeight) && !blockedView) {
      rightScore++
    }
    if (comparableTreeHeight >= currentTreeHeight) {
      blockedView = true
      rightScore++
    }
  })

  return [leftScore, rightScore]
}

function checkRow(row: Tree[], horisontal = true) {
  let hightest: number | undefined
  row.forEach((tree, idx) => {
    hightest = logic(tree, hightest)
    const [left, right] = getScore(row, idx)
    tree.score[horisontal ? 1 : 0] = left
    tree.score[horisontal ? 3 : 2] = right
  })

  hightest = undefined
  const reversedRow = row.slice(0).reverse()

  reversedRow.forEach((tree) => (hightest = logic(tree, hightest)))
}

function findVisibleInRows(field: Tree[][]) {
  field.forEach((el) => checkRow(el))
}

function findVisibleInColumns(field: Tree[][]) {
  const output = field[0].map((_, colIndex) =>
    field.map((row) => row[colIndex])
  )
  output.forEach((el) => checkRow(el, false))
}

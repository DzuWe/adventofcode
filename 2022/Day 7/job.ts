import rl from '../common/linereader.js'

interface TreeNode {
  name: string
  isDir: boolean
  size?: number
  children?: TreeNode[]
}

const dirTree: TreeNode[] = []
const discSpace = 70000000
const cwd: string[] = []
let answer = 0

rl(
  './2022/Day 7/input/input.txt',
  (line) => {
    if (isCommand(line)) {
      const [command, argv] = getCommand(line)
      if (command === 'cd' && argv) {
        navigate(argv)
      }
    } else {
      const node = getNode(line)
      writeNode(node)
    }
  },
  () => {
    dirTree.forEach(calculateDirSize)
    console.log(answer)
    const limit = 30000000
    const totalUsage = dirTree.reduce((acc, node) => acc + node.size!, 0)
    const freeSpace = discSpace - totalUsage
    const ammountToDelete = limit - freeSpace
    console.log('Free space: ', freeSpace)
    console.log('Delete ammount: ', ammountToDelete)
    const finalSize = flatTree(dirTree)
                .filter(node => node.isDir && node.size! > ammountToDelete)
                .map(node => node.size || 0)
                .sort((a,b) => a - b)[0]
        
    console.log('Size to delete: ', finalSize)
  }
)

function isCommand(line: string) {
  return line.startsWith('$')
}

function flatTree(nodes: TreeNode[]): TreeNode[] {
 let tree: TreeNode[] = []
 nodes.forEach(node => {
   if(node.children) {
     tree = [...tree, ...flatTree(node.children!)]
   }
   tree.push(node)
 })
 return tree
}

function getNode(line: string): TreeNode {
  const [type, name] = line.split(' ')
  if (type === 'dir') {
    return {
      name,
      isDir: true,
      children: [],
    }
  } else {
    return {
      name,
      isDir: false,
      size: Number(type),
    }
  }
}

function writeNode(node: TreeNode) {
  let currentDir = dirTree
  for (let path of cwd) {
    currentDir = currentDir.find(({ isDir, name }) => isDir && name === path)!
      .children as TreeNode[]
  }
  const hasNode = !!currentDir.find( (el) => el.isDir === node.isDir && el.name === node.name)
  if (!hasNode) {
    currentDir.push(node)
  }
}

function calculateDirSize(node: TreeNode): number {
  if (!node.isDir) {
    return node.size!
  }
  if (node.children) {
    node.size = node.children.reduce((acc, n) => {
      return acc + calculateDirSize(n)
    }, 0)
  }

  answer+= node.size! < 100000 ? node.size! : 0
  return node.size!
}


function getCommand(line: string): [string, string | undefined] {
  const [, command, argv] = line.split(' ')
  return [command, argv]
}

function navigate(path: string) {
  if (path === '..') {
    cwd.pop()
    return
  }
  if (path === '/') {
    cwd.splice(0, cwd.length - 1)
    return
  }

  cwd.push(path)
}

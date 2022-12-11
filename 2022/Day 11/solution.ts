import rl from '../common/linereader.js'

class Monkey {
  idx: number
  pocket: number[]
  operation: (old: number) => number
  operationsCount: number = 0
  testBy: number
  //             #true   #false monkeys
  decisionTargets: [number, number]

  constructor(data: string) {
    const initialData = data.split('\n')
    if (initialData.length < 5) {
      throw Error('Invalid input monkey data')
    }
    const numRegx = /\d+/g
    const [idx, pocket, operation, test, truthy, falthy] = initialData as string[]
    this.idx = parseInt(idx.match(numRegx)!.join(''))
    // Create monkey pocket
    this.pocket = pocket.match(numRegx)!.map((el) => parseInt(el))

    // Create monkey item operation
    const operationBody = operation.slice(operation.indexOf('=') + 2)
    this.operation = new Function('old', `return ${operationBody}`) as (
      old: number
    ) => number
    
    // Create monkey test Number
    this.testBy = parseInt(test.match(numRegx)!.join(''))

    this.decisionTargets = (truthy + falthy)
      .match(numRegx)!
      .map((el) => parseInt(el)) as [number, number]
  }

  processTurn(monkeys: Monkey[]): void {
    if (this.pocket.length === 0) {
      return
    }
    this.pocket.forEach(item => {
    this.operationsCount++

    const processedItem = this.gettingBorred(this.operation(item))
    const [idx, payload] = this.throwItem(processedItem)
    monkeys[idx].catchItem(payload)
    })
    

    this.pocket = []
  }

  inspectItem(num: number) {
    return num % this.testBy === 0
  }

  throwItem(item: number): [number, number] {
    const [first, second] = this.decisionTargets
    return [this.inspectItem(item) ? first : second, item]
  }

  catchItem(num: number) {
    this.pocket.push(num)
  }

  gettingBorred(num: number): number {
    return Math.floor(num / 3)
  }
}

const readerOptions = {
  skipBlank: true,
  buffeSize: 6,
}

const monkeys: Monkey[] = []

rl(
  './input/test.txt',
  (line: string) => monkeys.push(new Monkey(line)),
  () => {
    
    for (let i = 0; i < 20; i++) {
      monkeys.forEach(monkey => monkey.processTurn(monkeys))
    }

    const operationsCount = monkeys.map(el => el.operationsCount).sort((a, b) =>  {return b - a}).slice(0, 2).reduce((acc, el) => acc * el, 1)
    console.log(operationsCount)
  },
  readerOptions
)

import rl from '../common/linereader.js'

class Monkey {
  idx: number
  pocket: number[]
  operation: (old: number) => number
  operationsCount: number = 0
  divider: number
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
    this.operation = (old: number) => eval(operationBody.replace('old', old.toString()))   
    // Create monkey test Number
    this.divider = parseInt(test.match(numRegx)!.join(''))

    this.decisionTargets = (truthy + falthy)
      .match(numRegx)!
      .map((el) => parseInt(el)) as [number, number]
  }

  processTurn(monkeys: Monkey[], delimiter: number): void {
    if (this.pocket.length === 0) {
      return
    }
    this.pocket.forEach(item => {
    this.operationsCount++

    const processedItem = this.worryLevel(this.operation(item), delimiter)
    const [idx, payload] = this.throwItem(processedItem)
    monkeys[idx].catchItem(payload)
    })
    

    this.pocket = []
  }

  inspectItem(num: number) {
    return num % this.divider === 0
  }

  throwItem(item: number): [number, number] {
    const [first, second] = this.decisionTargets
    return [this.inspectItem(item) ? first : second, item]
  }

  catchItem(num: number) {
    this.pocket.push(num)
  }

  worryLevel(num: number, delimiter: number): number {
    return num % delimiter
  }
}

const readerOptions = {
  skipBlank: true,
  buffeSize: 6,
}

const monkeys: Monkey[] = []

rl(
  './input/input.txt',
  (line: string) => monkeys.push(new Monkey(line)),
  () => {
    const commonDelimiter = monkeys.map(el => el.divider).reduce((a,b) => a*b, 1)
    for (let i = 0; i < 10000; i++) {
      monkeys.forEach(monkey => monkey.processTurn(monkeys, commonDelimiter))
    }

    const operationsCount = monkeys.map(el => el.operationsCount).sort((a, b) =>  {return b - a}).slice(0, 2).reduce((acc, el) => acc * el, 1)
    console.log(operationsCount)
  },
  readerOptions
)

class Stack<T> {
    private data: T[]

    constructor() {
        this.data = []
    }

    public push(single: T): void {
        this.data.push(single)
    }

    public pop(): T {
        if (this.data.length === 0) {
            throw new Error('stack is empty')
        }
        const result = this.data[this.data.length - 1]
        this.data.splice(this.data.length - 1, 1)
        return result
    }
}

function testGeneric1() {
    const numberStack = new Stack<number>()
    numberStack.push(1)
    numberStack.push(2)

    console.log(numberStack.pop())
    console.log(numberStack.pop())
    try {
        console.log(numberStack.pop())
    } catch (e) {
        console.log('pop fail')
    }
}

class ObjectWrapper<T extends object> {
    private data: T

    constructor(data: T) {
        this.data = data
    }

    public get<G extends keyof T>(single: G): T[G] {
        return this.data[single]
    }
}

function testGeneric2() {
    const a = new ObjectWrapper({
        name: 'fish',
        size: 2,
    })
    // 自动推导result1的类型为string，result2的类型为number
    const result1 = a.get('name')
    const result2 = a.get('size')

    console.log(result1, result2)
}

function testGeneric() {
    testGeneric1()
    testGeneric2()
}

export default testGeneric

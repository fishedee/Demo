class Dog {}
class Cat {}
class Fish {}
function GoPlay(input: 'a'): Dog
function GoPlay(input: 'b'): Cat
function GoPlay(input: 'c'): Fish

function GoPlay(input: string): Dog | Cat | Fish {
    if (input === 'a') {
        return new Dog()
    }
    if (input === 'b') {
        return new Cat()
    }
    if (input === 'c') {
        // 这个实现并不可靠，因为实现
        // 只能返回new Dog()依然能编译成功
        return new Fish()
    }
    throw new Error('mm')
}

function testGenericFunction1() {
    // 定义一个固定名字的函数，在编译时就能推导出它的结果
    const result1 = GoPlay('a')
    const result2 = GoPlay('b')
    const result3 = GoPlay('c')

    console.log('GoPlay', result1, result2, result3)
}

// 使用keyof的实现也并不可靠
type Dance = {
    a: Dog
    b: Cat
    c: Fish
}
function GoDance<T extends keyof Dance>(input: T): Dance[T] {
    if (input === 'a') {
        return new Dog()
    }
    if (input === 'b') {
        return new Cat()
    }
    if (input === 'c') {
        // 这个实现并不可靠
        // 只能返回new Dog()依然能编译成功
        return new Fish()
    }
    throw new Error('mm')
}

function testGenericFunction2() {
    // 定义一个固定名字的函数，在编译时就能推导出它的结果
    const result1 = GoDance('a')
    const result2 = GoDance('b')
    const result3 = GoDance('c')

    console.log('GoDance', result1, result2, result3)
}

function testGenericFunction() {
    testGenericFunction1()
    testGenericFunction2()
}

export default testGenericFunction

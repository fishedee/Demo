class Dog {}
class Cat {}
class Fish {}
function GoPlay(input: number): Dog
function GoPlay(input: string): Cat
function GoPlay(): Fish

function GoPlay(input?: number | string): Dog | Cat | Fish {
    if (typeof input === 'number') {
        return new Dog()
    }
    if (typeof input === 'string') {
        // 这个实现并不可靠
        // 只能返回new Dog()依然能编译成功
        return new Cat()
    }
    return new Fish()
}

function testGenericFunction1() {
    // 定义一个固定名字的函数，在编译时就能推导出它的结果
    const result1 = GoPlay(1)
    const result2 = GoPlay('b')
    const result3 = GoPlay()

    console.log('GoPlay', result1, result2, result3)
}

// 使用keyof无法实现以上的功能，要用泛型判断
type DanceResultType2<T> = T extends number ? Dog : Cat
type DanceResultType<T> = T extends undefined | null | never | void
    ? Fish
    : DanceResultType2<T>
function GoDance<T extends number | string>(input?: T): DanceResultType<T> {
    if (typeof input === 'number') {
        return new Dog()
    }
    if (typeof input === 'string') {
        // 这个实现并不可靠
        // 只能返回new Dog()依然能编译成功
        return new Cat()
    }
    return new Fish()
}

function testGenericFunction2() {
    // 定义一个固定名字的函数，在编译时就能推导出它的结果
    const result1 = GoDance(1)
    const result2 = GoDance('b')

    // 这里推导不好，只能推导出Dog|Cat类型，而不是Fish类型
    const result3 = GoDance()

    console.log('GoDance', result1, result2, result3)
}

// 使用泛型加重载就能解决这个问题了
type FuckResultType<T> = T extends number ? Dog : Cat
function GoFuck<T extends number | string>(input: T): FuckResultType<T>
function GoFuck<T>(): Fish

function GoFuck<T>(input?: T): Fish | FuckResultType<T> {
    if (typeof input === 'number') {
        return new Dog()
    }
    if (typeof input === 'string') {
        return new Cat()
    }
    return new Fish()
}

function testGenericFunction3() {
    // 定义一个固定名字的函数，在编译时就能推导出它的结果
    const result1 = GoFuck(1)
    const result2 = GoFuck('b')

    // 现在能推导出来result3是Fish类型了
    const result3 = GoFuck()

    console.log('GoFuck', result1, result2, result3)
}

function testGeneric2Function() {
    testGenericFunction1()
    testGenericFunction2()
    testGenericFunction3()
}

export default testGeneric2Function

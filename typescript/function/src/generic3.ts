function GoPlay(input: number): 'mm'
function GoPlay(input: string): 'gg'
function GoPlay(input: object): 'kk'
function GoPlay(): 'll'

function GoPlay(input?: number | string | object): 'mm' | 'gg' | 'kk' | 'll' {
    if (typeof input === 'number') {
        return 'mm'
    }
    if (typeof input === 'string') {
        return 'gg'
    }
    if (input instanceof Object) {
        return 'kk'
    }
    return 'll'
}

function testGenericFunction1() {
    // 定义一个固定名字的函数，在编译时就能推导出它的结果
    const result1 = GoPlay(1)
    const result2 = GoPlay('b')
    const result3 = GoPlay()
    const result4 = GoPlay({})

    console.log('GoPlay', result1, result2, result3, result4)
}

// 使用泛型加重载就能解决这个问题了
type FuckResultType<T> = T extends number
    ? 'mm'
    : T extends string
    ? 'gg'
    : 'kk'

function GoFuck<T extends number | string | object>(input: T): FuckResultType<T>
function GoFuck<T>(): 'll'

function GoFuck<T>(input?: T): 'll' | FuckResultType<T> {
    if (typeof input === 'number') {
        return 'mm' as FuckResultType<T>
    }
    if (typeof input === 'string') {
        return 'gg' as FuckResultType<T>
    }
    if (input instanceof Object) {
        return 'kk' as FuckResultType<T>
    }
    return 'll'
}

function testGenericFunction2() {
    // 定义一个固定名字的函数，在编译时就能推导出它的结果
    const result1 = GoFuck(1)
    const result2 = GoFuck('b')
    const result3 = GoFuck()
    const result4 = GoFuck({})

    console.log('GoFuck', result1, result2, result3, result4)
}

function testGeneric3Function() {
    testGenericFunction1()
    testGenericFunction2()
}

export default testGeneric3Function

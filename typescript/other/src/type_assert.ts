function testTypeConvert() {
    // 强行将number类型看成是string类型，这种看成是编译时的，仅仅是为了编译公国而已
    // 运行时没有执行任何的类型转换
    const a = 123 as unknown as string
    try {
        console.log(a.toUpperCase())
    } catch (e) {
        console.log('出错，类型本来就不是string')
    }
}

function testNotNull() {
    let a: string | undefined

    // ?号简要判断，这是运行时判断，只有a不是undefined的时候，才执行后面的toUpperCase
    a?.toUpperCase()

    // !号的是强行判断，仅仅是编译通过而已，没有任何的运行时判断
    try {
        a!.toUpperCase()
    } catch (e) {
        console.log('出错，类型本来就是undefined')
    }
}

// 类型的强制指定，这是一种危险的方法，一般情况下不要使用，仅仅是为了编译通过而已
export default function testAssert() {
    testTypeConvert()
    testNotNull()
}

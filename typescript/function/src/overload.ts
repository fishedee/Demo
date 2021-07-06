// 一个函数的声明，代表该函数的重载
function GoFishing(input: number): string
function GoFishing(input: string): string
function GoFishing(): string

// 对这个函数的实现，只能有一个实现
function GoFishing(input?: number | string): string {
    if (typeof input === 'number') {
        return 'mm'
    }
    return 'gg'
}

function testOverloadFunction1() {
    // 定义一个固定名字的函数
    const result1 = GoFishing(1)
    const result2 = GoFishing('2')
    const result3 = GoFishing()

    console.log(result1, result2, result3)
}

function testOverloadFunction2() {
    // 定义函数的类型，有多个声明，表明是可重载
    type MyOverloadFunc = {
        (input: number): string
        (input: string): string
    }

    // 实现这个函数的重载实现，注意，与其他类型不同的，函数可以有多个声明，但只能有一个实现
    const callFunc: MyOverloadFunc = function (input: number | string): string {
        if (typeof input === 'number') {
            return `mm${input}`
        }
        return `cc${input}`
    }

    const result1 = callFunc(1)
    console.log(result1)
    const result2 = callFunc('fish')
    console.log(result2)
}

function testOverloadFunction() {
    testOverloadFunction1()
    testOverloadFunction2()
}

export default testOverloadFunction

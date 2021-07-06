// 普通命名函数
function go1(name: string) {
    console.log(`go:${name}`)
}

// 匿名函数赋值给变量
const go2 = (name: string, age: number) => {
    console.log(`name:${name},age:${age}`)
}

function testFunction() {
    go1('a')
    go2('fish', 200)
}

// 默认参数与可选参数
function go3(message = 'Hello', size?: number) {
    console.log(`message,${message},size:${size}`)
}

function testFunction2() {
    go3()
    go3('uu')
    go3('uu', 10)
}

// 不定参数的写法
function go4(format: string, ...args: any[]) {
    console.log(format, ...args)
}

function testFunction3() {
    go4('a')
    go4('b', 1, '2')
    go4('c', 1, 'bc', 'g')
}

type MyGo = {
    walk(): string
}

// 注解this参数
// 函数的返回值标注
function go5(this: MyGo, message: string): string {
    return `{${this.walk()},${message}}`
}

function testFunction4() {
    // 编译错误，因为this参数为null
    // 直接调用函数时，this参数取的是外部环境的this
    // go5('ab')

    const myObj = {
        walk: (): string => 'mm',
    }
    // 用call方法调用函数，可以指定this
    const result = go5.call(myObj, 'tt')
    console.log(result)
}

// 生成器函数，签名上要有*方法，每次返回值用yield关键字
function* go6() {
    let n = 10
    while (n >= 0) {
        yield n
        n -= 1
    }
}

function testFunction5() {
    const generator = go6()
    // 每次拿值就用它的next方法，只要done为false就永远有值
    // 生成器函数的问题在于，它不支持for in的方法
    let singleResult = generator.next()
    while (!singleResult.done) {
        console.log(`generator :${singleResult.value}`)
        singleResult = generator.next()
    }
}

// 这个是迭代器，不是生成器
function createGo7() {
    // 迭代器是一个对象，它还有一个key为Symbol.iterator的属性，该属性的值为生成器函数
    return {
        *[Symbol.iterator]() {
            let n = 10
            let i = 0
            while (n >= 0) {
                yield [i, `value${n}`]
                n -= 1
                i += 1
            }
        },
    }
}

function testFunction6() {
    const iterator = createGo7()
    // 满足要求的迭代器，就可以使用for of语法来遍历
    for (const [i, value] of iterator) {
        console.log(i, value)
    }
}

function runBasic() {
    testFunction()
    testFunction2()
    testFunction3()
    testFunction4()
    testFunction5()
    testFunction6()
}

export default runBasic

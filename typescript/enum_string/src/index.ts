// 枚举值默认是从0开始
enum NormalEnum {
    Red,
    Green,
}
function testEnum() {
    const a = NormalEnum.Red // 这个值为0

    const b = NormalEnum[0] // 这个值为Red
    const c = NormalEnum[1] // 这个值为Green
    const d = NormalEnum[2] // 这个值为undefined，TS并没有在编译时报错，这个enum的设计并不好
    console.log(a, b, c, d)
}

// 枚举值默认是从0开始
const enum NormalEnum2 {
    Red,
    Green,
}

function testEnum2() {
    const a = NormalEnum2.Red // 这个值为0

    // 使用了const enum以后，只能用string来访问enum。不能用整数来访问enum
    // 以下都会报错
    // const b = NormalEnum2[0]
    // const c = NormalEnum2[1]
    // const d = NormalEnum2[2]
    console.log(a)
}

// 枚举值默认是从0开始
const enum NormalEnum3 {
    Red,
    Green,
}

function testEnum3Inner(a: NormalEnum3) {
    console.log(a)
}

function testEnum3() {
    // 把其他枚举体传过去是不行的，会报错，即使值一样，枚举不是结构类型
    // testEnum3Inner(NormalEnum.Red)

    // 安全可靠，值为NormalEnum
    testEnum3Inner(NormalEnum3.Red)

    // 这里竟然能将整数当枚举传递过去，一点都安全，根本就没有整数为200的枚举
    testEnum3Inner(200)
}

// 这个写法最好
const enum NormalEnum4 {
    Red = 'red',
    Green = 'green',
}

function testEnum4Inner(a: NormalEnum4) {
    console.log(a)
}

function testEnum4() {
    // 安全可靠，值为NormalEnum
    testEnum4Inner(NormalEnum4.Red)

    // 要将枚举的值手动全部改为string，才是安全的
    // testEnum4Inner(200)

    // 手动传入字符串也不行
    // testEnum4Inner('red')
}

type NormalEnum5 = 'red' | 'green'

function testEnum5Inner(a: NormalEnum5) {
    console.log(a)
}

function testStringAsEnum() {
    // 传其他字符串也行
    testEnum5Inner(NormalEnum4.Red)

    // 支持手动传入字符串
    testEnum5Inner('red')

    // 传入整数当然是不行的
    // testEnum5Inner(200)
}

testEnum()
testEnum2()
testEnum3()
testEnum4()
testStringAsEnum()

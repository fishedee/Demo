function testObjectFunction1() {
    // 我们可以用object的形式来声明一个函数类型
    // 不要用in作为参数名，因为in是关键字
    type Dog = {
        (mk: number): string
    }

    // 直接将函数赋值给这个Dog类型是没问题的
    const a: Dog = function (mk: number): string {
        return `${mk}bb`
    }
    // 输出的是1bb
    console.log(a(1))

    // 输出的函数名字，就是a本身
    console.log(a.name)
}

function testObjectFunction2() {
    // 既然object可以表达function，那么它也可以带自己的字段和成员
    type Dog = {
        (): string
        next(): string
        size: number
    }

    function mm(): string {
        return 'Hello World'
    }
    mm.next = () => '123'
    mm.size = 100

    const a: Dog = mm
    a()
    console.log(a.next())
    console.log(a.size)
}

function testObjectFunction() {
    testObjectFunction1()
    testObjectFunction2()
}

export default testObjectFunction

function testArray() {
    // 推导为number[]类型
    const a = [1, 2, 3]

    a.push(3)
    // 下面这一句会自动报错，不能将string放入number[]类型
    // a.push('4')
    console.log(a)

    // 可以显式加入类型
    const b: string[] = ['1', '2', '3']

    // 推导为 (number | string)[]类型
    const c = [1, 'c']

    console.log(b)
    console.log(c)
}

function testAutoDetectArray() {
    // 直接声明时，类型为any[]
    const a = []

    a.push(1)
    a.push('2')
    console.log(a)

    // 返回值推导为 (number | string)[]类型
    return a
}

function testTuple() {
    // 元组，可以修改，但是将
    let a: [number, string, string]
    a = [1, '2', '3']
    a[0] = 4

    // 不能将类型不符的元组赋值过去，这样会报错
    // a = ['1', '2', '3']

    // 不能将其他长度的元组赋值过去，这样会报错
    // a = [1, '2', '3', '5']

    // 不能读取超越长度的index
    // console.log(a[3])

    // 可以推入新的元素进去，然后删除元素
    // 这里的设计并不好
    a.push(4)
    a.splice(0, 2)
}

testArray()
testAutoDetectArray()
testTuple()

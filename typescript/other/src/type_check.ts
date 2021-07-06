class NumberWrapper {}
class StringWrapper {}

// extends方式是一种编译时的条件类型判断
type WrapperResultType<T> = T extends number ? NumberWrapper : StringWrapper
function wrapper<T extends number | string>(input: T): WrapperResultType<T> {
    if (typeof input === 'number') {
        return new NumberWrapper()
    } else {
        return new StringWrapper()
    }
}

function testTypeCheck1() {
    // 编译时就可以进行类型的判断操作，这其实是函数重载的另外一种实现，但比函数重载强大多了
    const result1 = wrapper(1)
    const result2 = wrapper('hello')
    console.log(result1, result2)
}

// infer U是一种特殊的类型判断，它可以提取数组中的元素类型
type ElemType<T> = T extends (infer U)[] ? U : T

function testTypeCheck2() {
    // 可以看到R1,R2,R3的实际类型是啥
    type R1 = ElemType<number>
    type R2 = ElemType<number[]>
    type R3 = ElemType<string[]>
}
function testTypeCheck() {
    testTypeCheck1()
    testTypeCheck2()
}

export default testTypeCheck

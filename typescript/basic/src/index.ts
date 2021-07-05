function testNumber() {
    let a = 1 // 推导为number类型
    let b = 2.2 // 推导为number类型
    const c = 1 // 推导为number为1的类型，注意这是字面值类型，const的类型收窄
    const d: 1 = 1 // 可以在变量中指定类型
    let e: number = 12
    a += 1
    b += 2
    e += 3
    console.log(a, b, c, d, e)
}

function testString() {
    let a = 'a' // 推导为string类型
    const b = 'b' // 推导为string为b的类型，注意这是字面值类型，const的类型收窄
    const c: 'ck' = 'ck' // 可以在变量中指定类型
    let d: string = 'ge'
    a += '1'
    d += '3'
    console.log(a, b, c, d)
}

function testAny() {
    let a: any = 3 // any类型，可以执行任何的操作
    console.log(a)
    a += 3 //
    a = 'cd'
    a = a.toUpperCase()
    console.log(a)
}

function testUnknown() {
    let a: unknown = 3 // unkown必须显示指定类型，ts不会推导出这个类型
    // unknown的任何操作都是错误的，因为类型不知道，以下这一句会报错
    // a.toUpperCase()

    // 加上类型检查typeof的话，ts能在控制流中分析出a是string类型
    if (typeof a === 'string') {
        a = a.toUpperCase()
    }

    console.log(a)

    // 另外一种使用unknown的方法，是使用强制类型转换，强行告诉ts这个变量就是number类型，这样做是有运行时风险的
    a = (a as number) + 3

    console.log(a)
}

function testBigInt() {
    // bigint是在ES2020才发布的
    const a = 12n
    const b = 23n
    const c = a + b
    console.log(a, b, c)
}

function testObject() {
    // object类型，可以用{}，function和Array赋值
    const a: object = {
        b: 3,
    }
    const b: object = () => {
        console.log('cc')
    }
    const c: object = [1, 2, 3]

    // 但是number和string是不能赋值给object类型的，以下两句会报错
    // const d: object = 1
    // const e: object = 'kk'

    // object类型
    console.log(a, b, c)

    // object类型仅仅代表它是{}，function或者Array，并不能拿到它的子段信息
    // 例如，不能拿a.b成员
    // console.log(a.b)
}

function testObject2() {
    // 尽量避免使用Object与{}类型
    // Object与object是不同的，这一点真的很迷惑

    // Object类型，可以用{}，function和Array赋值
    const a: Object = {
        b: 3,
    }
    const b: Object = () => {
        console.log('cc')
    }
    const c: Object = [1, 2, 3]

    // Object类型，也可以用number和string赋值
    const d: Object = 1
    const e: Object = 'kk'

    // Object类型唯一不能赋值的是null和undefined
    // const k: Object = null
    // const j: Object = undefined

    // Object类型
    console.log(a, b, c, d, e)

    // Object类型仅仅代表它是{}，function或者Array，或者number，或者string，并不能拿到它的子段信息
    // 例如，不能拿a.b成员
    // console.log(a.b)
}

function testObject3() {
    // Object与{}类型几乎就是一个意思

    // {}类型，可以用{}，function和Array赋值
    const a: {} = {
        b: 3,
    }
    const b: {} = () => {
        console.log('cc')
    }
    const c: {} = [1, 2, 3]

    // {}类型，也可以用number和string赋值
    const d: {} = 1
    const e: {} = 'kk'

    // {}类型唯一不能赋值的是null和undefined
    // const k: {} = null
    // const j: {} = undefined

    // {}类型
    console.log(a, b, c, d, e)

    // {}类型仅仅代表它是{}，function或者Array，或者number，或者string，并不能拿到它的子段信息
    // 例如，不能拿a.b成员
    // console.log(a.b)
}

function testConcreteObject() {
    // 声明一个a变量，它的类型是{label:string}
    const a = {
        label: '34',
    }
    console.log(a.label)

    // 声明一个b变量，它的类型是{label:string}
    // 我们也可以显式声明它的类型
    let b: { label: string } = {
        label: '34',
    }
    console.log(b)

    // c的类型是{label:string,size:number}
    const c = {
        label: '34',
        size: 10,
    }

    // ts采取结构类型系统，c变量当然可以赋值给b类型{label:string}
    // 结构类型系统不需要显式表现类型的关系，只需要类型可以满足要求即可，
    b = c

    console.log(b)

    // 声明k变量，但没有赋值
    let k: {
        label: string
    }

    // 可以赋值
    k = { label: '12' }
    k = { label: '78' }

    // 对于立即创建的变量，即使满足类型约束，也不可以赋值，因为字段的数量必须完全相同
    // 只能真的很费解FIXME
    // k = { label: '23', size: 10 }

    // 但是对于迂回创建的变量，只要满足类型约束，就可以赋值，即使字段数量更多
    const k2 = { label: '23', size: 10 }
    k = k2

    console.log(k)
}

testNumber()
testString()
testAny()
testUnknown()
testBigInt()
testObject()
testObject2()
testObject3()
testConcreteObject()

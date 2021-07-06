type Day = 'Mon' | 'Tues' | 'Wes'
type Result = 12 | 34

// mappedType是ts弥补静态类型的方法，它的意思是创建一个类型，该类型含有Day的所有key，Value类型必须为Result类型
// in 操作符的意思是，将Day这种字面值类型并集的每一个元素，拿出来作为object类型的key类型
type MyMappedType = {
    [K in Day]: Result
}

function testMappedType1() {
    const a: MyMappedType = {
        Mon: 34,
        Tues: 12,
        // 如果缺少一个成员，都会报错
        Wes: 12,
    }
    console.log(a)
}

// 建立一个MyRecord类型，它其实就是原生Record类型的实现
// 就是刚才的MyMappedType类型的泛型版本而已
type MyRecord<T extends keyof any, U> = {
    [K in T]: U
}

function testMappedType2() {
    const a: MyRecord<Day, Result> = {
        Mon: 34,
        Tues: 12,
        // 如果缺少一个成员，都会报错
        Wes: 12,
    }
}

type Account = {
    id: number
    isEmployee: boolean
    notes: string[]
}

// in 操作符是将字面值类型的并集转换为object的key类型
// 那么keyof 操作符就是反过来，将object的key类型转换为字面值类型的并集
type AccountKey = keyof Account

function testMappedType3() {
    let a: AccountKey
    a = 'id'
    a = 'isEmployee'
    a = 'notes'
    // 这里会报错，因为'id3'不是Account的key类型，不在AccountKey字面值中
    // a = 'id3'
    console.log(a)
}

// 结合in操作符，与keyof类型，我们可以做到将object类型，转换为另外一种object类型
// 现在AccountOption类型的每个字段都是可选的
type AccountOption = {
    [K in keyof Account]?: Account[K]
}

function testMappedType4() {
    // Account类型的每个字段都是必选的
    const a: Account = {
        id: 1,
        isEmployee: true,
        notes: ['fish'],
    }
    console.log(a)

    // AccountOption类型的每个字段都是可选的
    const b: AccountOption = {
        id: 1,
        isEmployee: true,
    }
    console.log(b)
}
// 同理，还有预定义好的方法，例如Record,Partial,Required,ReadOnly和Pick等等

// mappedType的意思是，将一个类型为依据，转换到另外一个类型
function testMappedType() {
    testMappedType1()
    testMappedType2()
    testMappedType3()
    testMappedType4()
}

export default testMappedType

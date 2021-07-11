type Car = {
    name: string
    brand: string
}

function TestMap1() {
    console.log('map test1....')
    const a = new Map<number, Car>()

    a.set(1, {
        name: 'S600',
        brand: 'BENZ',
    })
    a.set(2, {
        name: 'RAV4',
        brand: 'TOYOTA',
    })
    console.log(a.get(1)) // 返回S600
    console.log(a.get(12)) // 没有的话，返回undefined
    console.log(a.has(1)) // true
    console.log(a.has(12)) // false
}

function TestMap2() {
    console.log('map test2....')
    const a = new Map<Car, number>()

    a.set(
        {
            name: 'S600',
            brand: 'BENZ',
        },
        1
    )
    a.set(
        {
            name: 'S600',
            brand: 'BENZ',
        },
        1
    )
    // size为2，也是一样，浅比较
    console.log(a.size)

    const b = new Map<Car, number>()
    const car = {
        name: 'RAV4',
        brand: 'TOYOTA',
    }
    b.set(car, 1)
    b.set(car, 2)
    // size为1，浅比较
    console.log(b.size)
}

export default function TestMap() {
    TestMap1()
    TestMap2()
}

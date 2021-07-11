function TestSet1() {
    console.log('set test1....')
    const a = new Set<number>()

    a.add(1)
    a.add(2)
    console.log(a.has(1)) // true
    console.log(a.has(12)) // false
}

type Country = {
    name: string
}

function TestSet2() {
    console.log('set test2....')
    const data = new Set<Country>()
    data.add({
        name: 'CHINA',
    })
    data.add({
        name: 'CHINA',
    })

    // size为2，不是1，因为js的Set是以对象引用放入的，进行的是浅比较
    console.log(data.size)

    const data2 = new Set<Country>()
    const country = {
        name: 'US',
    }
    data2.add(country)
    data2.add(country)

    // size为1
    console.log(data2.size)
}
export default function TestSet() {
    TestSet1()

    TestSet2()
}

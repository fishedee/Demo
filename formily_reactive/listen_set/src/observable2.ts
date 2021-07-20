import { observable, autorun } from '@formily/reactive'

function testObservable1_object() {
    const obs = observable({
        aa: {
            bb: 123,
        },
    })
    autorun(() => {
        // 触发2次
        // 首次
        // 自身赋值1次
        console.log('normal1_object', obs.aa)
    })

    // 不会触发，子字段的变化不会影响到父字段的触发
    console.log('1. sub assign')
    obs.aa.bb = 44

    // 会触发
    console.log('2. self assign')
    obs.aa = { bb: 789 }
}

function testObservable2_object() {
    const obs = observable({
        aa: {
            bb: 123,
        },
    })
    autorun(() => {
        // 触发2次
        // 首次
        // 自身赋值1次
        // 赋值如同console，一样是向对象执行get操作
        const mk = obs.aa
        console.log('normal2_object')
    })

    // 不会触发，子字段的变化不会影响到父字段的触发
    console.log('1. sub assign')
    obs.aa.bb = 44

    // 会触发1次
    console.log('2. self assign')
    obs.aa = { bb: 789 }
}

function testObservable3_object() {
    const obs = observable({
        aa: {},
    }) as any
    autorun(() => {
        // 触发1次
        // 首次
        const mk = obs.aa
        console.log('normal3_object')
    })

    // 不会触发，object的添加property不会触发
    console.log('1. self add property')
    obs.aa.bb = 4

    // 不会触发，obs.aa.bb的赋值不会触发
    console.log('2. self assign')
    obs.aa.bb = 5

    // 不会触发，object的移除property不会触发
    console.log('3. self remove property')
    delete obs.aa.bb
}

function testObservable4_object() {
    const obs = observable({
        aa: {},
    }) as any
    autorun(() => {
        // 触发3次
        // 首次
        // addProperty时
        // removeProperty时
        for (const i in obs.aa) {
            console.log('nothing')
        }
        console.log('normal4_object')
    })

    // 会触发，object的添加property会触发，对象是遍历时
    console.log('1. self add property')
    obs.aa.bb = 4

    // 不会触发，obs.aa.bb的赋值不会触发
    console.log('2. self assign')
    obs.aa.bb = 5

    // 会触发，object的移除property不会触发
    console.log('3. self remove property')
    delete obs.aa.bb
}

function testObservable1_array() {
    const obs = observable({
        aa: [] as number[],
    })
    autorun(() => {
        // 一共触发了1次
        // 首次
        const mk = obs.aa
        console.log('normal1_array')
    })

    // 不会触发，相当于object的添加property而已
    console.log('1.push')
    obs.aa.push(1)

    // 不会触发
    console.log('2.assign')
    obs.aa[0] = 3

    // 不会触发
    console.log('3.push')
    obs.aa.push(4)

    // 不会触发，相当于object的移除property而已
    console.log('4.pop')
    obs.aa.pop()

    // 不会触发
    console.log('5.assign')
    obs.aa[0] = 5
}

function testObservable2_array() {
    const obs = observable({
        aa: [] as number[],
    })
    autorun(() => {
        // 一共触发了5次
        // 首次，
        // push 的2次
        // pop的2次，pop一次，触发2次
        console.log('normal2_array', obs.aa.length)
    })

    // 会触发，因为push影响到了length字段
    console.log('1.push')
    obs.aa.push(1)

    // 不会触发，因为对某个元素赋值不影响length字段
    console.log('2.assign')
    obs.aa[0] = 3

    // 会触发，因为push影响到了length字段
    console.log('3.push')
    obs.aa.push(4)

    // 会触发，因为pop影响到了length字段，这个会触发2次，不知道为什么
    console.log('4.pop')
    obs.aa.pop()

    // 不会触发，因为对某个元素赋值不影响length字段
    console.log('5.assign')
    obs.aa[0] = 5
}

function testObservable3_array() {
    const obs = observable({
        aa: [] as any[],
    })
    autorun(() => {
        // 一共触发了6次
        // 首次，
        // push 的2次
        // pop的1次
        // 赋值的2次
        obs.aa.map((item) => '')
        console.log('normal3_array')
    })

    // 会触发，因为影响到了map
    console.log('1.push')
    obs.aa.push(1)

    // 会触发，因为影响到了map
    console.log('2.assign')
    obs.aa[0] = 3

    // 会触发，因为影响到了map
    console.log('3.push')
    obs.aa.push({})

    // 不会触发，嵌套元素赋值
    console.log('4.inner assign')
    obs.aa[1].kk = 3

    // 会触发，因为影响到了map
    console.log('5.pop')
    obs.aa.pop()

    // 会触发，因为影响到了map
    console.log('6.assign')
    obs.aa[0] = 5
}

export default function testObservableCaseTwo() {
    testObservable1_object()
    testObservable2_object()
    testObservable3_object()
    testObservable4_object()
    testObservable1_array()
    testObservable2_array()
    testObservable3_array()
}

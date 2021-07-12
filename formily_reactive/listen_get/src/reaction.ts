import { observable, reaction, autorun } from '@formily/reactive'

// 语法糖，reaction其实就是computed与autorun的混合
function testReaction1() {
    const obs = observable({
        aa: 1,
        bb: 2,
    })

    // 触发两次，初始化1次，更新后1次
    const dispose = reaction(() => obs.aa + obs.bb, console.log)

    obs.aa = 4

    dispose()
}

function testReaction2() {
    const obs = observable({
        aa: 1,
        bb: 2,
    })

    const computeValue = observable.computed(() => obs.aa + obs.bb)

    // 触发两次，初始化1次，更新后1次
    const dispose = autorun(() => {
        console.log(computeValue.value)
    })

    obs.aa = 4

    dispose()
}
export default function testReaction() {
    testReaction1()
    testReaction2()
}

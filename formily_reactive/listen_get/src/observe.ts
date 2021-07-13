import { observable, observe } from '@formily/reactive'

// observe仅在首次显式收集get依赖，而后每次发生变化，都通知一下，节点变化的情况
// 它可以具体到某个对象的某个字段的触发
export default function testObserve() {
    const obs = observable({
        aa: 11,
        bb: [1],
    })

    // 触发3次
    // obs.aa更改1次，obs.bb进行push的2次
    const dispose = observe(obs, (change) => {
        console.log('observe1', change)
    })

    obs.aa = 22

    // 触发2次
    // obs进行push的2次
    const dispose2 = observe(obs.bb, (change) => {
        console.log('observe2', change)
    })

    obs.bb.push(1)
    obs.bb.push(2)

    dispose()
    dispose2()
}

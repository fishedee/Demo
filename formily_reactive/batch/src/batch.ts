import { observable, autorun, batch } from '@formily/reactive'

export default function testBatch() {
    // 空字段的时候也能倾听
    const obs = observable<any>({
        aa: 1,
    })

    // 触发2次，首次，以及修改1次
    autorun(() => {
        console.log(obs.aa, obs.bb)
    })

    // 设置了两次，但是只触发1次，这是batch，批量触发的特性
    batch(() => {
        obs.aa = 321
        obs.bb = 'dddd'
    })
}

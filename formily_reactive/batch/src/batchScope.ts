import { batch, observable, autorun } from '@formily/reactive'

export default function testBatchScope() {
    const obs = observable<any>({})

    // 共4次触发
    // 首次，以及后续的4次修改
    autorun(() => {
        console.log(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    // 这里触发3次
    batch(() => {
        // scope里面第1次
        batch.scope(() => {
            obs.aa = 123
        })

        // scope里面第2次
        batch.scope(() => {
            obs.cc = 'ccccc'
        })

        // 两句都在外面的batch，它们是第3次触发
        obs.bb = 321
        obs.dd = 'dddd'
    })
}

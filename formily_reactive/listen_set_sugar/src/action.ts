import { observable, action, autorun } from '@formily/reactive'

// action是一种语法糖，将方法包装为batch
export default function testAction() {
    const obs = observable({
        aa: 1,
        bb: 2,
    })

    // 这里触发2次
    // 首次1次
    // 被action包装的方法1次
    autorun(() => {
        console.log(obs.aa, obs.bb)
    })

    // 传入一个方法，返回一个包装的方法
    // 这个方法的内容里面就是batch的
    const method = action(() => {
        obs.aa = 123
        obs.bb = 321
    })

    method()
}

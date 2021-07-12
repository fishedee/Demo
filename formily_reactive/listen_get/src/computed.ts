import { autorun, observable } from '@formily/reactive'

// computed与autorun是类似的，
// 它们都是收集get依赖，然后重新运行，它总是马上执行一次，
// 唯一不同的是computed是有一个返回值，返回值是一个ref对象，这个ref对象是observable的
export default function testComputed() {
    const obs = observable({
        aa: 11,
        bb: 22,
    })

    // 返回的数据用ref包装
    const computed = observable.computed(() => obs.aa + obs.bb)

    autorun(() => {
        console.log(computed.value)
    })

    obs.aa = 33
}

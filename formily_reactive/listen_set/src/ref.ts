import { autorun, observable } from '@formily/reactive'

export default function testRef() {
    // ref就是为了弥补基础类型无法倾听set与get的问题
    // ref将基础类型包装一个object，{value:xxx}里面
    const ref = observable.ref(1)

    autorun(() => {
        console.log(ref.value)
    })

    ref.value = 123
}

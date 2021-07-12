import { autorun, observable } from '@formily/reactive'

export default function testRef() {
    // box类型与ref类型类似
    // 不过它将基础类型包装为get()与set()方法而已
    const box = observable.box(1)

    autorun(() => {
        console.log(box.get())
    })

    box.set(123)
}

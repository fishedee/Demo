import { define, observable, autorun, action } from '@formily/reactive'

// model是语法糖
export default function testDefine() {
    class DomainModel {
        deep = { aa: 1 }

        shallow = {}

        // 因为基础类型被box引用了，代码会被变为box.set,box.get，但是这里ts感知不到
        box = 0

        // ref引用包装后，字段变为{value}类型，这里也是ts感知不到的
        ref = ''

        constructor() {
            // define对typescript的支持并不友好
            // 左边是字段或者方法名，右边是包装的方法
            define(this, {
                deep: observable,
                shallow: observable.shallow,
                box: observable.box,
                ref: observable.ref,
                computed: observable.computed,
                go: action,
            })
        }

        get computed() {
            return this.deep.aa + this.box.get()
        }

        go(aa, box) {
            this.deep.aa = aa
            this.box.set(box)
        }
    }

    const model = new DomainModel()

    autorun(() => {
        console.log(model.computed)
    })

    model.go(1, 2)
    model.go(1, 2) // 重复调用不会重复响应
    model.go(3, 4)
}

import { define, observable, autorun, action } from '@formily/reactive'

type Box<T> = {
    get(): T
    set(value: T): void
}

type Ref<T> = {
    value: T
}

// model是语法糖
export default function testDefine() {
    class DomainModel {
        deep = { aa: 1 }

        shallow = {}

        // 强行转换为Box类型，以让ts感知到
        box = 0 as unknown as Box<number>

        // 强行转换为Ref类型，以让ts感知到
        ref = '' as unknown as Ref<String>

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

        go(aa: number, box: number) {
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

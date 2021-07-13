import { model, autorun } from '@formily/reactive'

// model是一个更好的语法糖
export default function testModel() {
    const obs = model({
        // 普通属性自动声明 observable
        // 它不是针对某个字段包装为observable，而是以整个model为根，包装为observable，注意与define的不同
        aa: 1,
        bb: 2,

        // getter/setter 属性自动声明 computed
        get cc() {
            return this.aa + this.bb
        },

        // 函数自动声明 action，也就是被batch包围了
        update(aa: number, bb: number) {
            this.aa = aa
            this.bb = bb
        },
    })

    // 这段触发3次
    // 首次渲染
    // 第2次是单独赋值obs.aa
    // 第3次是执行被batch包围的update方法
    autorun(() => {
        console.log(obs.cc)
    })

    // 单独赋值
    obs.aa = 3

    // 调用了被batch包装的方法
    obs.update(4, 6)
}

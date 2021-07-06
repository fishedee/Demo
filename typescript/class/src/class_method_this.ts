class User {
    private name: string
    constructor(name: string) {
        this.name = name
    }

    // 直接声明的方法
    walk() {
        console.log((this ? this.name : '') + 'walk')
    }

    // 使用箭头声明的方法，默认就会绑定当前的this
    jump = () => {
        console.log(this.name + 'jump')
    }
}

function testClassMethodThis() {
    const a = new User('fish')

    // 这样的话附带有this
    a.walk()

    // 这样做是不安全的，会丢失this指针
    // 但是，TS并没有报错，相当诡异
    const b: () => void = a.walk
    b()

    // 这样的话也附带有this
    a.jump()

    // 即使只取方法，也有this，因为是箭头函数
    const c: () => void = a.jump
    c()
}

export default testClassMethodThis

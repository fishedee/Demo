class Dog {
    // 属性默认为public
    name: string
    constructor(label: string) {
        this.name = label
    }

    static showName: string = 'I am Dog Name'
    static getGlobalSize(): number {
        return 10
    }
}

function testClassFunction1() {
    const dog = new Dog('mm')
    console.log(dog.name)
    // Dog的静态变量，与静态方法
    console.log(Dog.showName)
    console.log(Dog.getGlobalSize())

    // 静态方法不能通过实例来拿取
    // console.log(dog.showName)
}

// 在ts的实现来看，Class其实是一个Object，一个含有new方法的Object而已

type MyType = {
    new (...args: any[]): object
    showName: string
    getGlobalSize(): number
}
function testClassFunction2() {
    // 看，Dog类本身就是一个实例，它可以赋值给一个Type
    const a: MyType = Dog

    console.log(a.showName)
    console.log(a.getGlobalSize())

    // 要使用MyType的new方法，就需要先把它extends了，然后创建这个对象出来
    class MM extends a {
        constructor(...args: any[]) {
            super(...args)
        }
    }

    // 创建了这个对象
    const mm = new MM('gg')

    // 可以拿到这个MM底层对应的name
    console.log((mm as Dog).name)
}

function testClassFunction() {
    testClassFunction1()
    testClassFunction2()
}
export default testClassFunction

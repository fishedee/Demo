interface Walker {
    walk(): void
}

// 接口实现用implements而不是extends
class Dog implements Walker {
    public walk() {
        console.log('dog walk')
    }
}

class Cat implements Walker {
    public walk() {
        console.log('cat walk')
    }
}

function testClassInterface1() {
    const a = new Dog()
    a.walk()

    const b = new Cat()
    b.walk()
}

type MK = {
    swim(): void
}

// 在ts中，你甚至可以用type来作为类的implements指定，像interface一样
class Fish implements MK {
    swim(): void {
        console.log('fish swim')
    }
}

interface Swimer {
    swim(): void
}

function testClassInterface2() {
    const a = new Fish()
    a.swim()

    // 即使Fish类型没有显式实现Swimer接口，也可以赋值给Swimer接口，结构性类型系统
    // implements其实是一种类型的声明性约束，在语法层要求代码实现了这个接口而已
    const b: Swimer = a
    b.swim()
}

// SwimerAndWalker接口同是extends了两个
interface SwimerAndWalker extends Swimer, Walker {}

// type类型的话，可以用&运算来模拟extends的接口
type MM = MK & Walker

class Frog implements Swimer, Walker {
    public swim(): void {
        console.log('frog swim')
    }

    public walk(): void {
        console.log('frog walk')
    }
}

function testClassInterface3() {
    // 赋值失败，因为Fish只会Swim，不会Walk
    // const a: SwimerAndWalker = new Fish()

    const a: SwimerAndWalker = new Frog()
    const b: MM = new Frog()
    a.swim()
    a.walk()

    b.swim()
    b.walk()
}

function testClassInterface() {
    testClassInterface1()
    testClassInterface2()
    testClassInterface3()
}

export default testClassInterface

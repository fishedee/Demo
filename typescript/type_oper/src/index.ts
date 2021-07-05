function testTypeDeclarion() {
    // 声明一个类型
    type Age = number

    // 使用这个类型来声明变量
    let a: Age = 3

    console.log(a)

    // 再次声明一个类型，也是number类型
    type Height = number
    const b: Height = 4

    // Height类型的变量b可以赋值给Age类型的变量a
    // ts中依然是结构类型系统
    a = b

    console.log(b)
}

function testTypeOr() {
    // ts中类型是可以运算的
    type Age = number
    type Label = string

    // Or运算允许取两个类型的并集
    let a: Age | Label

    // 因此变量a既可以被number，也可以被string赋值
    if (Math.random() < 0.5) {
        a = 1
        console.log(a)
    } else {
        a = '2'
        console.log(a)
    }

    // 但是a由于范围太大，无法调用number或者string的方法，所以以下这一句报错
    // a.toUpperCase()
}

function testTypeObjectOr() {
    // ts中类型是可以运算的
    type Dog = {
        walk(): void
        fire(): void
    }
    type Cat = {
        walk(): void
        miao(): void
    }

    let a: Dog | Cat

    // 因此变量a既可以被Dog，也可以被Cat赋值
    const rand = Math.random()
    if (rand < 0.5) {
        a = {
            walk: () => {
                console.log('walk')
            },
            fire: () => {
                console.log('fire')
            },
        }
    } else if (rand < 0.8) {
        a = {
            walk: () => {
                console.log('walk')
            },
            miao: () => {
                console.log('miao')
            },
        }
    } else {
        // a类型当然也可以是两个的组合
        a = {
            walk: () => {
                console.log('walk')
            },
            fire: () => {
                console.log('fire')
            },
            miao: () => {
                console.log('miao')
            },
        }
    }

    // 但是a由于范围太大，只能调用局部相同的方法，就是walk
    a.walk()
}

function testTypeAnd() {
    // ts中类型是可以运算的
    type Age = number
    type Label = string

    // Or运算允许取两个类型的并集，显然任何值都取不了
    let a: Age & Label

    // 因此变量a既可以被number，也可以被string赋值
    if (Math.random() < 0.5) {
        // 任何值都取不了，报错
        // a = 1
    } else {
        // 任何值都取不了，报错
        // a = '2'
    }

    // console.log(a as unknown)
}

function testTypeObjectAnd() {
    // ts中类型是可以运算的
    type Dog = {
        walk(): void
        fire(): void
    }
    type Cat = {
        walk(): void
        miao(): void
    }

    // 是Dog与Cat的组合
    let a: Dog & Cat

    // 因此变量a只能被同时满足Dog，和Cat赋值
    // 报错
    /*
    a = {
        walk: () => {
            console.log('walk')
        },
        fire: () => {
            console.log('fire')
        },
    }
    */

    /* 也报错
        a = {
            walk: () => {
                console.log('walk')
            },
            miao: () => {
                console.log('miao')
            },
        }
    */

    // a类型只能是两个的组合
    a = {
        walk: () => {
            console.log('walk')
        },
        fire: () => {
            console.log('fire')
        },
        miao: () => {
            console.log('miao')
        },
    }

    // 但是a可以被赋值的类型更少，所以能力更大
    a.walk()
    a.fire()
    a.miao()
}

// HTMLInputElement是HTMLElement的子类
type Dog = {
    type: string
    label: HTMLElement
    walk(): void
}

type Cat = {
    type: number
    label: HTMLInputElement
    walk(): void
}

function testControlFlowInner(a: Dog | Cat) {
    a.walk()
    if (typeof a.type === 'string') {
        // 因此在这里的话,ts在已知type为string的情况下
        // 也只能推导出a.label的类型为HTMLElement|HTMLInputElement
        console.log(a.label)
    }
}

function testControlFlow() {
    // 因为并集，可以是string的type，加上HTMLInputElement的label
    testControlFlowInner({
        type: '1',
        label: new HTMLInputElement(),
        walk: () => {
            console.log('walk')
        },
    })
}

// HTMLInputElement是HTMLElement的子类
// 但是如果我们将type用字面值来表达的话
type Dog2 = {
    type: 'a'
    label: HTMLElement
    walk(): void
}

type Cat2 = {
    type: 'b'
    label: HTMLInputElement
    walk(): void
}

function testControlFlowInner2(a: Dog2 | Cat2) {
    a.walk()
    if (a.type === 'b') {
        // ts能推导出来label是HTMLInputElement
        console.log(a.label)
    }
    if (a.type === 'a') {
        // ts能推导出来label是HTMLElement类型
        console.log(a.label)
    }
}

// FIXME，我认为这里依然不是很严谨，具体看书P157
function testControlFlow2() {
    // 因为并集，可以是string的type，加上HTMLInputElement的label
    testControlFlowInner2({
        type: 'a',
        label: new HTMLInputElement(),
        walk: () => {
            console.log('walk')
        },
    })
}

testTypeDeclarion()
testTypeOr()
testTypeObjectOr()
testTypeAnd()
testTypeObjectAnd()
testControlFlow()
testControlFlow2()

import { Serializer } from 'v8'

class Game {
    // 构造器含有private,protected,public的表明它不仅是构造器参数，还会自动被赋值为成员
    constructor(private isStart: boolean, private playerSize: number) {}

    // 方法的定义
    public getIsStart() {
        return this.isStart
    }

    public getPlayerSize() {
        return this.playerSize
    }
}

// 继承用，extends
class PieceGame extends Game {
    constructor(
        public pieceSize: number,
        isStart: boolean,
        playerSize: number
    ) {
        // 调用父类的构造器
        super(isStart, playerSize)
    }
}

class AnimalGame extends Game {
    // 构造器的animalSize是没有访问标志的，没有public，没有private，也没有protected，所以这个仅仅是构造器参数，不是成员
    constructor(animalSize: number, isStart: boolean, playerSize: number) {
        super(isStart, playerSize)
    }
}

function testClass1() {
    const game = new Game(true, 10)

    // isStart是private访问，不能获取
    // console.log(game.isStart)
    console.log(game.getIsStart()) // 这个值为true
    console.log(game.getPlayerSize()) // 这个值为10

    const pieceGame = new PieceGame(10, false, 70)
    // pieceSize是public权限，所以可以访问
    console.log(pieceGame.pieceSize)
    console.log(pieceGame.getIsStart())
    console.log(pieceGame.getPlayerSize())

    const animalGame = new AnimalGame(10, true, 80)
    // animalSize是不是成员，它仅仅是个构造器参数而已
    // console.log(animalGame.animalSize)
    console.log(animalGame.getIsStart())
    console.log(animalGame.getPlayerSize())
}

// 抽象类
abstract class Animal {
    // 抽象类也可以有自己的方法
    public go() {
        if (this.canGo() === false) {
            console.log('this animal can not walk!')
            return
        }
        console.log('animal walk')
    }

    abstract canGo(): boolean
}

class Dog extends Animal {
    public canGo() {
        return true
    }
}

class Fish extends Animal {
    public canGo() {
        return false
    }
}

function testClass2() {
    // 抽象类不能实例化
    // const animal = new Animal()

    // 非抽象类才可以实例化
    const dog = new Dog()
    dog.go()

    const fish = new Fish()
    fish.go()
}

function testClassBasic() {
    testClass1()
    testClass2()
}

export default testClassBasic

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
    jump = ():number => {
        console.log(this.name + 'jump')
        return 123;
    }
}

let gg:Person | undefined;

abstract class Person{
    constructor(){
        console.log('constructor begin --- ');
        //能调用得到子级Man.walk.
        this.walk();
        //失败，这个时候调用的是父级的jump
        this.jump();
        console.log('constructor end --- ');
        gg = this;
    }
    
    //直接声明的方法,没有箭头的函数，
    walk(){
        console.log('person walk');
    }

    //有箭头的函数
    //加入private修饰，我们能避免jump方法被override，TS没有提供final的修饰符 
    jump = ()=>{
        console.log('person jump');
    }
}

/*
箭头函数的实现，运行时定义函数。没有箭头函数的实现，一开始就定义在protype链的函数
class Person {
    constructor() {
        this.jump = () => {
            console.log('person jump');
        };
        console.log('constructor begin --- ');
        ...
    }
    walk() {
        console.log('person walk');
    }
}
*/

class Man extends Person{
    constructor(){
        super();
    }

    // 直接声明的方法
    override walk() {
        super.walk();
        console.log('man walk');
    }

    //有箭头的函数，override只检查声明，没有检查箭头的问题
    jump = ()=>{
        //调用super会失败，箭头函数里面会丢失super
        //super.jump();
        console.log('man jump');
    }
}

/*
Man.jump箭头函数的实现，在super运行完成以后，才去定义this.jump.
class Man extends Person {
    constructor() {
        super();
        this.jump = () => {
            //调用super会失败，箭头函数里面会丢失super
            //super.jump();
            console.log('man jump');
        };
    }
    walk() {
        super.walk();
        console.log('man walk');
    }
}
*/

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

    const man = new Man();
    console.log('constructor outer begin ---');
    man.walk();
    man.jump();
    console.log('constructor outer end ---');
    gg?.jump();
    console.log('gg end ---');
   
}

export default testClassMethodThis

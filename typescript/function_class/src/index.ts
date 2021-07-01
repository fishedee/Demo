import Binder from './binder';

//声明对象类型
type User = {
    userId:number,
    name:string
}

//使用对象类型
let a:User = {
    userId:1,
    name:"fish",//注释该字段就会报错
}

console.log(a);

//Binder的构造函数是私有的，所以不能直接new
//let binder = new Binder(a,[]);

//使用工厂方法生成class
let binder = Binder.create(a);

//不能使用path成员，因为该成员是私有的
//binder.path

//调用class方法，以及赋值
let b = binder.get();
console.log(b.userId);
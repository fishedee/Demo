import createBinder from './binder';

//声明对象类型
type User = {
    userId:number,
    name:string
}

function createObjectBinder(){
    //使用对象类型
    let user:User = {
        userId:1,
        name:"fish",
    }

    //使用工厂方法生成class
    let binder = createBinder(user);
    console.log(binder);
}

createObjectBinder(); 
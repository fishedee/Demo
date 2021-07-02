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

    console.log(binder.get());
    let binder2 = binder.key("userId");
    let binder3 = binder2.key("cc");
}

function createArrayBinder(){
    //使用对象类型
    let user:User[] = [{
        userId:1,
        name:"fish",
    },{
        userId:2,
        name:"cat",
    }];

    //使用工厂方法生成class
    let binder = createBinder(user);
    console.log(binder);
}


createObjectBinder(); 
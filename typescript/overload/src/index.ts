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

    //调用class方法，以及赋值
    let data = binder.get();
    console.log(data);

    //typescript能推导出来binder是ObjectBinder，没有index方法
    //binder.elem();
}

function createArrayBinder(){
     //使用对象类型
     let userList:User[] = [{
        userId:1,
        name:"fish",
    },{
        userId:2,
        name:"cat",
    }];

     //使用工厂方法生成class
     let binder = createBinder(userList);

     let data = binder.get();
     console.log(data);

     //typescript推导出来是ArrayBinder，所以有index方法
     let elemBinder = binder.index(0);
     let data2 = elemBinder.get();
     console.log(data2);
}

function createArrayNormalBinder(){
    //普通类型的数组无法传递进去
    //let numberList:number = [1,2,3];

    //因为不满足createBinder的类型约束
    //let binder = createBinder(numberList);
}


createObjectBinder(); 
createArrayBinder();
createArrayNormalBinder();
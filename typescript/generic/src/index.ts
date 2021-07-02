import createBinder from './binder';

//声明对象类型
type User = {
    userId:number,
    name:string
}

type Country = {
    id:number,
    name:string,
    users:User[]
}

function createObjectBinder(){
    //使用对象类型
    let user:User = {
        userId:1,
        name:"fish",
    }

    //使用工厂方法生成class
    let binder = createBinder(user);
   
    //ts推导出来binder为ObjectBinder类型，有key方法
    let binder2 = binder.key("userId");
    //所以ts能推导出来，它没有index方法
    //console.log(binder.index(0));

    //最后ts能推导出来binder2是NumberBinder类型
    console.log(binder2.get());
}

function createArrayBinder(){
    //使用对象类型
    let users:User[] = [{
        userId:1,
        name:"fish",
    },{
        userId:2,
        name:"cat",
    }];

    //使用工厂方法生成class
    let binder = createBinder(users);

    //ts推导出来binder为ArrayBinder类型，有index方法
    let binder2 = binder.index(0);
    //所以ts能推导出来，它没有key方法
    //console.log(binder.key("mm"));

    //ts推导出来binder2为ObjectBinder类型，有key方法，注意，这里是递归调用
    let binder3 = binder2.key("name");
    //所以ts推导出来，它没有index方法
    //console.log(binder2.index(0));
}

function createComplexBinder(){
    let countries:Country[] = [
        {
            id:1,
            name:"CN",
            users:[
                {
                    userId:10001,
                    name:"fish",
                },
                {
                    userId:10002,
                    name:"cat",
                }
            ]
        },
        {
            id:2,
            name:"UK",
            users:[
                {
                    userId:10003,
                    name:"mm",
                },
                {
                    userId:10004,
                    name:"gg",
                }
            ]
        },
    ];

    let binder = createBinder(countries);

    //正常使用
    console.log( binder.index(0).key("id").get()) ;
    console.log( binder.index(0).key("name").get()) ;

    //以下2行会被ts自动报错
    //console.log( binder.key("name").get()) ;
    //console.log( binder.index(0).key("name").index(0).get()) ;

    //正常使用
    console.log( binder.index(0).key("users").index(0).get()) ;
    console.log( binder.index(0).key("users").index(0).key("userId").get()) ;

    //以下3行会被ts自动报错
    //console.log( binder.index(0).key("user").index(0).get()) ;
    //console.log( binder.index(0).key("users").key("userId").get()) ;
    //console.log( binder.index(0).key("users").index(1).key("userId").index(1).get()) ;
}


createObjectBinder(); 
createArrayBinder();
createComplexBinder();
import {getter,getter2,callback, wrapper,wrapper2,wrapper3} from './binder';

//声明对象类型
type User = {
    userId:number,
    name:string
}

function checkGetter(){
    let user:User = {
        userId:1,
        name:"abc",
    }
    let numberList:number[] = [];
    let stringList:string[] = [];
    
    
    let userId = getter(user,"userId");
    numberList.push(userId);
    
    //typescript能推导出userId是int类型，不能push到string[]里面
    //stringList.push(userId);
    
    let name = getter(user,"name");
    stringList.push(name);
    
    //typescript能推导出name是string类型，不能push到int[]里面
    //numberList.push(name);

    //typescript能推导出来这个cc不在User的字段中
    //getter(user,"cc");
}

function checkGetter2(){
    let user:User = {
        userId:1,
        name:"abc",
    }
    let numberList:number[] = [];
    let stringList:string[] = [];
    
    
    let userId = getter2(user,"userId");
    numberList.push(userId);
    
    //typescript能推导出userId是int类型，不能push到string[]里面
    //stringList.push(userId);
    
    let name = getter2(user,"name");
    stringList.push(name);
    
    //typescript能推导出name是string类型，不能push到int[]里面
    //numberList.push(name);

    //typescript能推导出来这个cc不在User的字段中
    //getter2(user,"cc");
}

function checkCallback(){
    let user:User = {
        userId:1,
        name:"abc",
    }
    let numberList:number[] = [];
    let stringList:string[] = [];

    callback(user,"userId",(id)=>{
        numberList.push(id);

        //typescript能推导出id是number类型
        //stringList.push(id);
    });

    callback(user,"name",(name)=>{
        stringList.push(name);

        //typescript能推导出name是string类型
        //numberList.push(name);
    });

    /*
    typescript能推导出来这个cc不在User的字段中
    callback(user,"cc",()=>{

    });
    */
}

function checkWrapper(){
    let user:User = {
        userId:1,
        name:"abc",
    }
    let numberList:number[] = [];
    let stringList:string[] = [];

    //typescript能推导出来，userIdWrapper是Wrapper<number>类型
    let userIdWrapper = wrapper(user,"userId");
    numberList.push(userIdWrapper.get());
    //stringList.push(userIdWrapper.get());
    
    let nameWrapper = wrapper(user,"name");
    stringList.push(nameWrapper.get());
    //numberList.push(nameWrapper.get());
}

function checkWrapper2(){
    let user:User = {
        userId:1,
        name:"abc",
    }

    //typescript能推导出来，返回的是NumberWrapper类型 | StringWrapper类型
    //所以既没有getString方法，也没有getNumber方法
    let userIdWrapper = wrapper2(user,"userId");
    //这里会报错，因为NumberWrapper | StringWrapper没有getString方法与getNumber方法
    //console.log(userIdWrapper.getString());
    //console.log(userIdWrapper.getNumber());

     //typescript能推导出来，返回的是StringWrapper类型，而不是NumberWrapper类型
     let nameWrapper = wrapper2(user,"name");
     //这里会报错，因为NumberWrapper | StringWrapper没有getString方法与getNumber方法
     //console.log(nameWrapper.getNumber());
     //console.log(nameWrapper.getString());
}

function checkWrapper3(){
    let user:User = {
        userId:1,
        name:"abc",
    }

    //typescript能推导出来，返回的是NumberWrapper类型，而不是StringWrapper类型
    let userIdWrapper = wrapper3(user,"userId");
    console.log(userIdWrapper.getNumber());
    //这里会报错，因为NumberWrapper没有getString方法
    //console.log(userIdWrapper.getString());

     //typescript能推导出来，返回的是StringWrapper类型，而不是NumberWrapper类型
     let nameWrapper = wrapper3(user,"name");
     console.log(nameWrapper.getString());
     //这里会报错，因为NumberWrapper没有getString方法
     //console.log(nameWrapper.getNumber());
}

checkGetter();
checkGetter2();
checkCallback();
checkWrapper();
checkWrapper2();
checkWrapper3();
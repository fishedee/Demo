//函数重载
type CombineType<U> = Array<U> | Object | number 

export default function createBinder<T extends unknown[]> (data:T):'a';
export default function createBinder<T extends object> (data:T):'b';
export default function createBinder<T extends number> (data:T):'c';

//这样能做多个复杂函数的重载
export default function createBinder<T>(data:T) {
    if( data instanceof Array ){
        return createBinderWithPath(data,[]);
    }else if( typeof data === 'object'){
        //带有强制的类型转换，仅仅是为了告诉ts编译器，我觉得这个就是什么类型
        return createBinderWithPath(data as unknown as object,[]);
    }else if( typeof data === 'number'){
        return createBinderWithPath(data,[]);
    }else{
        throw new Error("123");
    }
}


function createBinderWithPath<T extends unknown[]> (data2:T,path:string[]):'a';
function createBinderWithPath<T extends object> (data2:T,path:string[]):'b';
function createBinderWithPath<T extends number> (data2:T,path:string[]):'c';

//函数重载的实现，通过instanceOf选择不同的类型
function createBinderWithPath<T>(data2:T,path:string[]){
    if( data2 instanceof Array){
        return 'a';
    }else if( typeof data2 === 'object'){
        return 'b';
    }else if( typeof data2 === 'number'){
        return 'c';
    }else{
        throw new Error("123");
    }
}
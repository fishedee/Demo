//函数重载
type CombineType<U> = Array<U> | Object | number 
type NumberBinderChecker<T> = T extends number? NumberBinder:never;
type StringBinderChecker<T> = T extends string? StringBinder:never;
type ObjectBinderChecker<T> = T extends object ? (T extends unknown[] ? ArrayBinder<T>:ObjectBinder<T>):never;
type AllBinderChecker<T> = NumberBinderChecker<T> | StringBinderChecker<T> | ObjectBinderChecker<T>;

//这样能做多个复杂函数的重载
export default function createBinder<T>(data:T):AllBinderChecker<T>{
    return createBinderWithPath(data,[]);
}

//函数重载的实现，通过instanceOf选择不同的类型
function createBinderWithPath<T>(data:T,path:string[]):AllBinderChecker<T>{
    if( data instanceof Array){
        return new ArrayBinder(data,path) as AllBinderChecker<T>;
    }else if( typeof data === 'object'){
        return new ObjectBinder(data as unknown as object,path) as AllBinderChecker<T>;
    }else if( typeof data === 'number'){
        return new NumberBinder(data,path) as AllBinderChecker<T>;
    }else if( typeof data === 'string'){
        return new StringBinder(data,path) as AllBinderChecker<T>;
    }else{
        throw new Error("123");
    }
}

//声明class
class Binder<T>{
    protected constructor(
        protected data:T,
        protected path:string[],
    ){}

    public get(){
        return this.data;
    }

}

class NumberBinder extends Binder<number>{
    public constructor(
        protected data:number,
        protected path:string[],
    ){
        super(data,path);
    }
}

class StringBinder extends Binder<string>{
    public constructor(
        protected data:string,
        protected path:string[],
    ){
        super(data,path);
    }
}


class ObjectBinder<T extends object> extends Binder<T>{
    public constructor(
        protected data:T,
        protected path:string[],
    ){
        super(data,path);
    }

    public key<K extends keyof T>(index:K):AllBinderChecker<T[K]>{
        return createBinderWithPath(this.data[index],[...this.path,index+""]);
    }
}
    
type ElementType<T> = T extends (infer U)[] ? U:T;

class ArrayBinder<T extends unknown[]> extends Binder<T>{
    public constructor(
        protected data:T,
        protected path:string[],
    ){
        super(data,path);
    }

    public index(index:number):AllBinderChecker<ElementType<T>>{
        return createBinderWithPath(this.data[index],[...this.path,index+""]);
    }
}
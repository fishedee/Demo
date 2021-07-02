//函数重载
type CombineType<U> = Array<U> | Object | number 

export default function createBinder<T extends unknown[]> (data:T):ArrayBinder<T>;
export default function createBinder<T extends object> (data:T):ObjectBinder<T>;
export default function createBinder<T extends number> (data:T):NumberBinder;
export default function createBinder<T extends string> (data:T):StringBinder;

//这样能做多个复杂函数的重载
export default function createBinder<T>(data:T) {
    if( data instanceof Array ){
        return createBinderWithPath(data,[]);
    }else if( typeof data === 'object'){
        return createBinderWithPath(data as unknown as object,[]);
    }else if( typeof data === 'number'){
        return createBinderWithPath(data,[]);
    }else if( typeof data === 'string'){
        return createBinderWithPath(data,[]);
    }else{
        throw new Error("123");
    }
}


function createBinderWithPath<T extends unknown[]> (data2:T,path:string[]):ArrayBinder<T>;
function createBinderWithPath<T extends object> (data2:T,path:string[]):ObjectBinder<T>;
function createBinderWithPath<T extends number> (data2:T,path:string[]):NumberBinder;
function createBinderWithPath<T extends string> (data2:T,path:string[]):StringBinder;


//函数重载的实现，通过instanceOf选择不同的类型
function createBinderWithPath<T>(data2:T,path:string[]){
    if( data2 instanceof Array){
        return new ArrayBinder(data2,path);
    }else if( typeof data2 === 'object'){
        return new ObjectBinder(data2,path);
    }else if( typeof data2 === 'number'){
        return new NumberBinder(data2,path);
    }else if( typeof data2 === 'string'){
        return new StringBinder(data2,path);
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

    public key<K extends keyof T,U extends T[K]>(index:K):ObjectBinder<U>;
    public key<K extends keyof T>(index:K):ArrayBinder<U>;
    public key<K extends keyof T>(index:K):NumberBinder;
    public key<K extends keyof T>(index:K):String; 
    public key<K extends keyof T,U extends T[K]>(index:K){
        let value = this.data[index];
        //这里不能再继续传递createBinderWithPath，ts推导不了多一层的泛型
        if( typeof value === 'object' && value instanceof Array){
            return new ArrayBinder(value,[...this.path,index+""]);
        }else if( typeof value === 'object'){
            return new ObjectBinder(value as unknown as object,[...this.path,index+""]);
        }else if( typeof value === 'number'){
            return new NumberBinder(value,[...this.path,index+""]);
        }else if( typeof value === 'string'){
            return new StringBinder(value,[...this.path,index+""]);
        }else{
            throw new Error("123");
        }
    }
}
    
class ArrayBinder<T extends unknown[]> extends Binder<Array<T>>{
    public constructor(
        protected data:Array<T>,
        protected path:string[],
    ){
        super(data,path);
    }

    public index(index:number){
        return createBinderWithPath(this.data[index],[...this.path,index+""]);
    }
}
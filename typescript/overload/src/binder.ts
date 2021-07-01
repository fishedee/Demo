//函数重载
export default function createBinder<U extends object>(data:Array<U>) : ArrayBinder<Array<U>>;
export default function createBinder<U extends object>(data:U) : ObjectBinder<U>;


//同时表达这个类型，要么是一个元素为object的数组，要么是一个普通的object
export default function createBinder<U extends object>(data: (U | Array<U>)) {
    return createBinderWithPath(data,[]);
}

//函数重载的实现，通过instanceOf选择不同的类型
function createBinderWithPath<U extends object>(data:(U | Array<U>),path:string[]){
    if( data instanceof Array){
        return new ArrayBinder(data,[]);
    }else{
        return new ObjectBinder(data,[]);
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

class ObjectBinder<T> extends Binder<T>{
    public constructor(
        protected data:T,
        protected path:string[],
    ){
        super(data,path);
    }
}
    
class ArrayBinder<T extends object> extends Binder<Array<T>>{
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
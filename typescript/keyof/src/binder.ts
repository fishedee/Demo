export function getter<O extends object,K extends keyof O>(o:O,k:K):O[K]{
    return o[k];
}

//即使忽略了返回值的类型，ts依然会在声明文件中推导出这个函数的返回值类型是O[k]，看生成的.d.ts文件就能看到
export function getter2<O extends object,K extends keyof O>(o:O,k:K){
    return o[k];
}

export function callback<O extends object,K extends keyof O>(o:O,k:K,callback:(arg:O[K])=>void){
    setTimeout(()=>{
        callback(o[k]);
    },10);
}

export function wrapper<O extends object,K extends keyof O>(o:O,k:K):Wrapper<O[K]>{
    return new Wrapper(o[k]);
}

class Wrapper<T> {
    public constructor(
        private data:T,
    ){}

    public get():T{
        return this.data;
    }
}

//在忽略返回值参数的情况，这里会推导出来返回值类型是NumberWrapper | StringWrapper
//这个写法并不好，我们希望typescript可以根据key，推导出来应该返回NumberWrapper类型，还是StringWrapper类型
export function wrapper2<O extends object,K extends keyof O,U extends O[K]>(o:O,k:K){
    let data = o[k];
    if( typeof data === 'number' ){
        return new NumberWrapper(data);
    }else if ( typeof data === 'string'){
        return new StringWrapper(data);
    }else{
        throw new Error("213");
    }
}

class NumberWrapper {
    public constructor(
        private data:number,
    ){}

    public getNumber():number{
        return this.data;
    }
}

class StringWrapper {
    public constructor(
        private data:string,
    ){}

    public getString():string{
        return this.data;
    }
}

//函数重载的另外一种方法，对返回值类型进行判断，来决定返回什么最终类型
type NumberTypeChecker<T> = T extends number ? NumberWrapper:never;
type StringTypeChecker<T> = T extends string ? StringWrapper:never;
type AllChecker<T> = NumberTypeChecker<T> | StringTypeChecker<T>;

export function wrapper3<O extends object,K extends keyof O>(o:O,k:K):AllChecker<O[K]>{
    let data = o[k];
    if( typeof data === 'number' ){
        return new NumberWrapper(data) as AllChecker<O[K]>;
    }else if ( typeof data === 'string'){
        return new StringWrapper(data) as AllChecker<O[K]>;;
    }else{
        throw new Error("213");
    }
}

//声明class类型
export default class Binder<T>{
    private constructor(
        private data:T,
        private path:string[],
    ){}

    public get(){
        return this.data;
    }

    public static create<U>(data:U){
        return new Binder<U>(data,[]);
    }
}
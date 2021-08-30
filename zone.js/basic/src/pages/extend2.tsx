
import 'zone.js';

let errorZone = Zone.current.fork({
  name:'errorZone',
  properties:{
      hasGlobalCatch:true,
  }
});

function wrapper<T extends Function>(callback:T):T{
    let result = async function(...args:any[]):any{
        let hasGlobalCatch = Zone.current.get('hasGlobalCatch');
        if( hasGlobalCatch ){
            return await callback(args);
        }else{
            return new Promise((resolve,reject)=>{
                errorZone.run(async ()=>{
                    try{
                        let result = await callback(args);
                        resolve(result);
                    }catch(e){
                        console.log('catch error',e);
                    }
                });
            });
        }
    }
    return result as T;
}
export default function IndexPage() {
    //包装以后，可以正常使用，能直接调用得到返回值
    const myFun = wrapper(()=>{
        return '123';
    });

    //所有请求被wrapper以后都需要await
    const onClick = wrapper(async ()=>{
        console.log('dd', await myFun());
    });

    //可以捕捉错误
    const onClick2 = wrapper(()=>{
        throw new Error("123");
    });

    
    const myFun2 = wrapper(()=>{
        throw new Error("456");
    });

    //直接使用myFun2
    const onClick3 = myFun2;

    //这里故意直接嵌套的是myFun2方法，很多库在这里就测试失败了
    //可以捕捉异步的错误，能避免next的出现
    const onClick4 = wrapper(async ()=>{
        console.log('inner');
        await myFun2();
        console.log('outer');
    });

    //不能捕捉异常错误中，没有await的
    const onClick5 = wrapper(async ()=>{
        console.log('inner2');
        myFun2();
        console.log('outer2');
    });


    //故意没有进行wrapper的callback
    const onClick6 = ()=>{
        throw new Error("010");
    }
    return (
      <div>
        <button onClick={onClick}>点我</button>
        <button onClick={onClick2}>点我2</button>
        <button onClick={onClick3}>点我3</button>
        <button onClick={onClick4}>点我4</button>
        <button onClick={onClick5}>点我5</button>
        <button onClick={onClick6}>点我6</button>
      </div>
    );
  }

import 'zone.js';

let errorZone = Zone.current.fork({
  name:'errorZone',

  onHandleError:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, error: any) => {
      console.log('catch error');
    console.error(error);
    return false;
  }
});
export default function IndexPage() {
    //包装以后，可以正常使用，能直接调用得到返回值
    const myFun = errorZone.wrap(()=>{
        return '123';
    },'temp');

    const onClick = errorZone.wrap(async ()=>{
        console.log('dd', myFun());
    },'temp');

    //可以捕捉错误
    const onClick2 = errorZone.wrap(()=>{
        throw new Error("123");
    },'temp');

    
    const myFun2 = errorZone.wrap(()=>{
        throw new Error("456");
    },'temp');

    //可以捕捉异步的错误
    //FIXME 但是这里出现了错误，虽然内部抛出了错误，但是next依然执行了
    const onClick3 = errorZone.wrap(async ()=>{
        await myFun2();
        console.log('next!!!');
    },'temp');

    //可以捕捉异步，但没有await的错误
    const onClick4 = errorZone.wrap(async ()=>{
        console.log('pre');
        myFun2();
        console.log('outer');
    },'temp');


    return (
      <div>
        <button onClick={onClick}>点我</button>
        <button onClick={onClick2}>点我2</button>
        <button onClick={onClick3}>点我3</button>
        <button onClick={onClick4}>点我4</button>

      </div>
    );
  }
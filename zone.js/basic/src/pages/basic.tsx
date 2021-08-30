
import 'zone.js';


console.log(Zone.current);

let errorZone = Zone.current.fork({
  name:'errorZone',

  onHandleError:(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, error: any) => {
    console.log('catch error ',error);
    return false;
  }
});

//runGuarded才能捕捉错误
//可以捕捉直接的错误
errorZone.runGuarded(()=>{
  throw new Error("123");
});

const delay = (timeout:number)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,timeout);
    });
}

//可以捕捉异步错误
errorZone.runGuarded(async ()=>{
    await delay(10);
    throw new Error("456");
});

const myFun = async()=>{
    await delay(10);
    throw new Error("789");
}

//可以捕捉await异常里面的错误
errorZone.runGuarded(async()=>{
    console.log('inner');
    await myFun();
    console.log("outer");
    await myFun();
    console.log("outer2");
})

const myFun2 = async()=>{
    await delay(10);
    throw new Error("010");
}

//可以捕捉异步，但没有await的错误
errorZone.runGuarded(async()=>{
    console.log('inner2');
    myFun2();
    console.log("outer2");
})

export default ()=>{
    return (<div>{'123'}</div>);
}
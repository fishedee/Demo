
import 'zone.js';

//rootZone
console.log(Zone.current);

//在rootZone作为parent的情况下，创建normalZone
let normalZone = Zone.current.fork({
    name:'normalZone',
    properties:{
        fish:'123'
    }
});

//在normalZone作为parent的情况下，创建normalZone2
let normalZone2 = normalZone.fork({
    name:'normalZone',
    properties:{
        cat:'456'
    }
});



const delay = (timeout:number)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,timeout);
    });
}

async function go4_2(){
    await delay(10);
    //两个属性都能拿到，这是Zone链的意义
    console.log('go4 fish ',Zone.current.get('fish'));
    console.log('go4 cat ',Zone.current.get('cat'));
}

async function go4_1(){
    await delay(10);
    await go4_2();
}


const go4 = ()=>{
    //默认Zone就是root，值为undefined
    console.log('go4 outer',Zone.current.get('fish'));

    //通过normalZone.run来切换zone
    normalZone2.run(async ()=>{
        //有加await，能传递Zone
        await go4_1();
    });
}

go4();

export default ()=>{
    return <div>{'123'}</div>;
}
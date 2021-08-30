
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

const go = ()=>{
    //默认Zone就是root，值为undefined
    console.log('go outer',Zone.current.get('fish'));

    //通过normalZone.run来切换zone
    normalZone.run(()=>{
        //当前闭包就是在normalZone中，值为123
        console.log('go inner',Zone.current.get('fish'));

    });
}

go();

const go2 = ()=>{
    //默认Zone就是root，值为undefined
    console.log('go2 outer',Zone.current.get('fish'));

    //通过normalZone.run来切换zone
    normalZone.run(async ()=>{
        //当前闭包就是在normalZone中
        setTimeout(()=>{
            //即使跨过了setTimeout，在另外一个调用栈中
            //当前依然还是在normalZone，这就是Zone.js的关键
            //不论跨过多少层setTimeout，async/await，当前Zone竟然能自动传递过去
            console.log('go2 inner',Zone.current.get('fish'));
        },10);
    });
}

go2();



const delay = (timeout:number)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,timeout);
    });
}

async function go3_2(){
    await delay(10);
    console.log('go3 inner',Zone.current.get('fish'));
}

async function go3_1(){
    await delay(10);
    await go3_2();
}


const go3 = ()=>{
    //默认Zone就是root，值为undefined
    console.log('go3 outer',Zone.current.get('fish'));

    //通过normalZone.run来切换zone
    normalZone.run(async ()=>{
        //有加await，能传递Zone
        await go3_1();

        //没有加await，也能传递Zone，实在屌
        go3_1();
    });
}

go3();

export default ()=>{
    return <div>{'123'}</div>;
}
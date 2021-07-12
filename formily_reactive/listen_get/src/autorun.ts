import { autorun, observable } from "@formily/reactive"

//autorun是收集get依赖，然后重新运行，它总是马上执行一次
function testAutoRun1(){
    const obs = observable({
        aa:78
    })

    //autorun会执行两次
    //第一次是输出结果，并收集对字段进行get操作的依赖
    //第二次是当数据变化时，被set操作收集到，然后找出get操作的autorun方法，重新执行一遍，也会重新计算依赖
    const dispose = autorun(() => {
        console.log(obs.aa)
    })

    obs.aa = 123

    //释放autorun，不再自动执行了
    dispose()

    //这一句的set操作不再触发autorun了
    obs.aa = 789
}

function testAutoRun2(){
    const obs = observable({
        aa:1,
        bb:3
    })

    //算上首次触发，一共是3次触发，而不是4次触发
    autorun(()=>{
        if( obs.aa == 1 || obs.bb == 2){
            console.log('true');
        }else{
            console.log("false");
        }
    })

    //这一句不会触发
    //因为收集get操作的时候，只判断到了obs.aa==1就已经提前终止了
    //所以autorun的第一次收集，只记录了obs.aa的数据
    obs.bb = 4

    //这一句触发了autorun，因为判断不满足，所以会触发obs.bb的数据记录
    obs.aa = 2

    //这一句也触发autorun
    obs.bb = 2
}

export default function testAutoRun(){
    testAutoRun1()
    testAutoRun2()
}
function testTypeNarrow1(){
    //推导出来的是数组，(number|string)[]
    let a  = [1,"23"]
    console.log(a)
}

function testTypeNarrow2(){
    //推导出来的是元组，不过是readonly的。[number,string]
    let a  = [1,"23"] as const
    console.log(a)
}

//使用模板进行类型推导时，类型会尽可能收窄
//T用不定参数的方式传入
function tunple<T extends unknown[]>(...ts:T):T{
    return ts
}

function testTypeNarrow3(){
    //推导出来的是元组，不是readonly的，[number,string]
    let a  = tunple(1,"23")
    console.log(a)
}

export default function testTypeNarrow(){
    testTypeNarrow1()
    testTypeNarrow2()
    testTypeNarrow3()
}
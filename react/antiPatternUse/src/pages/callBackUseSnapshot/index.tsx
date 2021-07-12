import { useEffect } from 'react';
import { useState } from 'react';

//在任何的callback或者effect中，都不应该使用snapshot的数据，snapshot的数据只能用于渲染
//这不是一个bug，也不是一个设计问题
//因为callback里面的就不能依赖于之前的state来执行业务逻辑
//站在redux的角度，callback只能发送action，在action里面执行业务逻辑，最后由action触发store的变化，引起view的变化
export default function () {
    let [counter, setCounter] = useState(0);

    useEffect(function () {
        //我们期望每秒将计数器递增1，但实际是不行的
        //因为effect是在一个闭包，每次都会捕捉counter这个局部变量，而这个变量仅在组件初始化时捕捉了，初值为0，因此定时器每次都是设置为1
        let interval = setInterval(function () {
            setCounter(counter + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []); //组件挂载时只启动一次定时器，所以依赖是个空数组
    return (
        <div>
            <div>当前计数为：{counter}</div>
        </div>
    );
}

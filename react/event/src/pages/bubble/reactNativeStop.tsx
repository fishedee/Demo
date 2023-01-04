import React, { useEffect ,MouseEvent} from 'react';

const App:React.FC<any> = (props)=>{
    useEffect(()=>{
        const documentClick = ()=>{
            console.log('document click');
        }
        const divClick = ()=>{
            console.log('原生outClick');
        }
        document.addEventListener('click', documentClick);
        document.getElementById('div1')?.addEventListener('click',divClick);
        return ()=>{
            document.removeEventListener('click',documentClick);
            document.getElementById('div1')?.removeEventListener('click',divClick);
        }
    },[]);

    const outerClick = ()=>{
        console.log('outerClick');
    }

    const innerClick = (e:MouseEvent<HTMLDivElement>)=>{
        console.log('innerClick');
        //这个方法只能阻止合成事件，不能阻止原生事件
        e.stopPropagation();
        //这个方法能阻止原生事件，但只能阻止document上的原生事件，不能触发原始click
        e.nativeEvent.stopImmediatePropagation();
    }
    //http://www.qiutianaimeili.com/html/page/2020/04/2020426gbkc8mhwpfi.html
    /*
    因此我们点击inner的div的时候，输出是：
    原生outClick
    innerClick
    document click
    这个时候，少了outerClick这个合成事件的触发，以及少了document上的原生事件
    但是！！，不会少了div1上的原生事件触发，这是因为合成事件是在document上的原生事件上实现的。合成事件是div的原生事件冒泡上来后的产物，不可能在停止冒泡后，能回滚之前的事件输出	
    */
    return(
        <div id="div1" onClick={outerClick}>
            this is outer
            <div onClick={innerClick}>
                this is inner
            </div>
        </div>
    )
}

export default App;
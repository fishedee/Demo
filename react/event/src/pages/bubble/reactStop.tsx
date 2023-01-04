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
    }
    //http://www.qiutianaimeili.com/html/page/2020/04/2020426gbkc8mhwpfi.html
    /*
    因此我们点击inner的div的时候，输出是：
    原生outClick
    innerClick
    document click
    这个时候，少了outerClick这个合成事件的触发
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
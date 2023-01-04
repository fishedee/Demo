import React, { useEffect ,KeyboardEvent} from 'react';

const App:React.FC<any> = (props)=>{
    const onKeyDown = (e:KeyboardEvent<HTMLInputElement>)=>{
        console.log('e.key',e.key);
        console.log('e.code',e.code);

        //https://reactjs.org/docs/events.html#keyboard-events
        //https://www.w3.org/TR/uievents-key/#named-key-attribute-values
        if( e.key == 'Enter' ){
            console.log('Enter键或者Numpad Enter键按下了');
        }

        //https://blog.saeloun.com/2021/04/23/react-keyboard-event-code.html
        //https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
        if( e.code == 'Enter'){
            console.log('只有大键盘Enter键按下了');
        }
        if( e.code == 'NumpadEnter'){
            console.log('只有Numpad Enter键按下了');
        }

        //数字
        if( e.key == '3' ){
            console.log('3键或者Numpad 3键按下了');
        }
        if( e.code == 'Digit3' ){
            console.log('只有3键按下了');
        }
        if( e.code == 'Numpad3' ){
            console.log('只有Numpad3键按下了');
        }
    }
    return(
        <input style={{width:'300px',fontSize:'16px'}} onKeyDown={onKeyDown}/>
    )
}

export default App;
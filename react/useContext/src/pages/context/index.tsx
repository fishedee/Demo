import { createContext, useContext, useState, memo } from 'react';

const ModeContext = createContext({ mode: 'fish' });

let GrandSon = memo(function () {
    console.log('grand son render');
    let data = useContext(ModeContext);
    return (
        <div>
            <div>我是孙组件</div>
            <div>mode为:{data.mode}</div>
        </div>
    );
});
let Son = memo(function () {
    console.log('son render');
    return (
        <div>
            <div>我是子组件</div>
            <GrandSon />
        </div>
    );
});
export default function () {
    console.log('top render');
    let [mode, setMode] = useState('fish');
    return (
        <div>
            <h3>当前mode为:{mode}</h3>
            <button
                onClick={() => {
                    setMode((mode) => {
                        if (mode == 'fish') {
                            return 'cat';
                        } else {
                            return 'fish';
                        }
                    });
                }}
            >
                切换mode
            </button>
            <ModeContext.Provider value={{ mode: mode }}>
                <Son />
            </ModeContext.Provider>
        </div>
    );
}

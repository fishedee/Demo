import useDataRef from '@/useDataRef';
import React, { useEffect, useLayoutEffect } from 'react';

class Model {

    public constructor() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    public destoryEvent = () => {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    private onKeyDown = (e: KeyboardEvent) => {
        console.log('---- key down ---');
        console.log('key', e.key);
        console.log('hasCtrl', e.ctrlKey);
        console.log('hasAtl', e.altKey);
        console.log('e', e.target);//无input的情况下，来自于body
    }
}
const App: React.FC<any> = (props) => {
    const model = useDataRef(() => {
        return new Model();
    }).current;
    useLayoutEffect(() => {
        return () => {
            model.destoryEvent();
        }
    }, []);
    return (
        <div>{'Hello World'}</div>
    )
}

export default App;
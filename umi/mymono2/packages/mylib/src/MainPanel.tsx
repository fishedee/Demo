import React from 'react';
import {Button} from 'antd';

type MainPanelProps ={
    title:string;
}
const MainPanel:React.FC<MainPanelProps> = (props)=>{
    return (<div>
        <Button>{'点我8'}</Button>
    </div>);
}

export {
    MainPanelProps,
    MainPanel
}
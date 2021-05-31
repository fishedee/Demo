import React from 'react';
import style from './index.less';

export default class MyLabel extends React.Component{
    render(){
        let {value,render,...props} = this.props;
        if( render && value != undefined ){
            value = render(value);
        }
        return (<label className={style.root} {...props}>{value}</label>);
    }
}
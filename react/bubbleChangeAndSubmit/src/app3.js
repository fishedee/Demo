import React,{Fragment} from 'react';

class Container extends React.Component{
    constructor() {
        super();
    }
    componentDidMount() {
    }
    outerFragmentSubmit(e){
        console.log("outerFragmentSubmit");
    }
    outerDivSubmit(e){
        console.log("outerDivSubmit");
    }
    outerSubmit(e){
        console.log("outerSubmit");
    }
    innerSubmit(e){
        console.log("innerSubmit");
        //preventDefault是阻止form默认是刷新页面
        e.preventDefault();
    }
    render(){
        //内部的form触发onSubmit
        //外部的form也会触发onSubmit
        //外部的div也会触发onSubmit
        //Fragment只能带有key与children属性，所以不能加入onSubmit事件，否则会报错
        return(
            <Fragment>
                <div onSubmit={this.outerDivSubmit}>
                    <form onSubmit={this.outerSubmit}>
                        <form onSubmit={this.innerSubmit}>
                            <button type="submit">提交</button>
                        </form>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default class App extends React.Component{
    render(){
        return (<Container/>);
    }
}
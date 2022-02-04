import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

type ProtalRender<T> = (portal: MyPortal<T>) => ReactElement;

const MyPortalWrapper: React.FC<{ render: ProtalRender<any>; portal: MyPortal<any> }> = (
    props,
) => {
    const dom = props.render(props.portal);
    return <>{dom}</>;
};

class MyPortal<T = any> {
    private ref: HTMLElement | null = null;

    private resultNotify: ((data: T) => void) | null = null;

    constructor(private render: ProtalRender<T>) { }

    public open() {
        if (this.ref) {
            throw new Error('对话框已经打开了');
        }
        this.ref = document.createElement('div');
        document.body.appendChild(this.ref);

        const node = <MyPortalWrapper render={this.render} portal={this} />;

        ReactDOM.render(node, this.ref);
    }

    //仅仅调用了setResult的时候才会返回
    //如果portal没有触发setResult的话不会返回。
    public awaitOpen(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.open();
            this.resultNotify = resolve;
        });
    }

    public rerender() {
        if (!this.ref) {
            throw new Error('对话框未打开');
        }

        const node = <MyPortalWrapper render={this.render} portal={this} />;
        ReactDOM.render(node, this.ref);
    }

    public setResult(data: T) {
        if (this.resultNotify != null) {
            this.resultNotify(data);
            this.resultNotify = null;
        }
    }

    public close() {
        if (!this.ref) {
            throw new Error('对话框未打开');
        }
        ReactDOM.unmountComponentAtNode(this.ref);
        this.ref.parentElement?.removeChild(this.ref);
        this.ref = null;
    }
}

export default MyPortal;

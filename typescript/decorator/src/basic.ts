class Builder{
    private data:object | null = null;
    private method:'get'|'post'|null =  null;
    private url: string | null = null;

    public setMethod(method:'get' | 'post'):this{
        this.method = method;
        return this;
    }

    public setData(data:object):this{
        this.data = data;
        return this;
    }

    public setURL(url:string):this{
        this.url = url;
        return this;
    }

    public send(){
        console.log("send",this.method,this.url,this.data);
    }
}

type ClassConstructor<T> = new(...args:any[])=>T;

function decorator<T extends ClassConstructor<{}> >(Constructor:T){
    return class extends Constructor{
        go(){
            console.log("mm");
        }
    }
}

export default function go(){
    let builder = new Builder();
    builder.setData({a:3})
        .setMethod('get')
        .setURL("www.baidu.com")
        .send();

    let constructor = decorator(Builder);
    //注意newData的类型为decorator的匿名class&Builder
    let newData = new constructor();
    newData.go();

}
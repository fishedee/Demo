//需要两个类型，T类型为object，K类型必须来自于T类型的key
type Picker<T, K extends keyof T> = {
    //对于K类型的所有值，建立一个字段映射类型
	[key in K]: T[key]
}

//Picker<BuildableRequest,'method'>，相当于声明{'method':'get'|'post'}类型
//TS中的类型是结构类型，不是声明类型，只要类型中实现了这个接口结构，那么类型就可以实现了这个接口。
interface BuildableRequest {
    hasData: boolean
    hasMethod:boolean
    hasUrl: boolean
}

//例如一个Picker<BuildableRequest,'hasMethod'>&Picker<BuildableRequest,'hasData'>&Picker<BuildableRequest,'hasUrl'>，就代表它实现了这个BuildableRequest接口

class Builder{
    data?:object;
    method?:'get'|'post';
    url?: string;

    public setMethod(method:'get' | 'post'):this & Picker<BuildableRequest,'hasMethod'>{
        return Object.assign(this,{method:method,hasMethod:true});
    }

    public setData(data:object):this & Picker<BuildableRequest,'hasData'>{
        return Object.assign(this,{data:data,hasData:true});
    }

    public setURL(url:string):this & Picker<BuildableRequest,'hasUrl'>{
        return Object.assign(this,{url:url,hasUrl:true});
    }

    //重写this参数，this需要为Builder，同时也要满足BuildableRequest
    public send(this:BuildableRequest&Builder ){
        console.log("send",this.method,this.url,this.data);
        return this;
    }
}


export default function go(){
    let builder = new Builder();
    builder.setData({a:3})
        .setMethod('get')
        .setURL("baidu.com")
        .send();

    //缺少任意一个set，ts都会报错
    /*
    builder.setData({a:3})
        .setMethod('get')
        .setURL("baidu.com")
        .send();
    */
}
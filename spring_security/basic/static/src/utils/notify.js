import './push';
import request from '@/utils/request';

var pushServer = new Push("push.fishedee.com",16);
var subscriber = pushServer.createForeverSubscriber();

var hasTopicOn = {};
var topicCallBack = {};

var notify = {
    _interval:async()=>{
        var topics = [];
        for( var i in topicCallBack ){
            topics.push(i);
        }

        try{
            let data =  await request('/notify/getbatch',{
                method:'GET',
                query:{
                    topics:topics,
                },
                autoCheck:true,
            });
            for( var i in data ){
                var single = data[i];
                var callback = topicCallBack[single.topic];
                if( callback ){
                    callback(single.maxVersionId);
                }
            }
        }catch(e){
            //如果网络断开时，查询失败，则打印日志就可以了，不需要在页面报错
            console.log(e);
        }  
    },
    on:(topic,callback)=>{
        if( !hasTopicOn[topic] ){
            //服务器注册topic
            subscriber.onTopic(topic,(message)=>{
                var callback = topicCallBack[topic];
                if( callback ){
                    callback(message);
                }
            });
            hasTopicOn[topic] = true;
        }

        //本地注册回调
        topicCallBack[topic] = callback;
    },
    off:(topic)=>{

        //本地取消回调
        delete topicCallBack[topic];
    }
}

//每5秒绕过推送来更新数据，作为推送服务器崩溃的后备
setInterval(notify._interval,5*1000);

export default notify;
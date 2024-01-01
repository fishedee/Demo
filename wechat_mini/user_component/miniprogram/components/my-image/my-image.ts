// components/my-image/my-image.ts
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        img:{
            type:String,
            value:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
        },
        header:{
            type:String,
            value:'',
        },
        description:{
            type:String,
            value:'',
        }
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onBodyTap:function(){
            console.log("my-image tap body");
            var myEventDetail = {
                hello:1,
            } // detail对象，提供给事件监听函数
            this.triggerEvent('myevent',myEventDetail,{
                bubbles:undefined,//事件是否冒泡
                composed:undefined,//事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部,
                capturePhase:undefined,//事件是否拥有捕获阶段
            })
        }
    }
})
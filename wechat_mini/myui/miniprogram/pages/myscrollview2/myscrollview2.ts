const app = getApp<IAppOption>();

let globalId:number = 10001;

type ItemData = {
    id:string;
    content:string;
}
Page({  
    data: {  
      list: [] as ItemData[], // 数据列表  
      triggered: false,
      windowHeight:app.globalData.systemInfo!.windowHeight,
    },  
    onLoad: function() {  
      this.loadData(); // 初始加载数据  
    },  
    // 下拉刷新事件处理函数  
    onScrollRefresh: function() { 
        this.loadData(true);
    },  
    // 滑动到底部事件处理函数  
    onScrollToEnd: function() { 
        console.log('scroll to end');
        this.loadData(false);
    },  
    // 加载数据函数（模拟）  
    loadData: function(isRefresh = false) {  
      let that = this;  
      setTimeout(function() {  
        let newData = []; 
        for (let i = 0; i < 1000; i++) {  
            const single:ItemData = {
                id:(globalId++)+'',
                content: `Item ${Math.random()}` 
            }
            newData.push(single); 
        }  
        if (isRefresh) { // 如果是下拉刷新，则替换旧数据  
            that.setData({ 
                list: newData,
                triggered:false,
            });  
        } else {
            that.setData({ 
              list: that.data.list.concat(newData)
            }); 
        }  
      }, 1000);  
    }, 
    loadMoreData: function() {  
      this.loadData(); 
    }
});
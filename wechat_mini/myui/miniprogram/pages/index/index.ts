// pages/index/index.ts
Page({

	data: {

	},

	onMyScrollView(){
		wx.navigateTo({
			url:'/pages/myscrollview/myscrollview',
		})
    },
    
    onMyScrollView2(){
		wx.navigateTo({
			url:'/pages/myscrollview2/myscrollview2',
		})
	},
})
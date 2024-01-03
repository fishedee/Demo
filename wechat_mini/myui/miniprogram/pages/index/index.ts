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

	onMySwiper(){
		wx.navigateTo({
			url:'/pages/myswiper/myswiper',
		})
	},
})
// pages/index/index.ts
Page({

	data: {

	},

	//Page页面不需要methods参数，直接写上面就可以了
	onNetworkTap(){
		wx.navigateTo({
			url:'/pages/network/network',
		})
	},

	onImageTap(){
		wx.navigateTo({
			url:'/pages/timage/timage',
		})
	},

	onPersistTap(){
		wx.navigateTo({
			url:'/pages/tpersist/tpersist'
		})
	}
})
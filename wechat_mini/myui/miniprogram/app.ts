// app.ts
App<IAppOption>({
  	globalData: {
	},
  	onLaunch() {
		const self = this;
		wx.getSystemInfo({
			success(res) {
				self.globalData.systemInfo = res;
			}
		});
  	},
})
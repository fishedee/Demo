// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
	data: {
		content:'内容1',
	},
	methods: {
	onRequestGet(){
		const top = this;
		wx.request({
			method:'GET',
			url:'http://httpbin.org/anything',
			data:{
				x:3,
				y:4,
			},
			dataType:'其他',
			success(res){
				console.log('statusCode',res.statusCode);
				top.setData({
					content:res.data+'',
				});
			}
		});
	},
	onRequestPostForm(){
		const top = this;
		wx.request({
			method:'POST',
			url:'http://httpbin.org/anything',
			data:{
				x:3,
				y:4,
			},
			header:{
				'content-type':'application/x-www-form-urlencoded',
			},
			dataType:'其他',
			success(res){
				console.log('statusCode',res.statusCode);
				top.setData({
					content:res.data+'',
				});
			}
		});
	},
	onRequestPostJson(){
		const top = this;
		wx.request({
			method:'POST',
			url:'http://httpbin.org/anything',
			data:{
				x:3,
				y:4,
			},
			header:{
				'content-type':'applicationjson',
			},
			dataType:'其他',
			success(res){
				console.log('statusCode',res.statusCode);
				top.setData({
					content:res.data+'',
				});
			}
		});
	},
	onRequestHostError(){
		wx.request({
			method:'POST',
			url:'https://error_cc/',
			data:{
				x:3,
				y:4,
			},
			header:{
				'content-type':'applicationjson',
			},
			dataType:'其他',
			success(res){
				console.log('success res',res);
			},
			fail(res){
				//fail报错，res为对象{errMsg: "request:fail "}
				console.log('fail res',res);
			}
		});
	},
	onRequestPathError(){
		wx.request({
			method:'POST',
			url:'https://httpbin.org/ccc',
			data:{
				x:3,
				y:4,
			},
			header:{
				'content-type':'applicationjson',
			},
			dataType:'其他',
			success(res){
				//success报错，rs.statusCode为404
				console.log('success res',res);
			},
			fail(res){
				console.log('fail res',res);
			}
		});
	},
	onDownloadFile(){
		const top = this;
		//下载文件
		wx.downloadFile({
			url: 'https://httpbin.org/image/jpeg', 
			success (res) {
				if (res.statusCode === 200) {
					var base64 = 'data:image/jpeg;base64,'+wx.getFileSystemManager().readFileSync(res.tempFilePath, "base64");
					top.setData({
						image:base64,
					});
				}
			}
		})
	},
	onUploadFile(){
		const top = this;
		console.log('start upload image');
		wx.chooseMedia({
			count:1,
			mediaType:['image'],
			success (res) {
			  const tempFilePaths = res.tempFiles;
			top.setData({
				image:tempFilePaths[0].tempFilePath,
			});
			  wx.uploadFile({
				url: 'https://httpbin.org/anything',
				filePath: tempFilePaths[0].tempFilePath,
				name: 'file',
				formData: {
				  'user': 'test'
				},
				success (res){
					console.log('res',res);
					top.setData({
						content:'upload success'
					});
				}
			  })
			}
		  })
	}
},
})

// pages/myswiper/myswiper.ts
Component({

	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		current:0,//当前所在滑块的 index
		indicatorDots:true,//是否显示面板指示点
		indicatorType:'worm',//指示点动画类型
		circular:true,//是否采用衔接滑动
		list: [
			'https://i1.hdslb.com/bfs/archive/cba282edcc41b3a018f1651130907c2f93e17c5b.jpg',
			'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0d6be749-99be-447e-a8be-b71116b532e4%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706756478&t=4ca3fed137241dc66333378926ffc859',
			'https://img1.baidu.com/it/u=1279840328,315377675&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
		]
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onChange(e:any){
			this.setData({
				current: e.detail.current
			})
		},
		onTransition(e:any) {
			console.info('@@@ onTransition ', e.detail)
		},
		onAnimationfinish(e:any) {
			console.info('@@@ onAnimationfinish ', e.detail)
		},
	}
})
# 1 概述

ant-admin 是使用react+ant design+redva的一套后端管理系统开发框架，这是它的设计概念

# 2 目标

简单快速易懂的后端管理系统开发框架

# 3 原则

* 简单，符合react直观的开发概念，尽量减少高阶组件的使用
* 组合，列表与条目应该能够随意组合，而不是列表中写死了条目的类型。
* 快速，每个页面尽量能在一个js内就能完成

# 4 功能设计

## 4.1 单标签页

后台管理系统采用单标签页，而不是传统的多标签页。为什么？

* 多标签页的优势在于，能够在保持当前编辑状态下打开其他的新页面，并且在误删档前标签页后也能恢复数据。例如，我在操作一个订单，但是中途我想在用户中心操作，在多标签页直接新建一个页面就可以了。单标签页就会丢失订单中心中当前编辑信息。劣势在于，对于多个标签页共享的数据，难以简单的同步和一致，需要用户手动控制。例如，商品中心的标签已经变化了，但是当前编辑的订单中心可能还保持着原来的信息，需要手动刷新才能让当前标签获取商品中心的信息。
* 单标签页的优势在于，不需要考虑多标签页的信息同步的问题，每次打开的页面肯定都是数据及时的。劣势在于，中途编辑的状态需要程序员同步到服务器，这样下次打开时才能恢复。

多标签页需要手动刷新才能同步，但手动刷新本身又会丢失当前的编辑状态。所以，多标签页的优势并不十分突出。另外，在推进式的编辑时，多标签页不断打开新标签，对用户来说页面之间的逻辑比较混乱。因此，选择的是单标签设计，而不是多标签，唯一麻烦的是，需要保存中途编辑状态时需要手动同步到服务器。

## 4.2 详情编辑是页面

对于详情编辑，是页面，而不是对话框形式。为什么？

* 对话框的优势在于，明确的取消编辑按钮，并且不打断现有的列表搜索状态。劣势在于，可编辑的范围实在太小了，对于很多数据的详情编辑，对话框可以容纳的信息太少。
* 页面的优势在于，可编辑的范围比较大，劣势在于，需要建立首部的导航栏来隐式取消。

鉴于大部分的场景下，打断现有的列表搜素状态其实问题也不太大，但是，可编辑范围比较小这个问题就比较严重了，所以该用页面方式的详情编辑。另外，保存编辑状态可以用静态的state来实现。

## 4.3 总结

总的来说，功能设计为：

* 全局单标签页
* 列表页面，使用本地state来做状态保存
* 详情页面，使用页面方式展示，未保存到服务器的信息可以用本地state来暂时保存，已经保存到服务器的信息则不需要做状态保存
* 列表选择页面，使用Modal方式来展示。

# 5 编码约定

## 5.1 输入组件

所有的输入组件，都必须包含有value和onChange两个字段，以让父组件能实现value的实时计算和校验。

输入组件，包括基础输入组件，input，inputNumber，和容器输入组件form，table等等。

## 5.2 模态对话框

```
class FormModal extends React.PureComponent{
	onModalOk(onOk){
		//doSomething you want
		onOk(xxxx);
	}
	render(){
		.....
	}
}
class Page extends React.PureComponent{
	render(){
		return (
			<StandardModal
				visible={this.state.visible}
				onOk={this.onOk}
				onCancel={this.onCancel}>
				<FormModal/>
			</StandardModal>
		);
	}
}
```

模态对话框的内容用一个Component来实现就可以了，与普通Component不同的是，它需要多一个onModalOk的回调函数就可以了

## 5.3 跳转处理

```
this.props.history.push({
	pathname:'xxx',
	search:qs.stringify({
		a:123,
		b:456
	})
});
```

跳转前，将参数推入到history的search里面，要注意用qs进行转换。

```
var query = qs.parse(this.props.location.search.substr(1));
```

跳转后，在location的search里面取出参数，要注意用qs进行转换。

## 5.4 错误处理

```
app.router(({history,app})=>{
	const onError = (e)=>{
		console.error(e);
		Modal.error({
			title: '错误',
			content: e.message,
		});
	}
	const router = getRouter(app);
	return (
	<ErrorCatch onError={onError}>
		<LocaleProvider locale={zhCN}>
			<Router history={history}>
				{router}
			</Router>
		</LocaleProvider>
	</ErrorCatch>);
});
```

在app的入口已经做了全局的错误处理，注意，只捕捉在async区域内的错误，一旦错误发生并且未捕捉时，就会触发onError回调，所以，在编写代码时仅需要考虑正常流程就可以了。

```
componentDidMount = async ()=>{
	let types = await this.props.dispatch({type:'/type/getAll'});
	let cards = await this.props.dispatch({type:'/card/get'});
	//....
}
```

为什么不直接用redva的onError，因为redva的onError仅捕捉model层的错误，在组件内我们可能会有以上的代码，需要串联多个action的结果，任意一个出错时都需要打断全部流程。所以，我们需要的是一个全局的错误处理。

## 5.5 模型设计

```
export default {
	namespace:'card',
	state:null,
	actions:{
		search({payload}){
			return request('/card/search',{
				method:'GET',
				query:payload
			});
		},
		get({payload}){
			return request('/card/get',{
				method:'GET',
				query:{
					cardId:payload.cardId
				}
			});
		},
		add({payload}){
			return request('/card/add',{
				method:'POST',
				body:payload,
			});
		}
	}
}
```
在这里，我们将模型设计为最轻量的方式，也就是将redva仅仅作为request薄薄的封装层。

```
export default {
	namespace:'card',
	state:{
		list:[],
		where:{},
		limit:{},
		allData:{},
	}
	mutations:{
		setList(state,{payload}){
			state.card.list = payload.list;
		},
		setWhere(state,{payload}){
			state.card.where = payload.where;
		},
		setLimit(state,{payload}){
			state.card.limit = payload.limit;
		},
		setAllData(state,{payload}){
			state.card.allData[payload.carddId] = payload;
		}
	}
	actions:{
		async search({payload},{getState,dispatch}){
			let data = await request('/card/search',{
				method:'GET',
				query:payload
			});
			let state = getState();
			await dispatch({
				type:'setList'
				payload:{list:data.data}
			})
			await dispatch({
				type:'setLimit',
				payload:{limit:{
					...state.card.limit,
					count:data.count,
				}}
			});
		},
		async get({payload}){
			let data = await request('/card/get',{
				method:'GET',
				query:{
					cardId:payload.cardId
				}
			});
			await dispatch{
				type:'setAllData',
				payload:data.data
			});
		},
		add({payload}){
			request('/card/add',{
				method:'POST',
				body:payload,
			});
		}
	}
}
```

为什么我们不使用上面这种方式，将where,limit都放到model里面呢。上面这种方式的好处是：

* 有缓存，二次进入该页面时会有缓存，显示上次拉取过的数据。

缺点是：

* 繁琐，原来setWhere,setLimit在component中已经干过一次了，在这里又要干一次，繁琐。并且，重要的是，redva的主要作用是协调多个组件共用的数据，但是在后台系统，这个需求并不是特别明显，强硬使用redva收益不多，成本却太大。
* 不是智能缓存，上述的缓存方式还是相当粗糙的，没有作扁平化处理。所以，当mod数据以后，都需要重新拉数据，列表页的相应条目才会更新。但是，如果要做到完全的扁平化，就需要引入对象提取扁平化处理，以及拉数据时的组合处理，那就更加繁琐了。

在开发后端框架中，我们不太希望因为缓存的原因，而增加代码的复杂性和降低开发效率，这是不必要的，所以斟酌之下，仅将model作为request的薄薄的封装层，一般情况下不放入state数据。

## 5.6 不使用纯渲染

```
export default class Comp extends React.Component{
	state = {
		data:[]
	};
	onClick = ()=>{
		this.state.data.push('123');
		this.setState({});
	}
	render = ()=>{
		return (
			<div>
				{this.state.data.map((item,key)=>{
					return (<li key={key}>{item}</li>);
				})}
			</div>
		);
	}
}
```

总的来说，我们都是使用Component，并且直接修改state来实现渲染。使用PureComponent加上immutable或immer的想法，能大幅提高react的运行效率。但是，这样做需要仔细地控制好Component的属性，避免高阶组件造成的不可渲染的问题。另外，由于我们简化了model的功能，要在Component上使用Pure的话，就只能用immutable，这也提高了繁琐的地方。

所以，兼顾开发的效率，我们避免使用纯渲染，一律使用普通渲染方式.

## 5.7 时间和日期的处理

时间和日期的输入组件和数据处理都统一使用'2018-07-05 23:59:59'的字符串方式，而不是moment方式。为什么？虽然moment的功能很强大，但是在前后端的通信时的json序列化和反序列化都很麻烦，当moment序列化为json时，我们可以用moment.protoype来统一将moment转换为固定的字符串格式，但是反序列化时呢？由于js中缺乏反序列化时的对象信息，所以后台返回的所有日期都转换为string格式，然后由程序员手动转换为moment才能被展示组件识别和显示出来，这未免也太麻烦了。所以，我们采用字符串的方式，使用自己的MyDatePicker和MyTimePicker来输入时间和日期，这样只需要像字符串一样处理日期和时间就可以了，序列化和反序列化时简单，数据处理也容易。

## 5.8 本地状态保存

```
static state = {
	list:[],
	where:{},
	limit:{
		pageIndex:0,
		pageSize:10,
		count:0,
	}
};
constructor(props){
	super(props);
	this.state = Table.state;
}
componentWillUnmount = ()=>{
	Table.state = this.state;
}
```

将state放入到静态属性，启动后恢复静态属性到state，关闭时将state保存到静态属性即可。这种办法要求可保存的状态到放在顶层的component上，子component的state仍然是丢失的。

# 6 总结

无

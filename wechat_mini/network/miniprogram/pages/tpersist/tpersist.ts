// pages/tcache.ts
type TodoData = {
	id:string;
	isEdit:boolean;
	text:string;
	editText:string;
}
let globalId = 10001;
const myapp = getApp<IAppOption>()

const initData:TodoData[] = [];
for( let i = 0 ;i != 10;i++){
	initData.push({
		id:(globalId++)+'',
		isEdit:false,
		text:`task_${i+1}`,
		editText:'',
	});
}

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
		todos:initData,
		windowHeight:myapp.globalData.systemInfo!.windowHeight,
		triggered:false as boolean,
	},

	lifetimes:{
		attached(){
			this.readData();
		}
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		refresh(){
			this.setData({
				todos:this.data.todos,
			});
		},
		saveData(){
			const value = JSON.stringify(this.data.todos);
			//异步方法，这里不需要等待
			wx.setStorage({
				key:'todos',
				data:value,
			});
		},
		async readData(){
			try{
				let data = await wx.getStorage({
					key:'todos'
				});
				this.data.todos = JSON.parse(data.data);
				this.refresh();
			}catch(e){
				console.error('cache is empty',e);
			}
		},
		findToDo(id:string):TodoData|undefined{
			const targetIndex = this.data.todos.findIndex(single=>{
				return single.id == id;
			})
			if( targetIndex != -1 ){
				return this.data.todos[targetIndex];
			}
			return undefined;
		},
		onStartEdit(event:any){
			console.log('startEdit',event);
			const todo = this.findToDo(event.currentTarget.id);
			if( todo){
				todo.isEdit = true;
				todo.editText = todo.text;
			}
			this.refresh();
		},
		onConfirmEdit(event:any){
			const todo = this.findToDo(event.currentTarget.id);
			if( todo){
				todo.isEdit = false;
				todo.text = event.detail.value;
			}
			this.refresh();
			this.saveData();
		},
		onCancelEdit(event:any){
			const todo = this.findToDo(event.currentTarget.id);
			if( todo){
				todo.isEdit = false;
			}
			this.refresh();
		},
		onDel(event:any){
			const newTodos = this.data.todos.filter(single=>{
				return single.id != event.currentTarget.id;
			})
			this.data.todos = newTodos;
			this.refresh();
			this.saveData();
		},
		onAdd(){
			const todo:TodoData = {
				id:(globalId++)+'',
				isEdit:false,
				text:'',
				editText:'',
			}
			this.data.todos.push(todo);
			this.refresh();
			this.saveData();
		}
	}
})
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
for( let i = 0 ;i != 100;i++){
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

	/**
	 * 组件的方法列表
	 */
	methods: {
		refresh(){
			this.setData({
				todos:this.data.todos,
			});
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
		onPullDownRefresh(e){
			console.log('start pulldown',e);
			this.setData({
				todos:[],
			});
			setTimeout(()=>{
				console.log('finish pulldown');
				this.setData({
					triggered:false,
					todos:initData,
				});
			},1000);
		},
		onConfirmEdit(event:any){
			const todo = this.findToDo(event.currentTarget.id);
			if( todo){
				todo.isEdit = false;
				todo.text = event.detail.value;
			}
			this.refresh();
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
		}
	}
})
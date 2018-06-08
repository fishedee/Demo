<template>
	<div>
		<div>总共点击次数为：{{ this.allClick }}</div>
		<div v-for="counter,index in counters" v-bind:key="counter.id">
			<counter v-bind:title="counter.title" v-on:click="addAllClick" v-on:change="change(index,$event)"/>
			<span>{{counter.num}}</span>
		</div>
		<alert>Something bad is happend</alert>
		<div>
			<button v-for="tab in tabs" v-bind:key="tab" v-on:click="onTabClick(tab,$event)"  v-bind:class="['tab-button', { active: currentTab === tab }]">{{tab}}</button>
			<keep-alive>
				<component v-bind:is="currentTabComponent">
					Something bad!
				</component>
			</keep-alive>
		</div>
	</div>
</template>

<script>
import counter from './counter.vue'
import alert from './alert.vue'
import vue from 'vue'
vue.component('counter', counter)
export default {
	data(){
		return {
			allClick:0,
			counters: [
		      { id: 1, title: 'My journey with Vue' ,num:0},
		      { id: 2, title: 'Blogging with Vue' ,num:0},
		      { id: 3, title: 'Why Vue is so fun' ,num:0},
		    ],
		    currentTabComponent:'counter',
		    currentTab:counter,
		    tabs:['counter','alert']
		}
	},
	methods:{
		addAllClick(){
			this.allClick ++
		},
		change(index,num){
			this.counters[index].num = num
		},
		onTabClick(tab){
			this.currentTab = tab
			this.currentTabComponent = tab
		}
	},
	components:{
		alert
	}
}
</script>

<style>
.tab-button{
	padding: 6px 10px;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	border: 1px solid #ccc;
	cursor: pointer;
	background: #f0f0f0;
	margin-bottom: -1px;
	margin-right: -1px;
}
.tab-button.active {
 	background: #e0e0e0;
}
</style>
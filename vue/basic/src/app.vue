<template>
	<div>
		<div class="message">{{ msg }}</div>
		<button v-on:click="go">点我</button>
	</div>
</template>

<script>
const delay = (timeout)=>{
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,timeout);
	});
}

export default {
	data () {
		return {
			msg: 'Hello World!'
		}
	},
	methods:{
		async go(){
			await delay(1000);
			this.msg = 'Hello Vue!';
		}
	}
}
</script>

<style>
.message {
 color: blue;
}
button{
	padding:10px;
	font-size:16px;
}
</style>
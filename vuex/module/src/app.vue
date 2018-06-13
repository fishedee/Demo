<template>
	<div>
		<div class="message">计数器：{{ count }}</div>
		<button v-on:click="inc">+1</button>
		<button v-on:click="dec">-1</button>
		<input type="text" v-model="text" v-on:keyup.13="onInput" placeholder="请输入想要添加的数字" />
		<div>点击次数：{{ clickCount }}</div>
	</div>
</template>

<script>


export default {
	data(){
		return {
			text:0,
		}
	},
	computed:{
		count () {
	      return this.$store.state.counter.count
	    },
	    clickCount(){
	    	return this.$store.state.click.count
	    }
	},
	methods:{
		inc(){
			this.$store.commit('counter/increment')
			this.$store.commit('click/increment')
		},
		dec(){
			this.$store.commit('counter/decrement')
			this.$store.commit('click/increment')
		},
		onInput(){
			this.$store.dispatch('counter/asyncInc',{
				amount:parseInt(this.text)
			})
			this.$store.commit('click/increment')
		}
	}
}
</script>

<style>
button{
	padding:5px 10px;
}
</style>
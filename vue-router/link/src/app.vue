<template>
	<div>
		<h1>Hello App!</h1>
 	 	<p>	
 	 		<p>template link</p>
			<div v-for="link in links"><router-link v-bind:to="link">Go to {{link}}</router-link></div>
    	</p>
    	<p>
    		<p>js link</p>
    		<div v-for="link in links2"><a v-on:click="link.click">{{ link.name }}</a></div>
    	</p>
    	<router-view></router-view>
	</div>
</template>

<script>
export default {
	data(){
		return {
			links:[
				'/123',
				'/456',
				'/789',
			],
			links2:[
				{
					name:'go /123',
					click:()=>{
						this.$router.push('/123')
					}
				},
				{
					name:'go /456',
					click:()=>{
						this.$router.push('/456')
					}
				},
				{
					name:'replace /123',
					click:()=>{
						this.$router.replace('/123')
					}
				},
				{
					name:'replace /456',
					click:()=>{
						this.$router.replace('/456')
					}
				},
				{
					name:'back',
					click:()=>{
						this.$router.go(-1)
					}
				}
			]
		}
	}
}
</script>

<style>
</style>
<template>
	<div>
		<h1>Hello Vue Router!</h1>
 	 	<p>	
			<div v-for="link in links"><router-link v-bind:to="link">Go to {{link}}</router-link></div>
    	</p>
    	<router-view></router-view>
	</div>
</template>

<script>
export default {
	data(){
		return {
			links:[
				'/login',
				'/user/123',
				'/',
				'/friend',
				'/timeline',
				'/time',
				'/404'
			]
		}
	}
}
</script>

<style>
</style>
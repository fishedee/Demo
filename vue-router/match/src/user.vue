<template>
	<div>
		<div>This is User Page</div>
		<div>userId is {{ userId }}</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			userId:this.$route.params.userId
		}
	}
}
</script>

<style>
</style>
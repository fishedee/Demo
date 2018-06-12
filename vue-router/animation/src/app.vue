<template>
	<div>
		<h1>Hello App!</h1>
 	 	<p>	
			<router-link to="/foo">Go to Foo</router-link>
	    	<router-link to="/bar">Go to Bar</router-link>
    	</p>
    	<transition name="slide">
	    	<router-view></router-view>
	    </transition>
	</div>
</template>

<script>
export default {}
</script>

<style>
.slide-enter-active{
	transition: 1s;
} 
.slide-leave-active {
  	transition: 1s;
}
.slide-enter{
	position: absolute;
	transform:translateX(-100%)
}
.slide-enter-to{
	position: absolute;
	transform: translateX(0)
}
.slide-leave{
	position: absolute;
	transform: translateX(0)
}
.slide-leave-to{
	position: absolute;
	transform:translateX(100%)
}
</style>
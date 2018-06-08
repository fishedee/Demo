<template>
	<div class="alert-box">
		<strong>Error!</strong><slot/>
	</div>
</template>

<script>
export default {}
</script>

<style>
.alert-box{
	padding: 10px 20px;
	background: #f3beb8;
	border: 1px solid #f09898;
}
.alert-box strong{
	font-weight:600;
}
</style>
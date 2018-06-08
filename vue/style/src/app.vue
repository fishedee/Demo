<template>
	<div>
		<!--class-->
		<div v-bind:class="class1">MM1</div>
	    <div v-bind:class="[class2,class3]">MM2</div>
	    <div v-bind:class="{class4:isClass4Active,class5:isClass5Active}">MM3</div>
	    <div v-bind:class="class6">MM4</div>
	    <!--style-->
	    <div v-bind:style="style1">Hello Fish1</div>
    	<div v-bind:style="[style2,style3]">Hello Fish1</div>
   		<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">Hello Fish2</div>
	</div>
</template>

<script>
export default {
	data () {
        return {
            class1: 'class1Name',
            class2: 'class2Name',
            class3: 'class3Name',
            isClass4Active:true,
            isClass5Active:false,
            style1:{
                color:'red',
                fontSize:'10px',
            },
            style2:{
                color:'blue',
            },
            style3:{
                fontSize:'30px',
            },
            activeColor: 'yellow',
            fontSize: '20',
        }
    },
    computed: {
        class6:function(){
            return {
                active: false,
                'text-danger': true
            };
        }
    }
}
</script>

<style>
.message {
 color: blue;
}
.class1Name{
	color:red;
}
.class2Name{
	font-size:24px;
}
.class3Name{
	color:blue;
}
.class4{
	color:red;
}
.class5{
	color:yellow;
}
.text-danger{
	text-decoration: underline;
}
</style>
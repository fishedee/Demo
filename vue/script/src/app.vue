<template>
	<div>
		<div>{{ number }}</div>
    	<button v-on:click="add">增加</button>
    	<button v-on:click="number -= 1">减少</button>
    	<button v-on:click="inc(2,$event)">增加2</button>
    	<button v-on:click="inc(-2,$event)">增加2</button>
    	<div>
	    	<input v-model="firstName"/>
	    	<input v-model.lazy="lastName"/>
	    	<div>{{ fullName }}<span>长度：{{ fullNameLength}}</span></div>
	    	<div>{{ showName }}</div>
	    </div>
	</div>
</template>

<script>
export default {
    data () {
        return {
            number:1,
            firstName: 'Foo',
            lastName: 'Bar',
            fullName: 'Foo Bar'
        }
    },
    watch: {
        firstName: function (val) {
          this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
          this.fullName = this.firstName + ' ' + val
        }
    },
    computed: {
        showName: function () {
            return '全名是：'+this.firstName + ' ' + this.lastName;
        },
        fullNameLength:function(){
        	return this.fullName.length
        }
    },
    methods: {
        add: function () {
          this.inc(1)
        },
        inc: function(data){
        	this.number += data
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
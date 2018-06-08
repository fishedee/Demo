<template>
	<div>
		<!--(v-text)-->
	    <div class="message">{{ msg }}</div>
	    <!--(v-html)-->
	    <div v-html="rawHtml"></div>
	    <!--(v-bind)-->
	    <div v-bind:id="dynamicId">动态属性</div>
	     <!--(v-on)-->
	    <button v-on:click="doSomething">点我</button>

	    <!--(v-show)-->
	    <h1 v-show="show">Hello!</h1>
	    <!--(v-if)-->
	    <div v-if="type === 0">
	      0
	    </div>
	    <div v-else-if="type === 1">
	      1
	    </div>
	    <div v-else-if="type === 2">
	      2
	    </div>
	    <div v-else>
	      Not 0/1/2
	    </div>
	     <!--(v-for)-->
	    <ul id="example-2">
	      <li v-for="(item, index) in items" :key="item.id">
	        {{ index }} - {{ item.message }}
	      </li>
	    </ul>
	    <!--表达式-->
	    <div>{{ number + 1 }}</div>
	    <div>{{ ok ? 'YES' : 'NO' }}</div>
	    <div>{{ msg.split('').reverse().join('') }}</div>
	    <!--过滤器-->
	    <div>{{ msg | capitalize }}</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			msg: 'Hello World!',
			rawHtml:'<h1>I am Vue</h1>',
			dynamicId:'fishId10001',
			show:Math.round(Math.random()*2)==1,
			type:Math.round(Math.random()*4),
			items:[
				{ message: 'Foo' ,id:'10001'},
              	{ message: 'Bar' ,id:'10002'}
			],
			number:12,
			ok:Math.round(Math.random()*2)==1,

		}
	},
	methods:{
		async doSomething(){
			this.show = !this.show
		}
	},
	filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
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
<template>
    <div>
        <h1>{{title}}</h1>
        <button v-on:click="add">You clicked me {{ count }} times.</button>
    </div>
</template>

<script>
export default {
    props: ['title'],
    data () {
        return {
            count:0,
        }
    },
    methods: {
        add: function () {
          this.count++
          this.$emit('click')
          this.$emit('change',this.count)
        }
    }
}
</script>

<style>
</style>
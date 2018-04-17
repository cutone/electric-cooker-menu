<template>
    <mt-header title="mes">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
</template>
<script>
    export default {
        data(){
            return {
                mes: 'aaa'
            }
        },
        methods: {
            // goToAddress: function(path){
            //     this.$router.push(path);
            // }
        }
    }
</script>
<style>
    
</style>


<template>
  <mt-tabbar fixed>
    <a class="mint-tab-item" @click="goToAddress('menulist')" v-bind:class="selected=='menulist'?'ecm-tab-bar-active':''">
        <div class="mint-tab-item-icon"><i class="fa fa-list"></i></div> 
        <div class="mint-tab-item-label">
        发现
        </div>
    </a>
    <!-- <a class="mint-tab-item" @click="goToAddress('collection')" v-bind:class="selected=='collection'?'ecm-tab-bar-active':''">
        <div class="mint-tab-item-icon"><i class="fa fa-star-o"></i></div> 
        <div class="mint-tab-item-label">
        收藏
        </div>
    </a> -->
    <a class="mint-tab-item" @click="goToAddress('upload')" v-bind:class="selected=='upload'?'ecm-tab-bar-active':''">
        <div class="mint-tab-item-icon"><i class="fa fa-upload"></i></div> 
        <div class="mint-tab-item-label">
        上传
        </div>
    </a>
    <a class="mint-tab-item" @click="goToAddress('mine')" v-bind:class="selected=='mine'?'ecm-tab-bar-active':''">
        <div class="mint-tab-item-icon"><i class="fa fa-user-o"></i></div> 
        <div class="mint-tab-item-label">
        我的
        </div>
    </a>
  </mt-tabbar>
</template>
<style>
    .ecm-tab-bar-active{
        background-color: #eaeaea;
        color: #26a2ff;
    }
</style>
<script>
    export default {
        data(){
            return {
                
            }
        },
        mounted(){
            this.checkoutLogin();
        },
        computed: {
            selected(){
                return this.$store.state.selectTab
            }
        },
        methods: {
            goToAddress: function(path){
                this.$store.commit('updateSelectTab',path);
                if(path == 'upload'){
                    this.$router.push('/'+path+'?type=upload');
                    return;
                }else if(path == 'collection'){
                    this.$router.push('/'+path+'?type=collection');
                    return;
                }
                this.$router.push('/'+path);
            },
            checkoutLogin(){
                axios.post('/users/checkoutLogin').then((res)=>{
                    var res = res.data;
                    if(res.status == '0'){
                        this.$router.push('/signIn');
                    }
                })
            }
        }
    }
</script>
<style>
    
</style>
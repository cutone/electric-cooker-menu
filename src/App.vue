<template>
  <div id="app">
    <!-- <headerBar></headerBar> -->
    <router-view style="margin-bottom:50px;"/>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import MintUI from 'mint-ui'
import exifjs from 'exif-js';

import {Tabbar, TabItem, Navbar, Cell,TabContainer, TabContainerItem} from 'mint-ui';

import 'mint-ui/lib/style.css'
import './assets/style/common.css'
import '../static/font-awesome-4.7.0/css/font-awesome.css'

Vue.use(MintUI)
// Vue.use(axios);
Vue.use(exifjs);

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Navbar.name, Navbar);
Vue.component(Cell.name, Cell);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);


export default {
  name: 'App',
  mounted(){
    var userId = this.getCookie('userId');
    if(!userId){
      this.$router.push('/signIn');
    }
  },
  components: {
    // tabBar
  },
  methods: {
    getCookie(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)){
        return true;
       // return (arr[2]);
      }else{
        return false
      }
    }
  }
}

</script>

<style>
html,body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
  height: 100%;
}
</style>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuex from 'vuex'
import App from './App'
import router from './router'
Vue.config.productionTip = false

Vue.use(vuex);

const store = new vuex.Store({
	state: {
		// serverPath: 'http://localhost:3000',
		serverPath: 'http://47.93.243.99:3000',
		userid: '',
		selectTab: 'menulist'
	},
	mutations:{
		updateSelectTab(state, tab){
			state.selectTab = tab;
		},
		updateUserId(state, id){
			state.userid = id;
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

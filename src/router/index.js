import Vue from 'vue'
import Router from 'vue-router'

import uploadImage from '@/components/uploadImage'

import menuList from '@/views/menuList'
import collection from '@/views/collection'
import upload from '@/views/upload'
import mine from '@/views/mine'
import menuDetails from '@/views/menuDetails'
import editUserInfo from '@/views/editUserInfo'
import signIn from '@/views/signIn'
import signUp from '@/views/signUp'

Vue.use(Router)

export default new Router({
  	routes: [{
      	path: '/menuList',
      	name: 'menuList',
      	component: menuList
    },{
      	path: '/collection',
      	name: 'collection',
      	component: collection,
    },{
      	path: '/upload',
      	name: 'upload',
      	component: upload,
    },{
      	path: '/mine',
      	name: 'mine',
      	component: mine,
    },{
        path: '/menuDetails',
        name: 'menuDetails',
        component: menuDetails
    },{
        path: '/uploadImage',
        name: 'uploadImage',
        component: uploadImage
    },{
        path: '/editUserInfo',
        name: 'editUserInfo',
        component: editUserInfo
    },{
        path: '/signIn',
        name: 'signIn',
        component: signIn
    },{
        path: '/signUp',
        name: 'signUp',
        component: signUp
    }]
})
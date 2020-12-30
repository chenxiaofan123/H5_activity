
import Vue from 'vue'

import App from '../../components/base/appwithshare2.vue';
import Index from './index.vue'
import VueRouter from 'vue-router'

import * as filters from '../../filters/index.js'
import components from '../../components/index.js'

Object.keys(filters).forEach((key)=>{
    Vue.filter(`${key}`,filters[key]); // 注册过滤器
})
Object.keys(components).forEach((key) => {
    Vue.component(`v-${key}`, components[key]); // 注册公共组件
})

import Rules from './components/rules';
import MyRecord from './components/myRecord';
var routerpath=require('routerPath').path;
Vue.use(VueRouter);

let router = new VueRouter({
   // mode:'history',
    routes: [
        {
             path: '/',
            component: App,
            children:[
                {
                    path:'/',
                    component:Index,
                    meta: {keepAlive: true}
                },
                {
                    path:'/rules',
                    component:Rules,
                    meta: {keepAlive: false}
                },{
                    path:'/myRecord',
                    component:MyRecord,
                    meta: {keepAlive: false}
                }
            ]
        }
    ]
})

var vm=new Vue({
    el:'#app',
    router
})
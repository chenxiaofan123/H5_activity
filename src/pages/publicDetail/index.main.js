
import Vue from 'vue'

import App from '../../components/base/app';
import Index from './index.vue'
import VueRouter from 'vue-router'
var routerpath=require('routerPath').path;

Vue.use(VueRouter);
require ('swiper/dist/css/swiper.css')

let router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: routerpath + 'publicDetail',
            component: App,
            children:[
                {
                    path:'/',
                    component:Index,
                    meta: {keepAlive: true}
                }
            ]
        }
    ]
})

var vm=new Vue({
    el:'#app',
    router
})
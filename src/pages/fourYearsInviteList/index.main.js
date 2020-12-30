
import Vue from 'vue'

import App from '../../components/base/app.vue';
import Index from './index.vue'
import VueRouter from 'vue-router'


var routerpath=require('routerPath').path;
var scroll = require('../../../statics/scripts/lib/iscroll-lite')
Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: routerpath+'fourYearsInviteList',
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

new Vue({
    el:'#app',
    router,
    scroll
})
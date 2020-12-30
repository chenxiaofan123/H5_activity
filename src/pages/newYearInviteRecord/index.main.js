
import Vue from 'vue'

import App from '../../components/base/app.vue';
import Index from './index.vue'
import VueRouter from 'vue-router'

import * as filters from '../../filters/index.js'
import components from '../../components/index.js'
// var scroll = require('../../../statics/scripts/lib/iscroll-lite')
Object.keys(filters).forEach((key)=>{
    Vue.filter(`${key}`,filters[key]); // 注册过滤器
})
Object.keys(components).forEach((key) => {
    Vue.component(`v-${key}`, components[key]); // 注册公共组件
})

 import Rules from './components/rules';
 import InviteRecord from './components/inviteRecord';
 import InvitationList from './components/invitationList';
var routerpath=require('routerPath').path;
Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: routerpath+'newYearInviteRecord',
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
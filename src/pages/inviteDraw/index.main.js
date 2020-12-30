
import Vue from 'vue'

import App from '../../components/base/appwithshare.vue';
import Index from './index.vue'
import VueRouter from 'vue-router'

/*import * as filters from '../../filters/index.js'*/

/*Object.keys(filters).forEach((key)=>{
    Vue.filter(`${key}`,filters[key]); // 注册过滤器
})*/


var routerpath=require('routerPath').path;
Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: routerpath+'inviteDraw',
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
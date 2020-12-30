
import Vue from 'vue'

import App from '../../components/base/appwithtopOpera';
import Index from './index.vue'
import VueRouter from 'vue-router'
var routerpath=require('routerPath').path;
Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: routerpath+'yearEndPosters',
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
    router
})
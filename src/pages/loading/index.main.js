
import Vue from 'vue'

import App from '../../components/base/app.vue';
import Index from './index.vue'
import VueRouter from 'vue-router'

import * as filters from '../../filters/index.js'
import components from '../../components/index.js'

// import VueProgressBar from 'vue-progressbar'


// Object.keys(filters).forEach((key)=>{
//     Vue.filter(`${key}`,filters[key]); // 注册过滤器
// })
// Object.keys(components).forEach((key) => {
//     Vue.component(`v-${key}`, components[key]); // 注册公共组件
// })

// const options = {
//     color: '#FFEB00',
//     failedColor: '#874b4b',
//     thickness: '10px',
//     transition: {
//       speed: '0.2s',
//       opacity: '0.6s',
//       termination: 300
//     },
//     top:'50%',
//     autoRevert: true,
//     location: 'top',
//     inverse: false
//   }
  
//   Vue.use(VueProgressBar, options)
  


var routerpath=require('routerPath').path;
Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: routerpath+'loading',
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
import Vue from 'vue'
import Router from 'vue-router'
//	@是找到src目录
import Eelement from '@/components/eelement.vue'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
Vue.use(Router)

export default new Router({
  routes: [
  	{path:'/',redirect:{name:'home'}},
    {name:'eelement',path:'/eelement',component:Eelement},
    {name:'login',path:'/login',component:Login},
    {name:'home',path:'/home',component:Home, children:[
    	{name:'users',path:'/users',component:Users}
    ]
    },
  ]
})

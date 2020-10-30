import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)

const login = () => import('../pages/login/login')
const index = () => import('../pages/index/index')
const home = () => import('../pages/home/home')

const role = () => import('../pages/role/role')
const manger = () => import('../pages/manger/manger')
const menu = () => import('../pages/menu/menu')
const spces = () => import('../pages/spces/spces')
const loop = () => import('../pages/loop/loop')
const seckill = () => import('../pages/seckill/seckill')
const classify = () => import('../pages/classify/classify')
const goods = () => import('../pages/goods/goods')
const member = () => import('../pages/member/member')


export const indexRouters=[
  {
    path:"cate",
   component:classify,
   name:"分类列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/cate")){
       next()
     }else{
       next("/index")
     }
   }
  },
  {
    path:"goods",
   component:goods,
   name:"商品列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/goods")){
       next()
     }else{
       next("/index")
     }
   }
  },
  {
    path:"home",
   component:home,
   
  },{
    path:"banner",
   component:loop,
   name:"轮播图列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/banner")){
       next()
     }else{
       next("/index")
     }
   }
  },{
    path:"manage",
   component:manger,
   name:"管理员列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/manage")){
       next()
     }else{
       next("/index")
     }
   }
  },{
    path:"member",
   component:member,
   name:"会员列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/member")){
       next()
     }else{
       next("/index")
     }
   }
  },{
    path:"menu",
   component:menu,
   name:"菜单列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/menu")){
       next()
     }else{
       next("/index")
     }
   }
  },{
    path:"role",
   component:role,
   name:"角色列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/role")){
       next()
     }else{
       next("/index")
     }
   }
  },{
    path:"seckill",
   component:seckill,
   name:"秒杀列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/seckill")){
       next()
     }else{
       next("/index")
     }
   }
  },{
    path:"spec",
   component:spces,
   name:"规格列表",
   beforeEnter(to, from, next){
     let userInfo = store.state.userInfo;
     if(userInfo.menus_url.includes("/spec")){
       next()
     }else{
       next("/index")
     }
   }
  }
]
 


export const router= new Router({
  routes: [
    {
      path:"/login",
      component:login
    },
    {
      path:"/index",
      component:index,
      children:[
        {
          path:'',
          redirect:'home'
        },
        ...indexRouters
      ]
    },
    {
      path:"/",
      redirect:"login"
    }
  ]
})

router.beforeEach((to,form,next)=>{
  //  如果去的是登陆
   if(to.path==="/login"){
     next();
     return;
   }
  // 若去的不是登录，判断是否登录
  let userInfo = store.state.userInfo;
  //  console.log(store.state)
  
  // console.log(userInfo)
  if(userInfo.username){
    next()
   return;  
  } 
 
  next("/login")


})
  

import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login/login.vue' //登陆
import register from './views/register/register.vue' //注册
import forgetPwd from './views/forgetPwd/forgetPwd.vue' //忘记密码
import repwd from './views/repwd/repwd.vue' //重置密码
import GameCenter from './views/GameCenter/GameCenter.vue' //游戏中心
import detail from './views/detail/detail.vue' //游戏详情
import mine from './views/mine/mine.vue' //我的
import accountNum from './views/accountNum/accountNum.vue' //账号与安全
import record from './views/record/record.vue' //交易记录
import zero from './views/zero/zero.vue' //支付页面
import Ingame from './views/Ingame/Ingame.vue' //游戏界面
import Escrow from './views/Escrow/Escrow.vue' //支付
import changeInfo from './views/changeInfo/changeInfo.vue' //修改信息
import bind from './views/bind/bind.vue' //第三方登录绑定手机号
import realName from './views/realName/realName.vue' //实名认证
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'',
      component:login,
    },
    {
      path:'/login',
      name:'login',
      component:login,
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/repwd',
      name: 'repwd',
      component: repwd
    },
    {
      path:'/GameCenter',
      name:'GameCenter',
      component:GameCenter,
      meta:{
        showTab:true
      }
    },
    {
      path:'/detail/:gid',
      name:'detail',
      component:detail,
    },
    {
      path:'/mine',
      name:'mine',
      component:mine,
      meta:{
        showTab:true
      }
    },
    {
      path:'/accountNum',
      name:'accountNum',
      component:accountNum
    },
    {
      path:'/record',
      name:'record',
      component:record
    },
    {
      path:'/zero',
      name:'zero',
      component:zero
    },
    {
      path:'/Ingame',
      name:'Ingame',
      component:Ingame
    },
    {
      path:'/Escrow',
      name:'Escrow',
      component:Escrow
    },
    {
      path:'/changeInfo',
      name:'changeInfo',
      component:changeInfo
    },
    {
      path:'/bind',
      name:'bind',
      component:bind
    },
    {
      path:'/realName',
      name:'realName',
      component:realName
    },
  ]
})

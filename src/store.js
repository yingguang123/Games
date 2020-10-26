import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
    // localStorage.setItem();   传值
    // localStorage.setItem();  更改
export default new Vuex.Store({
    state: {
        uid: localStorage.getItem('uid'), //id
        nickname:localStorage.getItem('nickname'),//昵称
        player: localStorage.getItem('player'), //player
        bind: localStorage.getItem('bind'), //绑定结果
        email: localStorage.getItem('email'), //邮箱
        avatar: localStorage.getItem('avatar'), //头像
        phone: localStorage.getItem('phone'), //电话
        gid: localStorage.getItem('gid'), //游戏ID
        aid: localStorage.getItem('aid'), //大区ID
        roleid: localStorage.getItem('roleid'), //角色ID
        time: localStorage.getItem('time'),//时间
        money: localStorage.getItem('money'),//充值金额
    },
    mutations: {
        //id
        inCread(state, id) {
            state.uid = id
            localStorage.setItem("uid", id)
        },
        // player
        player(state, player) {
            state.player = player
            localStorage.setItem("player", player)
        },
          // 绑定结果
          bind(state, bind) {
            state.bind = bind
            localStorage.setItem("bind", bind)
        },
        // 昵称
        nickname(state, nickname) {
            state.nickname = nickname
            localStorage.setItem("nickname", nickname)
        },
        //邮箱
        email(state, email) {
            state.email = email
            localStorage.setItem("email", email)
        },
        //电话
        phone(state, phone) {
            state.phone = phone
            localStorage.setItem("phone", phone)
        },
        //头像
        avatar(state, avatar) {
            state.avatar = avatar
            localStorage.setItem("avatar", avatar)
        },
        //游戏ID
        gid(state, gid) {
            state.gid = gid
            localStorage.setItem("gid", gid)
        },
        //大区ID
        aid(state, aid) {
            state.aid = aid
            localStorage.setItem("aid", aid)
        },
        //角色ID
        roleid(state, roleid) {
            state.roleid = roleid
            localStorage.setItem("roleid", roleid)
        },
        // 时间
        time(state, time) {
            state.time = time
            localStorage.setItem("time", time)
        },
        // 充值钱数
        money(state, money) {
            state.money = money
            localStorage.setItem("money", money)
        },
    },
    getters: {},
    actions: {

    }
})
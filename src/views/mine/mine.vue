<template>
<div class="all">
    <div class="title">
        <Header style="border-bottom:none">
            <span slot="center">我的信息</span>
        </Header>
    </div>
    <!--个人信息-->
    <div class="head" @click="modify">
        <div class="img">
            <img alt :src="'http://116.62.181.150/'+info.url" />
            <!-- <img :src="info.url" alt=""> -->
        </div>
        <div class="nickname">
            <span>{{info.nickname}}</span>
        </div>

    </div>
    <div class="id">
        <p>
            ID：
            <span>{{info.player}}</span>
        </p>
    </div>
    <div class="body">
        <div class="tit">
            <p>最近在玩</p>
        </div>
        <game :games="game"></game>
        <div class="tit1">
            <p>我的收藏</p>
        </div>
        <Collect :collect="gamecollect"></Collect>
        <div class="bg"></div>
        <div class="info">
            <div class="infoChilren" @click="jumpNumber">
                <p>账号与安全</p>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
            <div class="infoChilren" @click="record">
                <p>交易记录</p>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
    </div>
    <button class="sign" @click="sign">退出登录</button>
</div>
</template>

<script>
import Header from "../../components/common/header/header.vue";
import game from "../../components/content/mine/game.vue";
import Collect from "../../components/content/mine/collect.vue";
import "@/views/mine/mine.css";
import {
    personal,
    GameRecord,
    collectList
} from "../../network/mine";
import axios from "axios";
import qs from "qs";
export default {
    components: {
        Header,
        game,
        Collect
    },
    props: {},
    data() {
        return {
            // 信息
            info: {},
            is: true,
            dis: true,
            // 游戏
            game: [],
            gamecollect: []
        };
    },
    methods: {
        modify() {
            this.$router.push('/changeInfo').catch(err => {
                err
            })
        },

        // 跳转到账号与安全
        jumpNumber() {
            this.$router.push("/accountNum");
        },
        // 跳转到交易记录
        record() {
            this.$router.push("/record");
        },
        // 退出登录
        sign() {
            localStorage.clear(); //为了清除$store.sate里储存的值
            // window.location.reload(); //跳转页面并刷新
            this.$layer.msg("退出成功", {
                icon: 16,
                // shade: 0.3,
                time: false,
            });
            this.$router.push("/login/").catch((err) => {
                err;
            });
        },
    },
    created() {
        // 个人信息
        personal(this.$store.state.uid).then((res) => {
            // console.log(res)
            this.info = res.data.BModel
        });
        // 游戏记录
        GameRecord(this.$store.state.uid).then(res => {
            // console.log(res.data)
            this.game = res.data.list
            // this.game.splice(0, 1, )
        });
        // 我的收藏
        axios({
            method: 'post',
            url: 'http://www.wwyyyy.shop/api/Collections/GetList',
            params: {
                uid: parseInt(this.$store.state.uid)
            }
        }).then(res => {
            // console.log(res.data)
            this.gamecollect = res.data.mlist
        })
    },
};
</script>

<style scoped>
</style>

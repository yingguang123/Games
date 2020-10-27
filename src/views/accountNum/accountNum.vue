<template>
<div>
    <div class="title">
        <Header>
            <span slot="left">
                <i @click="$router.push('/mine')" class="fa fa-angle-left" aria-hidden="true"></i>
            </span>
            <span slot="center">账号与安全</span>
        </Header>
    </div>
    <!-- 实名认证 -->
    <div class="real">
        <p>实名认证</p>
        <div class="icon" @click="jump()">
            <span v-if="bind">未认证</span>
            <span v-else>{{ realname }}</span>
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
    </div>
    <!-- 绑定社交 -->
    <div class="real">
        <p>绑定社交账号</p>
        <div class="right" @click="bindaccount">
            <span>{{this.$store.state.bind}}</span>
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
    </div>

    <!-- 进入修改页面 -->
    <div class="con" @click="modify">
        <div class="bg"></div>
        <div class="account">
            <p>手机</p>
            <div class="right">
                <span>{{ this.$store.state.phone }}</span>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
        <div class="account">
            <p>邮箱</p>
            <div class="right">
                <span>{{ this.$store.state.email }}</span>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
    </div>

    <!-- 弹框社交账号 -->
    <div class="goodsModel" v-show="show" @click="show = false"></div>
    <div class="goodsName" v-show="show">
        <div>
            <img src="@/assets/img/wx.png" alt="" @click="wx" />
            <img src="@/assets/img/QQ.png" alt="" @click="qq" />
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    Login,
    qqlogin
} from "../../network/login";
import Header from "../../components/common/header/header.vue";
//绑定手机号
import {
    myphone,
    myEmail,
    emailcode
} from "@/network/accountNum.js";
// import { Login } from "../../network/login";
import layer from "../../network/layer.js";
export default {
    components: {
        Header,
        // ponup
    },
    props: {},
    data() {
        return {
            phone: "",
            email: "", //邮箱
            number: "", //验证码
            show: false, //显示
            timecount: 59, //60秒
            bind: true, //绑定
            realname: "已认证",
        };
    },
    methods: {
        // 绑定社交账号
        bindaccount() {
            // this.showModel = !this.showModel
            this.show = !this.show;
        },
        //微信
        wx() {
            this.$layer.msg("该功能暂为开发");
        },
        //qq
        qq() {
            QC.Login.showPopup({
                appId: "101903871",
                redirectURI: "http://192.168.0.91:8080/accountNum",
            });
        },
        modify() {
            this.$router.push("/changeInfo").catch((err) => {
                err;
            });
        },
        jump() {
            this.$router.push("/realName").catch((err) => {});
        },
    },
    created() {
        if (QC.Login.check() == true) {
            // 该处的openId，accessToken就是后台需要的参数了，后台可以通过这些参数获取临时登录凭证，然后就是自己的逻辑了
            QC.Login.getMe(function (openId, accessToken) {
                if (openId !== undefined) {
                    //openId 是用户的唯一标识，也是需要存到数据库的
                    // console.log(openId)
                    // console.log(accessToken)

                }
            })
            // console.log('已登录!')
            // this.$message.info('qq成功登录')
        } else {
            // console.log('未登录')
        }
    },
};
</script>

<style scoped>
.title {
    width: 100%;
    background-color: #666;
    color: #ffffff;
}

.title i {
    float: left;
    margin-left: -133px;
}

.con .account {
    height: 74px;
    display: flex;
    justify-content: space-between;
    padding: 0 21px;
    align-items: center;
}

.con .account1 {
    height: 74px;
    display: flex;
    justify-content: space-between;
    padding: 0 21px;
    align-items: center;
}

.con .account:last-child {
    border-top: 2px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    margin-bottom: 63px;
}

.con .account .right span {
    color: #acacac;
    padding-right: 10px;
}

.bg {
    width: 100%;
    height: 20px;
    background-color: #f2f2f2;
}

.btn {
    display: flex;
    justify-content: space-around;
}

.btn button {
    width: 86%;
    height: 60px;
    background-color: #169bd5;
    border: none;
    color: #fff;
    font-size: 13px;
    border-radius: 15px;
}

.real {
    height: 74px;
    display: flex;
    justify-content: space-between;
    padding: 0 21px;
    align-items: center;
    border-bottom: 2px solid #e4e4e4;
}

.real span {
    color: #acacac;
    padding-right: 10px;
}

/* 第三方弹框*/
.dlog {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.mask {
    width: 90%;
    height: 30%;
    background-color: #fff;
    position: fixed;
    top: 24%;
    left: 5%;
}

/*商品名称弹框 */
.goodsModel {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.goodsName {
    position: absolute;
    top: 195px;
    left: 80px;
    width: 54%;
    height: 21%;
    background: #fff;
    z-index: 2;
}

.goodsName>div {
    display: flex;
    justify-content: space-around;
}

.goodsName>div>img {
    display: inline-block;
    width: 50px;
    margin-top: 40px;
}
</style>

<template>
<div class="all">
    <top style="position: absolute;top:0;width:100%;color:#fff">
        <!---->
        <span slot="center">注册</span>
        <img src="@/assets/img/jtr.png" slot="right" @click="goback" style="width: 20px;float: right;  margin-top: 6vw; margin-right: 4vw;" />
    </top>
    <div class="inp_txt">
        <!-- <span class="span">用户名</span> -->
        <input type="text" placeholder="请输入手机号或邮箱" v-model="account" />
    </div>
    <div class="inp_txt">
        <!-- <span class="span">密码</span> -->
        <input type="password" placeholder="请输入密码" v-model="pwd" />
    </div>
    <div class="inp_txt">
        <!-- <span class="span">手机号</span> -->
        <input type="text" placeholder="请输入手机号" v-model="phone" />
    </div>
    <div class="inp_txt">
        <!-- <span>手机验证码</span> -->
        <input type="text" placeholder="请输入验证码" style=" width:101px" v-model="number" />
        <button v-show="show" class="code" @click.prevent="getAuthCode">
            <span class="span">获取验证码</span>
        </button>
        <button v-show="!show" class="code1">
            <span class="auth_text_blue">{{timecount}}</span> 秒后重发
        </button>
    </div>

    <button class="submit" @click="register()">注册</button>
    <div class="third">
        <p>第三方账号登陆</p>
        <i class="fa fa-weixin" aria-hidden="true"></i>
        <i class="fa fa-qq" aria-hidden="true"></i>
    </div>
</div>
</template>

<script>
import top from "../../components/common/header/top.vue";

// 接口
import {
    reg
} from "../../network/reg.js";
import axios from "axios";
import qs from "qs";
export default {
    components: {
        top,
    },
    props: {},
    data() {
        return {
            show: true, //显示
            timecount: 59, //60秒
            account: "", //手机号或邮箱
            pwd: "", //密码
            number: "", //验证码,
            phone: "", //手机号
        };
    },
    methods: {
        //返回到上一级
        goback() {
            this.$router.go(-1);
        },
        //点击获取手机号验证码
        getAuthCode() {
            // 获取手机号验证码
            let PhoneNumbers = this.phone;
            // console.log(PhoneNumbers)
            if (/^1[3456789]\d{9}$/.test(PhoneNumbers)) {
                axios({
                        url: "http://116.62.181.150/api/sms/Sendmsg",
                        method: "post",
                        params: {
                            PhoneNumbers: PhoneNumbers,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        // console.log(res.config.params.PhoneNumbers);
                        // console.log(this.$store.commit("phone", res.config.params.PhoneNumbers));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                this.show = false;
                //设置倒计时秒
                this.timecount = 59;
                var auth_timetimer = setInterval(() => {
                    this.timecount--;
                    if (this.timecount <= 0) {
                        this.show = true;
                        clearInterval(auth_timetimer);
                    }
                }, 1000);
            } else {
                alert("手机号格式错误");
            }
            // 邮箱注册
            // if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            //         this.account
            //     )){
            //         let email=this.account
            //         console.log(email)
            //         this.$axios.post('https://localhost:44391/api/SMS/Email/').then(
            //             function (response) {
            //                 console.log("请求成功", response);
            //             },
            //             function (error) {
            //                 console.log("请求失败", error);
            //             }
            //         );
            //     }else{
            //         alert('邮箱格式错误')
            //     }
        },
        register() {
            this.$store.commit("phone", this.phone);
            if (
                this.account == "" ||
                this.pwd == "" ||
                this.number == "" ||
                this.phone == ""
            ) {
                alert("请完善内容");
            } else if (
                /^1[3456789]\d{9}$/.test(this.account) ||
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
                    this.account
                ) ||
                /^1[3456789]\d{9}$/.test(this.phone)
            ) {
                // 注册事件
                let params = {
                    account: this.account,
                    pwd: this.pwd,
                };
                reg(params).then((res) => {
                    console.log(res);
                    if (res.data == true) {
                        this.$layer.msg("注册成功", {
                            icon: 16,
                            // shade: 0.3,
                            time: false,
                        });
                        this.$router.push("/login");
                    } else {
                        this.$layer.msg("该账号已注册", {
                            icon: 16,
                            // shade: 0.3,
                            time: false,
                        });
                        // this.$router.push('/login')
                    }
                });
                // 验证手机号验证码
                axios({
                        url: "http://116.62.181.150/api/sms/CodeCheck",
                        method: "post",
                        params: {
                            number: this.number,
                            account: this.phone
                        },
                    })
                    .then(function (res) {
                        if ((res.data.msg = 0)) {
                            //   alert("修改成功");
                        }
                    })
                    .catch(function (err) {});
            } else {
                alert("手机号或邮箱格式不对");
            }
        },
    },
};
</script>

<style scoped>
.all {
    background: url("../../assets/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
    width: 101%;
    padding-top: 33vw;
    text-align: center;
}

.all .inp_txt {
    /* text-align: center; */
    padding-bottom: 5vw;
    font-size: 14px;
}

.all .inp_txt input {
    height: 8.6vw;
    /* width: 100%; */
    width: 61.98vw;
    /* border-radius: 10%; */
    border-radius: 20px;
    border: none;
    background: #b4dde1;
    color: #fff;
    text-indent: 1em;
    outline: none
}

.all .btn {
    border: none;
    padding-bottom: 5vw;
}

.all .btn button {
    background: #409eff;
    color: #fff;
    border: none;
    width: 20%;
    line-height: 200%;
    border-radius: 10%;
    margin: 0 8vw;
}

.all .submit {
    width: 55.9vw;
    border: none;
    height: 7vw;
    border-radius: 3vw;
    background: #fff;
    /* background-color: #39b2ff; */
    /* color: #fff; */
    color: #8bbcbe;
    /* font-size: 16px; */
    /* border: none; */
    display: block;
    /* margin-bottom: 78px; */
    /* margin: 25px 91px 60px; */
    margin: 20px auto 60px;
    /* margin-bottom: 60px; */
}

.all .third {
    border-top: 0.39vw solid #fff;
    width: 95%;
    margin: 0 auto;
    padding-bottom: 36vw;
}

.all .third p {
    margin-bottom: 10vw;
    margin-top: 5vw;
    color: #fff;
}

.all .third i {
    font-size: 7vw;
    padding: 0 10vw;
    color: #fff;
}

/* 点击获取验证码 */
.code {
    background-color: #fff;
    color: #8bbcbe;
    /* background-color: #fff; */
    border: none;
    border-radius: 5vw;
    line-height: 8vw;
    margin-left: 50px;
    width: 78px;
    font-size: 12px;
    outline: none
}

.code1 {
    /* background-color: #39b2ff; */
    /* color: #fff; */
    background-color: #fff;
    border: none;
    border-radius: 5vw;
    line-height: 8vw;
    margin-left: 50px;
    width: 78px;
    font-size: 12px;
    outline: none
}
</style>

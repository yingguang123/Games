<template>
<div class="all">
    <top style="position: absolute;top:0;width:100%;color:#fff">
        <!---->
        <img src="@/assets/img/jt.png" alt slot="left" @click="goback" />
        <span slot="center">忘记密码</span>
    </top>
    <div class="inp_txt">
        <!-- <span>用户名：</span> -->
        <input type="text" placeholder="手机号或邮箱" v-model="this.$route.params.account" />
    </div>
    <div class="inp_txt">
        <!-- <span>手机号：</span> -->
        <input type="text" placeholder="请输入手机号" v-model="phone" />
    </div>
    <div class="inp_txt">
        <!-- <span>验证码：</span> -->
        <input style="width: 133px;margin-right: 25px;" type="text" q placeholder="请输入验证码" v-model="number" />
        <button class="number code" v-show="show" @click.prevent="getAuthCode">获取验证码</button>
        <button v-show="!show" class="code1">
            <span class="auth_text_blue">{{timecount}}</span> 秒后重发
        </button>
    </div>
    <button class="submit" @click="submit()">提交</button>
</div>
</template>

<script>
import top from "../../components/common/header/top.vue";
import axios from "axios";
import {
    ForgetPwd
} from "../../network/forgetPwd";
export default {
    components: {
        top,
    },
    props: {},
    data() {
        return {
            show: true, //显示
            timecount: 59, //60秒
            phone: "",
            account: "",
            number: "",
        };
    },

    methods: {
        //点击获取手机号验证码
        getAuthCode() {
            // 获取手机号验证码
            let PhoneNumbers = this.phone;
            if (/^1[3456789]\d{9}$/.test(PhoneNumbers)) {
                axios({
                        url: "http://116.62.181.150/api/sms/Sendmsg",
                        method: "post",
                        params: {
                            PhoneNumbers: PhoneNumbers,
                        },
                    })
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(function (err) {});
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
                this.$layer.msg("手机号格式错误", {
                    icon: 16,
                    // shade: 0.3,
                    time: false,
                });
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
        // 跳转到重置密码
        submit() {
            if (
                /^1[3456789]\d{9}$/.test(this.$route.params.account) ||
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
                    this.$route.params.account && /^1[3456789]\d{9}$/.test(this.phone)
                )
            ) {
                ForgetPwd(this.$route.params.account, this.phone).then((res) => {
                    // console.log(this.account, this.phone)
                    // console.log(res.config);
                    if (res.data.result == true) {
                        this.$router
                            .push({
                                name: "repwd",
                                params: {
                                    account: res.config.params.account,
                                    phone: res.config.params.phone,
                                },
                            })
                            .catch((data) => {});
                    }
                });
                // 验证手机号验证码
                axios({
                        url: "http://116.62.181.150/api/sms/CodeCheck",
                        method: "post",
                        params: {
                            number: this.number,
                        },
                    })
                    .then(function (res) {
                        console.log(res)
                        if (res.data.msg = 0) {
                            this.$layer.msg("修改成功", {
                                icon: 16,
                                // shade: 0.3,
                                time: false,
                            });
                        }
                    })
                    .catch(function (err) {});
            } else {
                this.$layer.msg("手机号或邮箱格式错误", {
                    icon: 16,
                    // shade: 0.3,
                    time: false,
                });
            }
        },
        // 返回上一级
        goback() {
            this.$router.go(-1);
        },
    },
};
</script>

<style scoped>
.all {
    background: url("../../assets/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    padding-top: 47vw;
    text-align: center;
}

.all .inp_txt {
    margin-left: 23px;
    padding-bottom: 5vw;

}

.all .inp_txt span {
    display: inline-block;
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
    height: 7.5vw;
    border-radius: 3vw;
    background: #fff;
    /* background-color: #39b2ff; */
    /* color: #fff; */
    color: #8bbcbe;
    margin: 20px auto 291px;
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
}

.all .third i {
    font-size: 10vw;
    padding: 0 10vw;
}

/* 点击获取验证码 */
.code {
    background-color: #fff;
    color: #8bbcbe;
    /* background-color: #fff; */
    border: none;
    border-radius: 5vw;
    line-height: 8vw;
    /* margin-left: 50px; */
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

<template>
<div class="bindphone">
    <div class="bind">
        <div class="inp">
            <input type="number" placeholder="请输入手机号" v-model="phone">
        </div>
        <div class="number">
            <input type="number" placeholder="请输入验证码" v-model="number" />
            <button v-show="show" class="code" @click="getphone">
                <span>获取验证码</span>
            </button>
            <button v-show="!show" class="code1">
                <span class="auth_text_blue">{{ timecount }}</span> 秒后重发
            </button>
        </div>

        <div class="submitAll">
            <button class="submit" type="submit" @click="surephone">绑定</button>
        </div>
    </div>
</div>
</template>

<script>
import {
    GetCode
} from '../../network/changeInfo'
import axios from 'axios'
export default {
    components: {},
    props: {},
    data() {
        return {
            phone: '',
            number: "",
            timecount: 59,
            show: true
        }
    },
    methods: {
        //手机点击验证码 判断手机号是否正确
        getphone() {
            if (/^1[3456789]\d{9}$/.test(this.phone)) {
                axios({
                        url: "http://116.62.181.150/api/sms/Sendmsg",
                        method: "post",
                        params: {
                            PhoneNumbers: this.phone,
                        },
                    })
                    .then(function (res) {
                        console.log(res)
                    })
                    .catch(function (err) {});
                this.show = !this.show;
                this.timecount = 59;
                var auth_timetimer = setInterval(() => {
                    this.timecount--;
                    if (this.timecount <= 0) {
                        this.show = true;
                        clearInterval(auth_timetimer);
                    }
                }, 1000);
            } else {
                this.$layer.msg("手机格式错误", {
                    icon: 16,
                    shade: 0.3,
                    time: false,
                });
            }
        },
        //手机点击确定
        surephone() {
            if (this.phone != "" && this.number != "") {
                // this.$store.commit("phone", this.phone);
                axios({
                        url: "http://116.62.181.150/api/sms/CodeCheck",
                        method: "post",
                        params: {
                            number: this.number,
                            account: this.phone
                        },
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data == true) {
                            axios({
                                    url: "http://116.62.181.150/api/users/Updataphone",
                                    method: "post",
                                    params: {
                                        ID: this.$store.state.uid,
                                        phone: this.phone
                                    },
                                })
                                .then(res => {
                                    console.log(res.data);
                                    if (res.data.msg == '绑定成功') {
                                        this.phone = res.data.phone
                                        this.$store.commit("phone", this.phone);
                                    }
                                })
                            this.phoneModel = !this.phoneModel;
                            this.bind = !this.bind
                            this.number = "";
                        } else {
                            this.$layer.msg("验证码错误", {
                                icon: 16,
                                shade: 0.3,
                                time: false,
                            });
                        }
                    })
                    .catch(function (err) {});

            } else
                this.$layer.msg("手机或验证码为空", {
                    icon: 16,
                    shade: 0.3,
                    time: false,
                });

        },
    },
}
</script>

<style scoped>
.bindphone {
    background: url(../../assets/img/bg.jpg) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    background-repeat: repeat-y;
    height: 750px;
}

.bind {
    margin: 0 auto;
    text-align: center;
    padding-top: 20%;
}

.bind .inp {
    margin-bottom: 36px;
    color: #fff;
}

.bind .inp input {
    height: 30px;
    width: 70%;
    margin-top: 130px;
    text-indent: 1em;
    background-color: #b4dde1;
    border: #fff;
    border-radius: 15px;
    outline: none
}

input::-webkit-input-placeholder {
    /* WebKit, Blink, Edge 适配谷歌*/
    color: #fff !important;
}

input:-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐*/
    color: #fff !important;
}

input:-ms-input-placeholder {
    /* Internet Explorer 10-11 适配ie*/
    color: #fff !important;
}

.number {
    margin: 0 15%;
    display: flex;
    justify-content: space-between
}

.number input {
    height: 30px;
    text-indent: 1em;
    background-color: #b4dde1;
    border: #fff;
    border-radius: 15px;
    outline: none
}

.number button {
    width: 86px;
    height: 32px;
    background-color: #b4dde1;
    border: #fff;
    border-radius: 15px;
}

.submitAll {
    margin-top: 45px;
}

.submit {
    width: 59%;
    height: 31px;
    color: #74c2cc;
    font-size: 18px;
    background-color: #fff;
    border: none;
    border-radius: 15px;
}

.number .code {
    margin-left: 9px;
    width: 86px;
    height: 32px;
}

.number .code1 {
    margin-left: 9px;
    width: 86px;
    height: 32px;
}
</style>

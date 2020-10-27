<template>
<div class="all">
    <div class="title">
        <Header>
            <span slot="left">
                <i @click="back()" class="fa fa-angle-left" aria-hidden="true"></i>
            </span>
            <span style="padding-left: 21px;" slot="center">修改</span>
        </Header>
    </div>
    <div class="info">
        <div class="cont">
            <!--'http://116.62.181.150/'+-->
            <img class="img" alt :src="'http://116.62.181.150/'+info.url" />
            <div @click.stop="change" class="avatar">
                <input type="file" name="file" accept="image/*" @change="handleFile" class="hiddenInput" ref="avatarInput" style="display: none" />
                <span>修改头像</span>
                <i class="fa fa-angle-right fa-2" aria-hidden="true"></i>
            </div>
        </div>
        <div class="cont" @click="nickname = true">
            <span>昵称</span>
            <div class="nickName">
                <span>{{ info.nickname }}</span>
                <i class="fa fa-angle-right fa-2" aria-hidden="true"></i>
            </div>
        </div>
        <!-- 弹框 -->
        <div class="pop" v-if="nickname"></div>
        <!--  -->
        <div class="nick" v-if="nickname">
            <img src="@/assets/img/x.png" alt @click="nickname = false" />
            <p>填写昵称</p>
            <input name="name" type="text" v-model="info.nickname" />
            <button @click="determine">保存</button>
        </div>
    </div>
    <!--手机部分-->
    <div class="bind">
        <div class="cont">
            <span>绑定手机号</span>
            <div class="phone" @click="open">
                <span>{{ phone }}</span>
                <i class="fa fa-angle-right fa-2" aria-hidden="true"></i>
            </div>
        </div>
        <!--解绑手机弹框  -->
        <div class="dlog" v-if="phoneModel" @click="phoneModel = !phoneModel"></div>
        <div class="mask" v-if="phoneModel">
            <div class="email">
                <input type="phone" placeholder="请输入手机" v-model="phone" />
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
                <button class="submit" type="submit" @click="surephone">确认</button>
                <button class="submit" type="submit" @click="none">取消</button>
            </div>
        </div>
        <!--绑定手机弹框-->
        <div class="dlog" v-if="bind" @click="bind=!bind"></div>
        <div class="mask" v-if="bind">
            <div class="email">
                <input type="phone" placeholder="请输入手机" v-model="bindphone" />
            </div>
            <div class="number">
                <input type="number" placeholder="请输入验证码" v-model="number" />
                <button v-show="show1" class="code" @click="getbindphone">
                    <span>获取验证码</span>
                </button>
                <button v-show="!show1" class="code1">
                    <span class="auth_text_blue">{{ timecount1 }}</span> 秒后重发
                </button>
            </div>

            <div class="submitAll">
                <button class="submit" type="submit" @click="surebindphone">确认</button>
                <button class="submit" type="submit" @click="bindnone">取消</button>
            </div>
        </div>
        <!--邮箱部分-->
        <div class="cont">
            <span>绑定邮箱</span>
            <div class="email" @click="openemaile">
                <span>{{ email }}</span>
                <i class="fa fa-angle-right fa-2" aria-hidden="true"></i>
            </div>
        </div>
        <!-- 弹框邮箱 -->
        <div class="dlog" v-if="showModel"></div>
        <div class="mask" v-if="showModel">
            <div class="email">
                <input type="email" placeholder="请输入邮箱" v-model="email" />
            </div>
            <div class="number">
                <input type="number" placeholder="请输入验证码" v-model="number" />
                <button v-show="show" class="code" @click="getemail">
                    <span>获取验证码</span>
                </button>
                <button v-show="!show" class="code1">
                    <span class="auth_text_blue">{{ timecount }}</span> 秒后重发
                </button>
            </div>
            <div class="submitAll">
                <button class="submit" type="submit" @click="sureemail">确认</button>
                <button class="submit" type="submit" @click="emailnone">取消</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Header from "../../components/common/header/header.vue";
import axios from "axios";
import $ from 'jquery'
import {
    personal,
    myEmail,
    myphone,
    Myavatar
} from "../../network/changeInfo";
import {
    connect
} from 'tls';

export default {
    components: {
        Header,
    },
    props: {},
    data() {
        return {
            info: {},
            emailshow: "",
            showModel: false,
            nickname: false,
            phone: "",
            email: "", //邮箱
            number: "", //验证码
            show: true, //显示
            timecount: 59, //60秒
            phoneModel: false, //手机弹框是否显示
            bind: false, //弹框
            bindphone: "", //输入手机号
            timecount1: 59,
            show1: true,

        };
    },
    methods: {
        // 更换头像
        change(e) {
            this.$el.querySelector(".hiddenInput").click();
        },
        // 将头像显示
        handleFile(evn) {
            // let $target = e.target || e.srcElement
            // let file = $target.files[0]
            let that = this;
            var name = event.target.files[0].name; //获取上传的文件名
            var divObj = $(evn).prev(); //获取div的DOM对象
            $(divObj).html(name); //插入文件名
            var file = event.target.files[0];
            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                //监听文件读取结束后事件
                reader.onloadend = function (e) {
                    $("#" + 1).attr("src", e.target.result);
                    that.$store.commit("avatar", e.target.result);
                    // that.info.url = e.target.result;
                    console.log(typeof (e.target.result))
                    axios({
                        url: "http://116.62.181.150/api/sms/SaveBinary",
                        method: "post",
                        params: {
                            uid: that.$store.state.uid,
                            filePath: e.target.result

                        },
                    }).then(res => {
                        console.log(res)
                    })
                };
            }
        },
        // 打开绑定邮箱弹框
        openemaile() {
            this.number = '',
                this.showModel = !this.showModel
        },
        //邮箱点击验证码 判断邮箱是否正确
        getemail() {
            if (
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
                    this.email
                )
            ) {
                axios({
                        // 发送邮箱验证码
                        url: "http://www.wwyyyy.shop/api/sms/Email",
                        method: "post",
                        params: {
                            email: this.email,
                        },
                    })
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(function (err) {});
                this.show = false;
                this.number = ""
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
                this.$layer.msg("邮箱格式错误", {
                    icon: 16,
                    shade: 0.3,
                    time: false,
                });
            }
        },
        //邮箱点击确定
        sureemail() {
            if (this.email != "" && this.number != "") {
                // this.$store.commit('email', this.email)
                // 校验邮箱和验证码
                axios({
                        url: "http://www.wwyyyy.shop/api/sms/CodeCheck",
                        method: "post",
                        params: {
                            number: this.number
                        },
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data == true) {
                            // 绑定邮箱
                            axios({
                                    url: "http://www.wwyyyy.shop/api/users/UpdataEmail",
                                    method: "post",
                                    params: {
                                        ID: this.$store.state.uid,
                                        email: this.email
                                    },
                                })
                                .then(res => {
                                    console.log(res);
                                    if (res.data.msg == "绑定邮箱账号成功") {
                                        this.$layer.msg("绑定成功", {
                                            icon: 16,
                                            shade: 0.3,
                                            time: false,
                                        });
                                        this.email = res.data.email
                                        this.$store.commit("email", this.email);
                                    } else {
                                        this.$layer.msg("已解绑", {
                                            icon: 16,
                                            shade: 0.3,
                                            time: false,
                                        });
                                        this.email = '未绑定'
                                        this.$store.commit('email', this.email)
                                    }

                                })
                            this.showModel = !this.showModel
                        }
                    })
                    .catch(function (err) {});

            } else
                this.$layer.msg("邮箱或验证码为空", {
                    icon: 16,
                    shade: 0.3,
                    time: false,
                });
        },
        //邮箱取消
        emailnone() {
            this.showModel = false;
            this.number = "";
            this.show = true;
        },
        // 绑定邮箱弹框
        open() {
            this.phoneModel = !this.phoneModel,
                this.number = "",
                this.show = true
        },
        //手机点击验证码 判断手机号是否正确
        getphone() {
            if (/^1[3456789]\d{9}$/.test(this.phone)) {
                axios({
                        url: "http://www.wwyyyy.shop/api/sms/Sendmsg",
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
                        url: "http://www.wwyyyy.shop/api/sms/CodeCheck",
                        method: "post",
                        params: {
                            number: this.number
                        },
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data == true) {
                            axios({
                                    url: "http://www.wwyyyy.shop/api/users/Updataphone",
                                    method: "post",
                                    params: {
                                        ID: this.$store.state.uid,
                                        phone: this.phone
                                    },
                                })
                                .then(res => {
                                    console.log(res.data);
                                    if (res.data.msg == '解绑手机号成功！') {
                                        this.phone = res.data.phone
                                        this.$store.commit("phone", this.phone);
                                        this.$layer.msg("解绑成功", {
                                            icon: 16,
                                            shade: 0.3,
                                            time: false,
                                        });
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
        //点击取消
        none() {
            this.phoneModel = !this.phoneModel;
            this.show = true;
            this.number = "";
        },
        // 绑定手机号
        getbindphone() {
            if (/^1[3456789]\d{9}$/.test(this.bindphone)) {
                axios({
                        url: "http://www.wwyyyy.shop/api/sms/Sendmsg",
                        method: "post",
                        params: {
                            PhoneNumbers: this.bindphone,
                        },
                    })
                    .then(function (res) {
                        console.log(res)
                    })
                    .catch(function (err) {});
                this.show1 = !this.show1;
                this.timecount = 59;
                var auth_timetimer = setInterval(() => {
                    this.timecount--;
                    if (this.timecount <= 0) {
                        this.show1 = true;
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
        // 确定更换手机号
        surebindphone() {
            if (this.bindphone != "" && this.number != "") {
                // this.$store.commit("phone", this.phone);
                axios({
                        url: "http://www.wwyyyy.shop/api/sms/CodeCheck",
                        method: "post",
                        params: {
                            number: this.number
                        },
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data == true) {
                            axios({
                                    url: "http://www.wwyyyy.shop/api/users/Updataphone",
                                    method: "post",
                                    params: {
                                        ID: this.$store.state.uid,
                                        phone: this.bindphone
                                    },
                                })
                                .then(res => {
                                    console.log(res.data);
                                    if (res.data.msg == '绑定成功') {
                                        this.$layer.msg("绑定成功", {
                                            icon: 16,
                                            shade: 0.3,
                                            time: false,
                                        });
                                        this.bindphone = res.data.phone
                                        this.$store.commit("phone", this.bindphone);
                                        this.bind = !this.bind
                                    }
                                })
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
        bindnone() {
            this.bind = !this.bind
            this.bindphone = ""
            this.number = ''
        },
        //头部返回到上一级
        back() {
            this.$router.go(-1);
        },

        // 更改昵称
        determine() {
            this.nickname = !this.nickname;
            axios({
                url: "http://www.wwyyyy.shop/api/users/UpdataName",
                method: "post",
                params: {
                    id: this.$store.state.uid,
                    nickname: this.info.nickname,
                },
            }).then((response) => {
                console.log(response);
                if ((response.data.msg = 0)) {
                    this.$layer.msg("修改成功", {
                        icon: 16,
                        shade: 0.3,
                        time: false,
                    });
                }
            });
        },
        // qq授权
        qq() {
            if (QC.Login.check()) {
                QC.Login.getMe(function (openId, accessToken) {
                    console.log(accessToken)
                    let access_token = accessToken
                    axios({
                        url: 'http://116.62.181.150/api/users/QCLogin',
                        method: 'post',
                        params: {
                            access_token: accessToken
                        }
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.res = true) {
                            // window.location.href = "http://192.168.0.91:8080/bind"
                        }
                    })
                });
            }
        }
    },
    created() {
        // 个人信息
        personal(this.$store.state.uid).then((res) => {
            // console.log(res);
            this.info = res.data.BModel;
        });
        (this.phone = this.$store.state.phone),
        (this.email = this.$store.state.email);
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

.all .cont {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 45px;
    align-items: center;
}

.img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

i {
    padding-left: 13px;
    font-size: 23px;
}

.info {
    border-bottom: 5px solid #f6f6f6;
}

.cont {
    border-top: 2px solid #f8f8f8;
}

.bind {
    border-bottom: 2px solid #f8f8f8;
}

/* 弹框 */
.pop {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.nick {
    width: 60vw;
    height: 49vw;
    background-color: #fff;
    position: fixed;
    top: 36%;
    left: 16%;
    z-index: 2;
    padding: 4vw 15vw;
    border-radius: 5px;
    color: #000;
    margin: 2vw 7.4vw;
    padding: 0;
    overflow: hidden;
}

.nick>img {
    float: right;
}

.nick>p {
    margin: 0;
    margin-bottom: 6vw;
    font-size: 14px;
    margin-top: 6vw;
    text-align: center;
}

.nick>input {
    width: 33.1vw;
    display: block;
    height: 5.5vw;
    margin: 8vw auto;
    font-size: 12px;
    text-align: center;
}

.nick>button {
    width: 33.1vw;
    height: 7vw;
    background-color: rgba(51, 153, 255, 1);
    border: none;
    color: #fff;
    margin-left: 13vw;
}

/* 弹框 */
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

.submitAll {
    display: flex;
    justify-content: space-around;
}

.mask {
    text-align: center;
    width: 90%;
    /* height: 49vw; */
    background-color: #fff;
    position: fixed;
    top: 32%;
    /* left: 4%; */
    right: 2%;
    z-index: 2;
    /* padding: 4vw 15vw; */
    border-radius: 5px;
    color: #000;
    /* margin: 2vw 7.4vw; */
    padding: 0;
    overflow: hidden;
    padding: 20px 10px;
}

.email input {
    width: 306px;
    height: 38px;
    border-radius: 5px;
    text-indent: 1em;
}

.number {
    margin-top: 38px;
}

.number input {
    width: 207px;
    height: 38px;
    border-radius: 5px;
    text-indent: 1em;
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

.number .btn {
    margin-left: 15px;
    width: 113px;
    height: 40px;
    border-radius: 5px;
    background-color: #169bd5;
    border: none;
}

.submit {
    width: 40%;
    height: 42px;
    color: #fff;
    font-size: 18px;
    background-color: #169bd5;
    border: none;
    margin-top: 38px;
    border-radius: 10px;
}

.submit:last-child {
    /* margin-right: 10px; */
    background: #c4c1c1;
    /* color: #000; */
}
</style>

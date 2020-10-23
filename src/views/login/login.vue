<template>
<div class="all">
    <top style="position: absolute; top: 0; width: 100%; color: #fff">
        <span slot="center">登陆</span>
    </top>
    <div class="inp_txt">
        <input type="text" placeholder="账号" v-model="account" />
    </div>
    <div class="inp_txt">
        <input type="password" placeholder="请输入密码" v-model="pwd" />
    </div>
    <div class="btn">
        <p @click="register()">注册</p>
        <p @click="forgetPwd()">忘记密码</p>
    </div>
    <button class="submit" @click="jump()">登陆</button>
    <div class="third">
        <p>第三方账号登陆</p>
        <i class="fa fa-weixin" aria-hidden="true"></i>
        <span id="qqLoginBtn"></span>
    </div>
</div>
</template>

<script>
import top from "../../components/common/header/top.vue";
import axios from 'axios'
import {
    Login,
    qqlogin
} from "../../network/login";
export default {
    components: {
        top,
    },
    props: "",
    data() {
        return {
            account: "", //账号
            pwd: "", //密码v-on:blur="blur"
            url: '', //头像
            nickname: '', //昵称
            player: '', //玩家id
        };
    },
    methods: {
        // 登陆
        jump() {
            if (
                /^1[3456789]\d{9}$/.test(this.account) ||
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
                    this.account
                )
            ) {
                let params = {
                    account: this.account,
                    pwd: this.pwd,
                };
                Login(params).then((res) => {
                    // console.log(res);
                    // 跳转到游戏中心
                    if ((res.data.result = true)) {
                        this.$store.commit("inCread", res.data.model.id);
                        this.$store.commit("phone", res.data.phone);
                        this.$store.commit("avatar", res.data.model.url);
                        this.$store.commit("email", res.data.email);
                        this.$router.push("/accountNum");
                        this.$layer.msg("登陆成功", {
                            icon: 16,
                            // shade: 0.3,
                            time: false,
                        });
                    } else {
                        this.$layer.msg("该账号未注册", {
                            icon: 16,
                            // shade: 0.3,
                            time: false,
                        });
                    }
                });
            } else if (this.account == "" && this.pwd == "") {
                this.$layer.msg("账号或密码不能为空", {
                    icon: 16,
                    // shade: 0.3,
                    time: false,
                });
            } else {
                this.$layer.msg("手机号或邮箱格式错误", {
                    icon: 16,
                    // shade: 0.3,
                    time: false,
                });
            }
        },
        register() {
            this.$router.push("/register");
        },
        forgetPwd() {
            if (this.account == "") {
                this.$router.push({
                    name: "forgetPwd",
                    params: {
                        account: this.account,
                    },
                });
            } else {
                this.$router.push({
                    name: "forgetPwd",
                    params: {
                        account: this.account,
                    },
                });
            }
        },

    },
    created() {
        let that = this
        // QC.Login.check()
        QC.Login({
                btnId: "qqLoginBtn", //插入按钮的节点id
                //用户需要确认的scope授权项，可选，默认all
                scope: "all",
                //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
                size: "C_S",
            },
            function (reqData, opts) {
                QC.Login.getMe(function (openId, accessToken) {
                    console.log(openId)
                    let access_token = accessToken
                    axios({
                        url: 'http://116.62.181.150/api/users/QCLogin',
                        method: 'post',
                        params: {
                            access_token: accessToken
                        }
                    }).then(res => {
                        console.log(res)
                        that.$store.commit('avatar', res.data.users.url)
                        that.$store.commit('nickname', res.data.users.nickname)
                        that.$store.commit('player', res.data.users.player)
                        if (res.data.res = true) {
                            let {
                                href
                            } = that.$router.resolve({
                                path: 'bind',
                                query: {
                                    a: 1
                                }
                            })
                            window.open(href, '_blank')
                            window.close('http://192.168.0.91:8080/login')
                        }
                    })
                })
            },
        )
    },
};
</script>

<style scoped>
.all {
    background: url("../../assets/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
    /* background-repeat: repeat-x; */
    padding-top: 45vw;
    width: 100%;
}

.all .inp_txt {
    margin: 0 67px;
    padding-bottom: 33px;
    text-align: center;
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
}

.all .inp_txt img {
    position: relative;
    top: -30px;
    left: 208px;
}

.all .btn {
    display: flex;
    justify-content: space-around;
    padding-bottom: 5vw;
}

.all .btn p {
    border: none;
    width: 118px;
    height: 34px;
    border-radius: 10px;
    margin: 0 61px;
    color: #fff;
}

.all .submit {
    /* width: 56%; */
    width: 55.9vw;
    border: none;
    height: 6.78vw;
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
    margin: 0 auto;
    margin-bottom: 60px;
}

.all .third {
    border-top: 0.39vw solid #fff;
    width: 95%;
    margin: 0 auto;
    padding-bottom: 36vw;
    text-align: center;
}

.all .third p {
    margin-bottom: 10vw;
    margin-top: 5vw;
    color: #fff;
}

.all .third i {
    font-size: 6vw;
    color: #fff;
    margin: 0 auto;
    text-align: center;
    letter-spacing: 1em;
}
</style>

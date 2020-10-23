<template>
<div class="all" style="height: 750px;">
    <top style="position: absolute;top:0;width:100%">
        <span slot="center">重置密码</span>
        <img src="@/assets/img/jt.png" slot="left" @click="goback" style="width: 20px;float: left;  margin-top: 6vw; margin-left: 4vw;" />
    </top>
    <div class="inp_txt">
        <span>密&nbsp;&nbsp;&nbsp;码：</span>
        <input type="password" placeholder="请输入密码" v-model="pwd">
    </div>
    <div class="inp_txt" style="margin-left: 4px;">
        <span>确认密码：</span>
        <input type="password" placeholder="请确认密码" v-model="repwd">
    </div>

    <button class="submit" @click="login()">确定</button>
</div>
</template>

<script>
import top from '@/components/common/header/top.vue'
import {
    repwd
} from '@/network/repwd'
export default {
    components: {
        top
    },
    props: {},
    data() {
        return {
            show: true, //显示
            timecount: 59, //60秒
            pwd: '',
            repwd: '',
        }
    },
    methods: {
        // 登陆
        login() {
            if (this.pwd == this.repwd) {
                let account = this.$route.params.account;
                let phone = this.$route.params.phone;
                let pwd = this.pwd
                // console.log(account, phone, pwd)
                repwd(account, phone, pwd).then(res => {
                    console.log(res.data)
                    if (res.data.msg == 0) {
                        this.$layer.msg("修改成功", {
                            icon: 16,
                            // shade: 0.3,
                            time: false,
                        });
                        this.$router.push('/login')
                    } else {
                        this.$layer.msg("修改失败", {
                            icon: 16,
                            // shade: 0.3,
                            time: false,
                        });
                    }
                })
            } else {
                this.$layer.msg("密码不一致，请重新输入", {
                    icon: 16,
                    // shade: 0.3,
                    time: false,
                });
            }

        },
        goback() {
            this.$router.go(-1);
        }
    },
}
</script>

<style scoped>
.all {
    background: url('../../assets/img/bg.jpg') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    padding-top: 35vw;
    text-align: center;
}

.all .inp_txt {
    text-align: center;
    padding-bottom: 5vw;
    margin-left: 22px;
}

.all .inp_txt input {
    height: 9vw;
    width: 227px;
    text-indent: 0.5em;
    outline: none
}

.all .btn {
    border: none;
    padding-bottom: 5vw;
}

.all .btn button {
    background: #409EFF;
    color: #fff;
    border: none;
    width: 20%;
    line-height: 200%;
    border-radius: 10%;
    margin: 0 8vw;

}

.all .submit {
    margin: 0 auto;
    text-align: center;
    width: 44%;
    height: 6%;
    line-height: 10vw;
    border-radius: 3vw;
    background-color: #39b2ff;
    margin-bottom: 56vw;
    margin-top: 37px;
    color: #fff;
    font-size: 16px;
    border: none;
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
    font-size: 7vw;
    padding: 0 10vw;
    color: #666;
}
</style>

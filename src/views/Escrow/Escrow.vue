<template>
<div class="Eboth">
    <img src="@/assets/img/background.jpg" alt />
    <!-- 头部 -->
    <div class="title">
        <Header>
            <span slot="left">
                <i @click="back()" class="fa fa-angle-left" aria-hidden="true"></i>
            </span>
            <span slot="center">付款详情</span>
        </Header>
    </div>
    <!-- 付款详情 -->
    <div class="money">
        <div class="money-first">
            <p class="info">您要购买的商品</p>
            <p>游戏名称：{{gamename}}</p>
            <p>游戏大区：{{flash}}</p>
            <p>游戏角色：{{name}}</p>
        </div>
        <p>
            <span>价格：￥{{money}}</span>
        </p>
        <hr />
        <div class="money-last">
            <p>付款方式</p>
            <p>{{payment}}</p>
        </div>
    </div>
    <!-- 按钮 -->
    <div class="button">
        <button @click="now">立即付款</button>
        <button @click="goOff">取消</button>
    </div>
</div>
</template>

<script>
import Header from "@/components/common/header/header.vue";
import {
    aplay,
    chat
} from '../../network/payment'
export default {
    components: {
        Header,
    },
    props: {},
    data() {
        return {};
    },
    methods: {
        // 点击返回上一页
        back() {
            this.$router.go(-1);
        },
        // 立即付款
        now() {
            if (this.payment == "支付宝") {
                // 支付宝支付
                let params = {
                    money: this.money,
                    gamename: this.gamename,
                    flash: this.falsh,
                    name: this.name
                }
                pay(params).then(res => {
                    console.log(res)
                    //支付宝支付
                    // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
                    const div = document.createElement("div");
                    div.innerHTML = res.data;
                    document.body.appendChild(div);
                    document.forms.alipaysubmit.submit();
                })
            }
            // 微信支付
            else if (this.payment == "微信") {
                let params = {
                    money: this.money,
                    gamename: this.gamename,
                    flash: this.falsh,
                    name: this.name
                }
                chat(params).then(res => {
                    console.log(res)

                })
            }
            // this.$router.push("/Ingame").catch((err) => {
            //     err;
            // });
            var tishi = this.$layer.msg("加载中..", {
                icon: 16,
                shade: 0.3,
                time: false,
            });
        },
        goOff() {
            this.$router.go(-1);
        }
    },
    created() {
        this.money = this.$route.params.money,
            this.gamename = this.$route.params.gamename,
            this.flash = this.$route.params.flash,
            this.name = this.$route.params.name,
            this.payment = this.$route.params.payment
    },
};
</script>

<style scoped>
.title {
    width: 100%;
    background: none;
    color: #000;
    font-size: 14px;

}

.title i {
    float: left;
    margin-left: -133px;
}

.Eboth {
    height: 177vw;
}

.Eboth>img {
    width: 100vw;
    height: 100vw;
    opacity: 0.6;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

hr {
    border: none;
    border-bottom: 0.5px solid #e7e7e7;
}

.money-first {
    margin-top: 20px;
}

.money-first .info {
    text-align: center;
    margin-left: 0
}

.money-first p {
    margin-left: 88px;
    line-height: 35px;
}

.money-last {
    display: flex;
    justify-content: space-between;
    margin: 0 111px;
}

.money {
    margin-bottom: 7vw;
}

.money>p {
    font-size: 20px;
    margin-top: 7vw;
    margin-bottom: 10vw;
    text-align: center
}

.money>p>span {
    font-size: 18px;
}

/* button */
.button {
    text-align: center;
}

.button>button:first-child {
    width: 40vw;
    height: 10vw;
    background: #1f91e7;
    color: #fff;
    border: none;
    margin-right: 5vw;
}

.button>button:last-child {
    width: 40vw;
    height: 10vw;
    background: #e9e8e8;
    color: #000;
    border: none;
}
</style>

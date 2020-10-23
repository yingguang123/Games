<template>
<div>
    <Header>
        <span slot="left">
            <i style="margin-left:-234px;font-size:35px" @click="back()" class="fa fa-angle-left" aria-hidden="true"></i>
        </span>
    </Header>
    <div class="both">
        <img src="@/assets/img/u14.png" alt />
        <div class="button" @click="showModel=true">
            <button>支付</button>
        </div>
        <!-- 弹框 -->
        <div class="mask" v-if='showModel' @click="showModel=false"> </div>
        <div class="content" v-if='showModel'>
            <p>请选择支付方式</p>
            <img src="@/assets/img/zfb.png" alt="" @click="aplay">
            <img src="@/assets/img/wx.png" alt="" @click="chat">
        </div>
    </div>
</div>
</template>

<script>
import Header from "@/components/common/header/header.vue";
export default {
    components: {
        Header
    },
    props: {},
    data() {
        return {
            showModel: false,
            money: "", //金额
            gamename: "",
            flash: "",
            name: "",
        };
    },
    methods: {
        back() {
            this.$router.push('/GameCenter').catch(err => {
                err
            })
        },
        //点击支付
        // 支付宝
        aplay() {
            this.$router.push({
                name: 'Escrow',
                params: {
                    money: this.money,
                    gamename: this.gamename,
                    flash: this.flash,
                    name: this.name,
                    payment: '支付宝'

                }
            })
        },
        // 微信
        chat() {
            this.$router.push({
                name: 'Escrow',
                params: {
                    money: this.money,
                    gamename: this.gamename,
                    flash: this.flash,
                    name: this.name,
                    payment: '微信'
                }
            })
        }
    },
};
</script>

<style scoped>
.both>img {
    width: 100vw;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
}

.button>button {
    width: 28.6vw;
    height: 8.3vw;
    background-color: rgba(255, 102, 0, 1);
    border: none;
    position: fixed;
    top: 160vw;
    left: 35vw;
    color: #fff;
    border-radius: 5px;
}

/* 弹框 */
.mask {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.content {
    background-color: #fff;
    position: fixed;
    top: 36%;
    left: 23%;
    z-index: 2;
    padding: 4vw 15vw;
    border-radius: 5px;
}

.content>img {
    width: 53px;
}

.content>p {
    margin: 0;
    margin-bottom: 6vw;
}

.content>img:last-child {
    margin-left: 6vw;
}
</style>

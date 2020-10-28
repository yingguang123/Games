<template>
<div class="Eboth">
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
            <p>商品名称：{{tradename}}</p>
            <p>游戏名称：{{gamename}}</p>
            <p>游戏大区：{{area}}</p>
            <p>游戏角色：{{role}}</p>
        </div>
        <p>
            <span>价格：￥{{money}}</span>
        </p>
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
import Header from "../../components/common/header/header.vue";
import $ from 'jquery'
import axios from 'axios'
import {
    aplay,
    chat,

} from '../../network/payment'
import {
    goodsinfo,
    add
} from '../../network/zero'
export default {
    components: {
        Header,
    },
    props: {},
    data() {
        return {
            gamename: '',
            flash: '',
            money: '',
            role: '',
            pay: false,
            payment: '',
            areaid: '',
            tradename: '',
            oid: ''
        };
    },
    methods: {

        // 点击返回上一页
        back() {
            this.$router.go(-1);
        },
        // 立即付款
        now() {
            if (this.payment == "支付宝") {
                aplay(this.oid, 'http://localhost:8080/record').then(res => {
                    console.log(res)
                    //支付宝支付
                    //添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
                    const div = document.createElement("div");
                    div.innerHTML = res.data;
                    document.body.appendChild(div);
                    document.forms.alipaysubmit.submit();
                })
            }
        },
        goOff() {
            this.$router.push('/GameCenter')
        }

    },
    created() {
        this.money = this.$route.params.money,
            this.gamename = this.$route.params.gamename,
            this.area = this.$route.params.area,
            this.role = this.$route.params.role,
            this.payment = this.$route.params.payment,
            this.gid = this.$route.params.gid,
            this.aid = this.$route.params.aid,
            this.roleid = this.$route.params.roleid
        this.tradename = this.$route.params.tradename
    },
    mounted() {
        // 添加商品信息
        axios({
            url: "http://www.wwyyyy.shop/api/transaction/insert",
            method: "post",
            params: {
                gid: this.gid, //游戏id
                uid: this.$store.state.uid, //玩家ID
                roleid: this.roleid, //角色名id
                tradename: this.tradename, //商品名称
                paymentmethod: 2, //支付方式
                money: this.money, //价钱
                aid: this.aid, //大区id
                order: 2, //未支付状态
            }
        }).then(res => {
            console.log(res)
            this.oid = res.data.model.id
        })
    },
};
</script>

<style scoped>
.title {
    width: 100%;
    background: none;
    color: #000;
}

.title i {
    float: left;
    margin-left: -133px;
}

.Eboth {
    height: 177vw;
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

/*弹框 */
.one {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

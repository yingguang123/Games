<template>
<div>
    <div class="con" style="background-color: #f2f2f2;">
        <div class="info" v-for="item in orderList" :key="item.id">
            <div class="order">
                <p>{{item.tradename.tradename}}</p>
                <span v-if="item.order==2">待支付</span>
                <span v-else-if="item.order==1">交易成功</span>
                <span v-else>交易失败</span>
            </div>
            <div class="commodity1">
                <div class="pic">
                    <img :src="'http://www.wwyyyy.shop/'+item.locn.locn" alt="">
                </div>
                <div class="game">
                    <p>{{item.gamename.gamename}}</p>
                    <p class="time">{{item.createtime.createtime | formatDate}}</p>
                </div>
                <div class="price">
                    <p>¥<span>{{item.amount.amount}}</span></p>
                </div>
            </div>
            <div class="btn" v-if="item.order==2==show">
                <button @click="payment" v-if="item.orders==2">立即支付</button>
                <!-- <button @click="del(item)">删除</button> -->
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    delOrder
} from '../../../network/record'
export default {
    components: {},
    props: {
        orderList: Array
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        // 立即支付
        payment() {
            // axios({
            //     method: 'post',
            //     url: 'http://116.62.181.150/api/transaction/ZFmoney',
            //     params: {
            //         money: this.money, //价钱
            //         bodyes: this.tradename, //商品名称
            //         paymentmethod: 1, //支付方式
            //         sub: "充值"
            //     },
            // }).then((res) => {
            //     //支付宝支付
            //     // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
            //     const div = document.createElement("div");
            //     div.innerHTML = res.data.detail;
            //     document.body.appendChild(div);
            //     document.forms[0].submit();
            // })
        }
    },
    mounted() {

    },
    filters: {
        formatDate: function (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    },
    created() {

    },
}
</script>

<style scoped>
</style>

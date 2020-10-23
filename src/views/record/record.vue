<template>
<div>
    <div class="title">
        <Header>
            <span slot="left">
                <i @click="back()" class="fa fa-angle-left" aria-hidden="true"></i>
            </span>
            <span slot="center">交易记录</span>
        </Header>
    </div>
    <record :orderList="order"></record>

</div>
</template>

<script>
import Header from '../../components/common/header/header.vue'
import record from '../../components/content/record/record.vue'
import axios from 'axios'
import "@/views/record/record.css";
import {
    Order
} from '../../network/record'
export default {
    components: {
        Header,
        record
    },
    props: {},
    data() {
        return {
            order: [],

        }
    },
    methods: {
        back() {
            this.$router.push('/mine')
        },
    },
    created() {
        axios({
            method: "post",
            url: "http://www.wwyyyy.shop/api/transaction/InsertModel",
            params: {
                uid: this.$store.state.uid
            }
        }).then(res => {
            console.log(res.data)
            this.order = res.data.model
        })
    },
}
</script>

<style scoped>
</style>

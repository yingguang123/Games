<template>
<div>
    <div class="header">
        <Header>
            <span slot="left">
                <img src="@/assets/img/jt.png" alt="" @click="back()">
            </span>
            <span slot="center">实名认证</span>
        </Header>
    </div>
    <div class="content">
        <p class="tips">请确认是您本人操作，验证通过后不可修改！</p>
        <div class="info">
            <div class="info_name">
                <p class="name">姓名</p>
                <input type="text" placeholder="请输入真实姓名" v-model="name">
            </div>
        </div>
        <div class="info">
            <div class="info_name">
                <p class="name">证件类型</p>
                <p>身份证</p>
            </div>
        </div>
        <div class="info">
            <div class="info_name">
                <p class="name">证件号</p>
                <input type="text" placeholder="请输入证件号码" v-model="IDcard" pattern="^([0-9]){7,18}(x|X)?$">
            </div>
        </div>
    </div>
    <div class="icon" @click="code">
        <button type="sumbit">验证信息</button>
    </div>

</div>
</template>

<script>
import Header from '@/components/common/header/header.vue'
import {
    real
} from '@/network/realName'
import axios from 'axios'
export default {
    components: {
        Header
    },
    props: {},
    data() {
        return {
            name: '', //姓名
            IDcard: '', //证件号
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        code() {
            // var res = "^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$"

            axios({
                method: 'post',
                url: 'http://www.wwyyyy.shop/api/users/UserRealID',
                params: {
                    idnumber: this.IDcard,
                    name: this.name,
                    id: this.$store.state.uid
                }
            }).then(res => {
                console.log(res)
                if (res.data.res = true) {

                    this.$router.push('/GameCenter')
                }
            })

        }
    },
}
</script>

<style scoped>
.header {
    background-color: #74c2cc;
}

.header span img {
    position: absolute;
    left: 5%;
}

.header span:last-child {
    color: #fff;
}

.tips {
    color: #999;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 20px;
    margin-bottom: 108px;
}

.info {
    margin: 0 20px;
}

.info .info_name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    border-bottom: 2px solid #e0e0e0;
}

.info .info_name .name {
    font-size: 16px;
    color: #333;
}

.info .info_name>input {
    width: 74%;
    border: none;
    outline: none;
}

.info .info_name>p:last-child {
    width: 74%;
}

.icon {
    margin: 66px 10% 0;
}

.icon button {
    width: 100%;
    height: 47px;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: #74c2cc;
    color: #fff;
    font-size: 18px;
}
</style>

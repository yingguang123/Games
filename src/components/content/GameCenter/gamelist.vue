<template>
<div>
    <div class="gameslist">
        <div class="list" v-for="item in gameList" :key="item.id">
            <div class="con">
                <img :src="'http://116.62.181.150/'+item.locn" alt="">
                <div class="cent">
                    <p class="name">{{item.gamename}}<span>{{item.score}}分</span></p>
                    <p class="pro">游戏简介：<span>{{item.brief}}</span></p>
                </div>
                <button class="action" @click="btn(item)">开始</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        gameList: Array
    },
    data() {
        return {}
    },
    methods: {
        // 游戏
        btn(item) {
            // console.log(item)
            // 跳转到详情页
            this.$router.push('/detail/' + item.id).catch(data => {})

        },
    },
}
</script>

<style scoped>
</style>

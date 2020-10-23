<template>
<div>
    <div class="tax">
        <div class="game" v-for="item in collect" :key="item[0]">
            <div class="font">
                <img :src="'http://116.62.181.150/'+item.locn" alt="">
            </div>
            <div class="cent">
                <p class="name">{{item.gamename}}</p>

            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        collect: Array
    },
    data() {
        return {}
    },
}
</script>

<style scoped>
@import '../../../views/mine/mine.css';

.pro {
    font-size: 12px;
}

.cent {
    display: inline-block;
}

.name span {
    padding-left: 10px;
}
</style>

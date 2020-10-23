<template>
<div>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='el in bannerList' :key="el.id">
                <img :src="el.url" alt="" class="banner">
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {

    },
    props: {
        bannerList: Array
    },
    data() {
        return {}
    },
}
</script>

<style scoped>
.banner {
    width: 100%
}
</style>

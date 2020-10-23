<template>
<div id="app">
    <router-view />
    <tabbar v-if="$route.meta.showTab">
        <tabbar-item path="/GameCenter">
            <div slot="text">首页</div>
            <img slot="default" src="./assets/img/home.png" alt="">
            <img slot="active" src="./assets/img/home1.png" alt="">
        </tabbar-item>
        <tabbar-item path="/mine">
            <div slot="text">我的</div>
            <img slot="default" src="./assets/img/mine.png" alt="">
            <img slot="active" src="./assets/img/mine1.png" alt="">
        </tabbar-item>
    </tabbar>
</div>
</template>

<script>
import tabbar from './components/tabbar/tabbar'
import tabbarItem from './components/tabbar/tabbar-item'
export default {
    name: 'App',
    data() {
        return {
            isActive: true
        }
    },
    components: {
        tabbar,
        tabbarItem
    }
}
</script>

<style>
@import './assets/css/base.css';

img {
    width: 22px;
}
</style>

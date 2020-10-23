<template>
<div>
    <div class="account" v-for="item in EmailNum" :key="item.id">
        <p>邮箱</p>
        <div class="right">
            <span>{{this.$store.state.email}}</span>
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        EmailNum: Object
    },
    data() {
        return {}
    },
}
</script>

<style scoped>
</style>

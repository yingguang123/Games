<template>
<div>
    <div id="tabbar">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {}
    },
}
</script>

<style scoped>
#tabbar {
    display: flex;
    justify-content: space-around;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    background-color: #ffffff;
    text-align: center;
    height: 55px;
}
</style>

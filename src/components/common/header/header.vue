<template>
<div class="header">
    <div class="left">
        <slot name="left"></slot>
    </div>
    <div class="center">
        <slot name="center"></slot>
    </div>
    <div class="right">
        <slot name="right"></slot>
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
.header {
    text-align: center;
    padding: 5vw 0;
    display: inline-block;
    margin-left: 40vw;
    font-size: 18px;
}
</style>

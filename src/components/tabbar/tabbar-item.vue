<template>
<div class="tabbar-item" @click="myclick">
    <div v-if="!isActive">
        <slot name="default"></slot>
    </div>
    <div v-else>
        <slot name="active"></slot>
    </div>
    <div :class="{active:isActive}">
        <slot name="text"></slot>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        path: String
    },
    methods: {
        myclick() {
            this.$router.push(this.path).catch(data => {})
        },
    },
    computed: {
        isActive() {
            return this.$route.path.indexOf(this.path) !== -1;
        }
    },
}
</script>

<style scoped>

</style>

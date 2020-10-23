<template>
<div>
    <div class="tax">
        <div class="game" @click="into(item)" v-for="item in games" :key="item[0]">
            <div class="font">
                <img :src="'http://116.62.181.150/'+item[2]" alt="">
            </div>
            <p class="name">{{item[1]}}</p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    components: {},
    props: {
        games: Array
    },
    data() {
        return {}
    },
    methods: {
        into(item) {
            console.log(item)
            this.$router.push({
                name: "Ingame",
                params: {
                    id: this.$store.state.uid,
                    gid: item.gid
                }
            })
        }

    },
}
</script>

<style scoped>
@import '../../../views/mine/mine.css'
</style>

<template>
  <div class="top">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.top{
    overflow: hidden;
     border-bottom: 1.5px double #d7d7d7;
    text-align: center;
}
/* left */
.top>img{
        width: 20px;
    float: left;
    margin-top: 6vw;
    margin-left: 5vw;
}
/* center */
.top>span{
    display: inline-block;
padding-top: 5vw;
padding-bottom: 5vw ;
margin: 0 auto;
}

/* right */
.top>input{
 background: #1f91e7;
  color: #fff;
  border: none;
  border-radius: 5px;
  float: right;
   margin-top: 6vw;
    margin-right: 5vw;
}
</style>
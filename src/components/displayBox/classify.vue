<template>
  <div class="rooyb">
    <!-- <h3>classifybox</h3> -->
    <div @click="seeDetail(item.goodid)" v-for="(item,index) in list" :key="index">
      <img :src="item.goodimg" alt />
      <span>{{item.goodname|textLimit}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '小米手机'
    }
  },
  props: {
    list: Array
  },
  filters: {
    textLimit(value) {
      if (value.length >= 10) {
        return value.slice(0, 10) + '...'
      } else {
        return value
      }
    }
  },
  methods: {
    seeDetail(value) {
      this.$router.push(`/good?id=${value}`)
    }
  }
}
</script>

<style lang="less" scoped>
.rooyb {
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.9;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  > div {
    width: 100%;
    height: 100%;
    // background-color: skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 40px;
      height: 40px;
    }
    span {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
</style>

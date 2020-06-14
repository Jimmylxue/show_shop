<template>
  <div class="rootcom">
    <div class="title">
      <img src="../assets/fonts/tuijian.png" alt />
      <span>为您推荐</span>
    </div>
    <div class="container">
      <div
        v-for="(item,index) in recommand"
        @click="toDetail(item.goodid)"
        :key="index"
        class="good"
      >
        <img :src="item.goodimg" alt />
        <span>{{item.goodname}}</span>
      </div>
      <!-- <div class="good">
        <img src="../assets/goods/recommend/02.jpg" alt />
        <span>HUAWEI MATE 30 5G</span>
      </div>
      <div class="good">
        <img src="../assets/goods/recommend/03.jpg" alt />
        <span>华为畅享10 Plus</span>
      </div>
      <div class="good">
        <img src="../assets/goods/recommend/04.jpg" alt />
        <span>荣耀 FlyPods 3</span>
      </div>
      <div class="good">
        <img src="../assets/goods/recommend/05.jpg" alt />
        <span>iPhone 11 Pro</span>
      </div>
      <div class="good">
        <img src="../assets/goods/recommend/06.jpg" alt />
        <span>iPhone 11</span>
      </div>
      <div class="good">
        <img src="../assets/goods/recommend/07.jpg" alt />
        <span>iPhone SE</span>
      </div>
      <div class="good">
        <img src="../assets/goods/recommend/08.jpg" alt />
        <span>iPhone XR</span>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  async mounted() {
    await this.getGoods('all')
    // console.log('hello')
  },
  computed: {
    ...mapState({ recommand: state => state.good.recommand })
  },
  methods: {
    ...mapActions(['getGoods']),
    toDetail(id) {
      this.$router.push(`/good?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.rootcom {
  width: 100%;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 40px 0;
  img {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  span {
    font-size: 1.5rem;
  }
}
.container {
  width: 100%;
  // height: 200px;
  // border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  .good {
    transition: all 0.3s ease-in-out;
    width: 225px;
    height: 300px;
    background-color: white;
    margin: 0 20px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 180px;
      height: 180px;
      // border: 1px solid #ccc;
    }
    span {
      margin-top: 15px;
      font-size: 1.1rem;
      color: rgb(38, 58, 75);
    }
  }
  .good:hover {
    // border: 1px solid #ccc;
    box-shadow: 10px 10px 10px #ccc, -10px 10px 10px #ccc;
    transform: translateY(-5px);
  }
}
</style>

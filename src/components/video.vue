<template>
  <div class="rootv">
    <h2>产品视频</h2>
    <div class="container">
      <div @click="playVideo" class="good">
        <img src="../assets/video/01.jpg" width="100%" height="100%" alt />
        <span>小米10 发布会</span>
      </div>
      <div class="good">
        <img src="../assets/video/02.jpg" width="100%" height="100%" alt />
        <span>小米10 8K手机 拍大片</span>
      </div>
      <div class="good">
        <img src="../assets/video/03.jpg" width="100%" height="100%" alt />
        <span>小米10青春版 发布会</span>
      </div>
      <div class="good">
        <img src="../assets/video/04.jpg" width="100%" height="100%" alt />
        <span>黑鲨游戏手机2 Pro</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    playVideo() {
      this.$emit('play', true)
    },
  },
}
</script>

<style lang="less" scoped>
.rootv {
  width: 100%;
}
h2 {
  font-weight: normal;
  margin: 20px 0;
}
.container {
  width: 100%;
  // height: 300px;
  // background-color: #2ecc71;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  div {
    transition: all 0.3s ease-in-out;
    width: 355px;
    height: 290px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      height: 200px;
      background-color: rosybrown;
    }
    span {
      margin-top: 25px;
    }
  }
  .good:hover {
    box-shadow: 10px 10px 15px #ccc, -10px 10px 15px #ccc;
    transform: translateY(-5px);
  }
}
</style>

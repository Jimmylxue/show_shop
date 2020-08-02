<template>
  <div class="rootv">
    <div class="firstLine">
      <h2>产品视频</h2>
      <span>
        查看更多
        <i class="el-icon-s-opportunity"></i>
      </span>
    </div>

    <div class="container">
      <div v-for="(item,index) in videoList" :key="index" @click="playVideo(item.url)" class="good">
        <img :src="item.img" width="100%" height="100%" alt />
        <span>{{item.title}}</span>
      </div>
      <!-- <div class="good">
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
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoList: []
    }
  },
  mounted() {
    this.getVideo()
  },
  methods: {
    async getVideo() {
      let res = await this.$api.medium.getVideo()
      this.videoList = res.data
    },
    playVideo(url) {
      this.$store.commit('setVideoUrl', url)
      this.$emit('play', url)
    }
  }
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
  // margin-top: 20px;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
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

.firstLine {
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in-out;
    i {
      margin-left: 5px;
      font-size: 18px;
    }
  }
  > span:hover {
    // font-size: 30px;
    color: #ff6700 !important;
  }
}
</style>

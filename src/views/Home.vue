<template>
  <div class="root">
    <navbar></navbar>
    <toolBar></toolBar>
    <div class="main">
      <comain></comain>
      <hot-sale></hot-sale>
      <advertisement></advertisement>
      <recommend></recommend>
      <myvideo @play="playVideo()"></myvideo>
      <h2 class="endding">已经到底啦~</h2>
    </div>
    <div class="videoContainer">
      <myVideos @closeVideo="closePlay()" v-show="videoFlag"></myVideos>
    </div>
  </div>
</template>

<script>
import navbar from '../components/navbar.vue'
import toolBar from '@/components/navigation/toolBar.vue'
import comain from '@/components/comain.vue'
import HotSale from '@/components/HotSale.vue'
import recommend from '@/components/recommend.vue'
import advertisement from '@/components/advertisement.vue'
import myvideo from '@/components/video'
import myVideos from '@/components/video/myVideo.vue'
export default {
  components: {
    navbar,
    toolBar,
    comain,
    HotSale,
    recommend,
    advertisement,
    myvideo,
    myVideos,
  },
  data() {
    return {
      videoFlag: false,
    }
  },
  methods: {
    playVideo() {
      console.log('aiaiai')
      this.videoFlag = true
    },
    closePlay() {
      alert('closeaa')
      this.videoFlag = false
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  width: 1480px;
  // // height: 200px;
  margin: 0 auto;
  margin-top: 30px;
  .endding {
    font-weight: normal;
    text-align: center;
    padding: 20px 0 50px 0;
  }
  // border: 1px solid #ccc;
}
@media only screen and (max-width: 1540px) {
  header {
    .container {
      // display: none;
      width: 1180px;
    }
  }
  .search {
    .container {
      width: 1180px;
    }
  }
  .main {
    width: 1180px;
  }
}

@media only screen and (max-width: 1180px) {
  header {
    .container {
      // display: none;
      width: 90%;
    }
  }
  .search {
    .container {
      width: 90%;
      .guanggao {
        display: none;
      }
    }
  }
  .main {
    width: 90%;
  }
}
@media only screen and (max-width: 768px) {
  header {
    .container {
      // display: none;
      width: 90%;
    }
  }
  .toolbar {
    display: none;
  }
  .search {
    .container {
      width: 90%;
      // align-items: center;/
      .logo {
        width: 120px;
        height: 50px;
      }
      .searchbar {
        .inputs {
          // width: 90%;
        }
        .links {
          display: none;
        }
      }
      .guanggao {
        display: none;
      }
    }
  }
}
.videoContainer {
  position: fixed;
  top: 0;
  left: 0;
}
</style>

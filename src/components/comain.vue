<template>
  <div class="roots">
    <div class="nav">
      <el-card class="navs">
        <ul>
          <li>
            <a @mouseover="showclassify" @mouseout="noshowclassify" href>电脑/COMPUTER</a>
          </li>
          <li>
            <a @mouseover="showclassify" @mouseout="noshowclassify" href>电视/TV</a>
          </li>
          <li>
            <a @mouseover="showclassify" @mouseout="noshowclassify" href>手机/PHONE</a>
          </li>
          <li>
            <a @mouseover="showclassify" @mouseout="noshowclassify" href>耳机/EARPHONE</a>
          </li>
          <li>
            <a @mouseover="showclassify" @mouseout="noshowclassify" href>手表/WATCH</a>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="lb">
      <div v-show="classifyshow" class="classifybox">
        <classify></classify>
      </div>
      <el-carousel indicator-position="outside" autoplay height="500px">
        <el-carousel-item v-for="item in lburl" :key="item.sliderid">
          <img :src="item.sliderimg" width="100%" height="100%" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mine">
      <el-card class="conts">
        <div class="user">
          <div class="header">
            <img
              :src="header?header:'http://127.0.0.1:666/header/default.png'"
              width="100%"
              height="100%"
              alt
            />
          </div>
          <div class="name">{{name?name:'请登录'}}</div>
        </div>
        <div class="more">
          <div v-for="(item,index) in functionMode" :key="index" class="firstline">
            <img :src="item.img" alt />
            <span>{{item.functionName}}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import classify from './displayBox/classify.vue'
export default {
  data() {
    return {
      classifyshow: false,
      name: '',
      lburl: [],
      functionMode: [],
      header: ''
    }
  },
  mounted() {
    this.header = sessionStorage.getItem('header')
      ? sessionStorage.getItem('header')
      : ''
    this.name = sessionStorage.getItem('user')
      ? sessionStorage.getItem('user')
      : ''

    this.getSlider()
    this.getFunctions()
  },
  components: {
    classify
  },
  methods: {
    showclassify() {
      this.classifyshow = !this.classifyshow
    },
    noshowclassify() {
      this.classifyshow = !this.classifyshow
    },
    async getSlider() {
      let res = await this.$api.medium.getSlider()
      this.lburl = res.data
    },
    async getFunctions() {
      let res = await this.$api.medium.getFunctionMode()
      this.functionMode = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.roots {
  width: 100%;
  display: flex;
}
.nav {
  width: 230px;
  // height: 200px;
  .navs {
    height: 500px;
    ul {
      li {
        text-align: center;
        padding: 10px 0;
        font-weight: bold;
        &:nth-child(1) {
          padding-top: 0;
        }
        a {
          padding: 10px 0;
          color: #000;
          display: block;
          &:hover {
            background-color: rgb(255, 103, 0);
            color: #fff;
          }
        }
      }
    }
  }
}
.lb {
  flex-grow: 1;
  margin: 0 15px;
  position: relative;
  // background-color: sandybrown;
  .classifybox {
    transition: width 0.3s ease-in-out;
    top: 0;
    left: 0;
    position: absolute;
    // background-color: #ff6700;
    width: 100%;
    height: 500px;
    z-index: 55;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
.mine {
  width: 300px;
  // height: 200px;
  .conts {
    height: 500px;
    display: flex;
    flex-direction: column;
    .user {
      width: 100%;
      height: 120px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      .header {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 1rem;
      }
      .name {
        font-size: 1.8rem;
      }
    }
    .more {
      width: 100%;
      // height: 100%;
      // border: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .firstline {
        margin-top: 20px;
      }
      div {
        height: 80px;
        display: flex;
        padding: 5px 10px;
        flex-direction: column;
        // align-items: center;
        text-align: center;
        // margin-top: 8px;
        img {
          width: 45px;
          height: 45px;
        }
        span {
          padding-bottom: 8px;
          padding-top: 5px;
          font-size: 0.9rem;
          color: rgb(42, 48, 56);
        }
        &:hover {
          border: 1px solid #ccc;
          box-shadow: 0 0 5px #ccc;
        }
      }
    }
  }
}

@media only screen and (max-width: 1540px) {
  .roots {
    // width: 1180px;
    display: flex;
    justify-content: center;
  }
  .mine {
    display: none;
  }
}

@media only screen and (max-width: 600px) {
  .roots {
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
  }
  .lb {
    display: none;
  }
  .mine {
    display: flex;
  }
}
</style>

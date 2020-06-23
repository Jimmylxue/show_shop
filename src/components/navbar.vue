<template>
  <div class="root">
    <!-- 导航栏 -->
    <header>
      <div class="container">
        <ul class="links">
          <li>
            <a href>{{ name }}</a>
          </li>
          <li v-show="name === '' ? true : false">
            <a href="/login">登录</a>
          </li>
          <li
            @click="centerDialogVisible = true"
            v-show="name === '' ? false : true"
          >
            <a @click="logout">注销</a>
          </li>
          <li>
            <a href>个人中心</a>
          </li>
          <li>
            <a href>我的订单</a>
          </li>
          <li>
            <a href="/cart">我的购物车</a>
          </li>
        </ul>
      </div>
    </header>
    <!-- 搜素栏 -->
    <div class="nav">
      <el-card class="search">
        <div class="container">
          <div class="logo">
            <img width="100%" height="100%" src="../assets/imgs/logo.jpg" alt />
          </div>
          <div class="searchbar">
            <div class="inputs">
              <input type="text" placeholder="请输入商品信息 如:小米10" />
              <div class="click fa fa-search fa-lg"></div>
            </div>
            <div class="links">
              <ul>
                <li>
                  <a class="check" href>屏幕维修</a>
                </li>
                <li>
                  <a href>电池更换</a>
                </li>
                <li>
                  <a href>iPone 11 Pro Max</a>
                </li>
                <li>
                  <a href>小米 10 Pro</a>
                </li>
                <li>
                  <a href>魅族17</a>
                </li>
                <li>
                  <a href>刷机</a>
                </li>
                <li>
                  <a href>周边</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="guanggao">
            <img src="../assets/imgs/guanggao.jpg" alt />
          </div>
        </div>
      </el-card>
    </div>
    <!-- 主体栏 -->
    <div class="main">
      <comain></comain>
      <hot-sale></hot-sale>
      <advertisement></advertisement>
      <recommend></recommend>
      <myvideo></myvideo>
      <h2 class="endding">已经到底啦~</h2>
    </div>
    <!-- 固定工具栏 -->
    <div class="toolbar">
      <div @click="tomine">
        <i class="fa fa-user-o fa-2x"></i>
        <span>个人中心</span>
      </div>
      <div @click="$router.push('/cart')">
        <i class="fa fa-cart-arrow-down fa-2x"></i>
        <span>购物车</span>
      </div>
      <div class="guanzhu">
        <i class="fa fa-qrcode fa-2x"></i>
        <span>关注</span>
      </div>
      <div class="qrcode">
        <img src="../assets/imgs/qrcode.jpg" alt />
        <span>商业合作</span>
        <span class="last">联系作者</span>
      </div>
      <div>
        <i class="fa fa-comment-o fa-2x"></i>
        <span>人工客服</span>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>确定要退出当前账号吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import comain from '../components/comain.vue'
import HotSale from '../components/HotSale.vue'
import recommend from '../components/recommend.vue'
import advertisement from './advertisement.vue'
import myvideo from './video'

export default {
  components: {
    comain,
    HotSale,
    recommend,
    advertisement,
    myvideo,
  },

  data() {
    return {
      // 弹窗
      centerDialogVisible: false,
      name: '',
    }
  },
  mounted() {
    if (sessionStorage.getItem('user')) {
      this.name = sessionStorage.getItem('user')
    }
  },
  methods: {
    // 注销
    logout() {
      this.centerDialogVisible = false
      this.$router.push('/login')
      this.$message({
        message: '已注销',
        type: 'success',
      })
    },
    // 个人中心
    tomine() {
      if (this.name === '') {
        this.$message({
          message: '您还未登录哦~请先登录。',
          type: 'warning',
        })
        return
      }
      alert('个人中心')
    },
  },
}
</script>

<style lang="less" scoped>
.root {
  // height: 100vh;
  background-color: rgb(248, 248, 248);
  position: relative;
}
.toolbar {
  .qrcode {
    width: 160px;
    // height: 160px;
    background-color: #fff;
    position: absolute;
    right: 110px;
    top: 150px;
    transition: all 0.5s ease-in-out;
    z-index: 6;
    opacity: 0;
    img {
      width: 150px;
      height: 150px;
    }
    span {
      font-size: 1rem;
      margin-top: 0;
    }
    .last {
      margin-bottom: 8px;
    }
    &::after {
      content: '';
      width: 15px;
      height: 15px;
      background-color: #fff;
      position: absolute;
      right: -7px;
      top: 30%;
      border: 1px solid #f5f5f5;
      border-top: 1px solid #f5f5f5;
      border-right: 1px solid #f5f5f5;
      transform: translate(50%, -50%);
      transform: rotate(45deg);
      z-index: -5;
    }
  }
  width: 85px;
  height: 360px;
  // background-color: skyblue;
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  border: 1px solid #f5f5f5;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;
  z-index: 50;
  div {
    flex-grow: 1;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(117, 117, 117);
    span {
      margin-top: 8px;
      font-size: 0.8rem;
    }
    &:last-child {
      border: none;
    }
    &:hover {
      color: rgb(255, 103, 0);
    }
  }
  .guanzhu:hover + .qrcode {
    opacity: 1;
  }
}
header {
  height: 40px;
  background-color: rgb(226, 226, 228);
  display: flex;
  .container {
    display: flex;
    align-items: center;
    width: 1480px;
    height: 40px;
    margin: 0 auto;
    justify-content: flex-end;
    ul {
      display: flex;
      justify-content: flex-end;
      li {
        margin: 0 0.5rem;
        a {
          color: rgb(150, 150, 150);
          &:hover {
            color: #666;
            font-weight: bold;
          }
        }
      }
    }
  }
}
.search {
  .container {
    margin: 0 auto;
    // border: 1px solid #ccc;
    width: 1480px;
    // height: 300px;
    display: flex;
    .logo {
      width: 260px;
      height: 120px;
      // background-color: #2ecc71;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .searchbar {
      flex-grow: 1;
      height: 120px;
      // background-color: #e67e22;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      .inputs {
        width: 90%;
        height: 50px;
        border: 3px solid #e74c3c;
        position: relative;
        margin-top: 15px;
        input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          padding-left: 1rem;
          font-size: 1.1rem;
        }
        .click {
          width: 48px;
          height: 44px;
          background-color: #e74c3c;
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 4px;
          color: white;
        }
      }
      .links {
        width: 90%;
        // margin-bottom: -10px;
        ul {
          // background-color: salmon;
          display: flex;
          padding: 18px 0 0px 0;
          justify-content: space-around;
          li:nth-child(1) > a {
            color: salmon;
          }
          a {
            color: rgb(177, 177, 177);
            &:hover {
              color: salmon;
            }
          }
        }
      }
    }
    .guanggao {
      width: 240px;
      height: 120px;
      // background-color: #9b59b6;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
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
</style>

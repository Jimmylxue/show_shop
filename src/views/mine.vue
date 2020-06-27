<template>
  <div class="rootr">
    <navs></navs>

    <div class="container">
      <div class="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>交易订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="box">
        <div class="aside">
          <div>
            <h3>订单中心</h3>
            <ul>
              <li>
                <!-- <a href>我的订单</a> -->
                <router-link to="/users/order" active-class="isselect">我的订单</router-link>
              </li>
              <li>
                <router-link to="/home">晒单评价</router-link>
              </li>
              <li>
                <router-link to="/home">话费充值订单</router-link>
              </li>
              <li>
                <router-link to="/home">以旧换新订单</router-link>
              </li>
            </ul>
          </div>
          <div>
            <h3>个人中心</h3>
            <ul>
              <li>
                <router-link to="/users/portal" active-class="isselect">我的个人中心</router-link>
              </li>
              <li>
                <a href>现金账户</a>
              </li>
              <li>
                <a href>喜欢的商品</a>
              </li>
              <li>
                <a href>收获地址</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>售后服务</h3>
            <ul>
              <li>
                <a href>服务记录</a>
              </li>
              <li>
                <a href>申请服务</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>账户管理</h3>
            <ul>
              <li>
                <a href>个人信息</a>
              </li>
              <li>
                <a href>修改密码</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="views">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="guanggao">
      <advertisement></advertisement>
    </div>

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
    <footer>
      <h2 class="endding">已经到底啦~</h2>
    </footer>
  </div>
</template>

<script>
import navs from '@/components/top.vue'
import advertisement from '@/components/advertisement.vue'
export default {
  components: {
    navs,
    advertisement
  },
  data() {
    return {
      name: ''
    }
  },
  mounted() {},
  methods: {
    tomine() {}
  }
}
</script>

<style lang="less" scoped>
.rootr {
  background-color: #f5f5f5;
  height: 100%;
}
.container {
  width: 1480px;
  // height: 300px;
  // background-color: skyblue;
  margin: 0 auto;
  margin-top: 20px;
  // display: flex;
  .box {
    width: 100%;
    display: flex;
  }
}
.guanggao {
  width: 1480px;
  margin: 0 auto;
}
.endding {
  font-weight: normal;
  text-align: center;
  padding: 20px 0 50px 0;
}
.header {
  padding: 15px;
}
.aside {
  width: 240px;
  height: 100%;
  // background-color: blueviolet;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 60px 40px 60px;
  box-shadow: 0 0 5px #ccc;
  // align-items: center;
  & > div {
    margin-top: 15px;
    h3 {
      margin-bottom: 20px;
      color: #333;
      font-size: 16px;
    }
    ul {
      li {
        margin-bottom: 15px;
        a {
          color: #757575;
          font-size: 14px;
          &:hover {
            color: #ff6700;
          }
        }
        .isselect {
          color: #ff6700;
        }
      }
    }
  }
}
.views {
  width: 100%;
  background-color: #fff;
  margin-left: 15px;
  box-shadow: 0 0 5px #ccc;
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
@media only screen and (max-width: 1540px) {
  .container {
    width: 1180px;
  }
  .guanggao {
    width: 1180px;
  }
}

@media only screen and (max-width: 1180px) {
  .container {
    width: 90%;
    .box {
      display: flex;
      flex-direction: column;
      .aside {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        ul {
          // display: flex;
        }
      }
      .views {
        margin-left: 0;
        margin-top: 15px;
      }
    }
  }
  .guangao {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
  .container {
    width: 90%;
  }
  .guanggao {
    display: none;
  }
}
</style>

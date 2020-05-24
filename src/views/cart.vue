<template>
  <div class="root">
    <!-- 头部 -->
    <div class="head">
      <div class="container">
        <div class="left">
          <img src="../assets/imgs/cart.png" width="70px" height="70px" alt />
          <h1>我的购物车</h1>
        </div>
        <div class="center">
          <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
        <div class="right">
          <div class="islogin">
            <span>Jimmy</span>|
            <span>我的订单</span>
          </div>
          <div class="nologin">
            <span @click="$router.push('/login')">登录</span>|
            <span @click="$router.push('/login')">注册</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="main">
      <div class="isnotlogin">
        <div class="clear">
          <img src="../assets/imgs/clear.png" width="100%" height="100%" alt />
        </div>
        <div class="nr">
          <h1>您的购物车还是空的！</h1>
          <h2>登陆后将显示您之前加入的商品</h2>
          <div class="btns">
            <button>立即登录</button>
            <button>马上去购物</button>
          </div>
        </div>
      </div>
      <cartlist></cartlist>
      <recommend></recommend>
      <h2 class="endding">已经到底啦~</h2>
    </div>
  </div>
</template>

<script>
import recommend from '../components/recommend'
import cartlist from '../components/cart/cartlist.vue'
export default {
  components: {
    recommend,
    cartlist
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  // height: 100vh;
  background-color: rgb(248, 248, 248);
}
.head {
  width: 100%;
  height: 105px;
  background-color: #fff;
  border-bottom: 3px solid #ff6700;
  box-shadow: 10px 0 20px #ccc;
  .container {
    width: 1480px;
    height: 100%;
    // border: 1px solid #ccc;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      h1 {
        font-weight: normal;
        font-size: 28px;
        margin-left: 30px;
      }
    }
    .center {
      font-size: 0.8rem;
      color: #757575;
      margin-left: 20px;
      padding-top: 18px;
      margin-right: auto;
    }
    .right {
      width: 170px;
      height: 50px;
      // background-color: saddlebrown;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #757575;
      font-size: 0.9rem;
      .islogin {
        display: none;
        span {
          margin: 0 5px;
          cursor: pointer;
          &:nth-child(1) {
            margin-right: 3px;
          }
        }
      }
      .nologin {
        span {
          margin: 0 5px;
          cursor: pointer;
          &:hover {
            border-bottom: 1px solid #ff6700;
          }
        }
      }
    }
  }
}
.main {
  .endding {
    font-weight: normal;
    text-align: center;
    padding: 20px 0 50px 0;
  }
  width: 78%;
  // height: 300px;
  margin: 25px auto;
  margin-bottom: 0;
  // border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .isnotlogin {
    margin: 150px 0;
    display: flex;
    // flex-direction: column;
    .clear {
      margin-right: 100px;
      img {
        width: 400px;
        height: 300px;
      }
    }
    .nr {
      width: 500px;
      // height: 300px;
      // background-color: saddlebrown;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        font-size: 36px;
        color: #b0b0b0;
      }
      h2 {
        font-size: 20px;
        color: #b0b0b0;
        margin: 15px 0;
      }
      .btns {
        display: flex;
        margin-top: 10px;
        button {
          width: 170px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #ff6700;
          outline: none;
          &:nth-child(2) {
            margin-left: 10px;
            color: #ff6700;
          }
          &:nth-child(1) {
            background-color: #ff6700;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

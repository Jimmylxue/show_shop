<template>
  <div class="portal">
    <div class="box">
      <div class="header">
        <div class="head">
          <div class="imgs">
            <img src="@/assets/imgs/head.jpg" width="100%" height="100%" alt />
          </div>
        </div>
        <div>
          <span>Jimmy</span>
          <span>早上好~</span>
          <span>
            修改个人信息
            <i class="el-icon-edit"></i>
          </span>
        </div>
        <div>
          <span>
            账户安全：
            <small>普通</small>
          </span>
          <span>绑定手机：199****6109</span>
          <span>绑定邮箱：未绑定</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div>
        <div>
          <img src="@/assets/imgs/icon1.png" width="100%" height="100%" alt />
        </div>
        <div>
          <span>
            待支付订单：
            <span style="color:#ff6700;">0</span>
          </span>
          <span>
            查看支付订单：
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
      <div>
        <div>
          <img src="@/assets/imgs/icon2.png" width="100%" height="100%" alt />
        </div>
        <div>
          <span>
            待收获的订单：
            <span style="color:#ff6700;">0</span>
          </span>
          <span>
            查看待收获的订单：
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
      <div>
        <div>
          <img src="@/assets/imgs/icon3.png" width="100%" height="100%" alt />
        </div>
        <div>
          <span>
            待评价的商品数：
            <span style="color:#ff6700;">0</span>
          </span>
          <span>
            查看待评价的商品：
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
      <div>
        <div>
          <img src="@/assets/imgs/icon4.png" width="100%" height="100%" alt />
        </div>
        <div>
          <span>
            喜欢的商品：
            <span style="color:#ff6700;">0</span>
          </span>
          <span>
            查看喜欢的商品：
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('hhh')
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 250px;
  // background-color: #2ecc71;
  display: flex;
  align-items: center;
  // padding: 0 50px;
  // border-bottom: 1px solid rgb(224, 224, 224);
  .head {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    // padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    .imgs {
      overflow: hidden;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-color: #f1c40f;
    }
  }
  & > div:nth-child(2) {
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    width: 40%;
    span {
      margin: 3px 0;
    }
    & > span:nth-child(1) {
      font-size: 24px;
      color: #616161;
    }
    & > span:nth-child(2) {
      font-size: 14px;
      color: #b0b0b0;
    }
    & > span:nth-child(3) {
      font-size: 12px;
      color: #ff6700;
    }
  }
  & > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #757575;
    span {
      margin: 3px 0;
    }
    & > span:nth-child(1) {
      small {
        font-size: 14px;
        color: #ff6700;
      }
    }
    & > span:nth-child(2) {
    }
    & > span:nth-child(3) {
    }
  }
}
.box {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid rgb(224, 224, 224);
  // background-color: skyblue;
}
.content {
  width: 100%;
  height: 300px;
  // background-color: #3498db;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  margin-top: 25px;
  div {
    display: flex;
    align-items: center;
    margin-left: 40px;
    & > div:nth-child(1) {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    & > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      // padding-left: 20px;
      & > span:nth-child(1) {
        font-size: 18px;
        color: #757575;
      }
      & > span:nth-child(2) {
        font-size: 14px;
        color: #757575;
      }
    }
  }
}
</style>
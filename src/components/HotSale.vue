<template>
  <div class="roott">
    <h2>限时闪购</h2>
    <div class="container">
      <div class="huodong">
        <span>14:00 场</span>
        <img src="../assets/imgs/lunbo/shandian.png" alt />
        <span class="endtime">距离结束还有:</span>
        <div class="time">
          <div>01</div>:
          <div>52</div>:
          <div>30</div>
        </div>
      </div>
      <div class="hdgoods">
        <div class="good">
          <div class="imgs">
            <img src="../assets/goods/01.jpg" width="100%" height="100%" alt />
          </div>
          <div class="msg">
            <span>游戏本2019款 i7-9750H</span>
            <span class="miaoshu">性能怪兽 信仰终极游戏体验</span>
            <div>
              <span>8999元</span>
              <span>9499元</span>
            </div>
          </div>
        </div>
        <div class="good">
          <div class="imgs">
            <img src="../assets/goods/02.jpg" width="100%" height="100%" alt />
          </div>
          <div class="msg">
            <span>小米手环4 NFC版 黑色</span>
            <span class="miaoshu">大屏彩显 可刷公交、门禁</span>
            <div>
              <span>199元</span>
              <span>229元</span>
            </div>
          </div>
        </div>
        <div class="good">
          <div class="imgs">
            <img src="../assets/goods/03.jpg" width="100%" height="100%" alt />
          </div>
          <div class="msg">
            <span>小米真无线蓝牙耳机 Air2 白色</span>
            <span class="miaoshu">智能真无线 轻松舒适戴</span>
            <div>
              <span>369元</span>
              <span>399元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
h2 {
  font-weight: normal;
  margin-bottom: 20px;
}
.container {
  width: 100%;
  // height: 80px;
  // border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  .huodong {
    border-top: 1px solid #e53935;
    width: 260px;
    height: 360px;
    // background-color: #2ecc71;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(241, 237, 237);
    &:nth-child(1) {
      font-size: 21px;
      color: rgb(255, 103, 0);
      padding-top: 20px;
    }
    img {
      width: 70px;
      height: 90px;
      margin: 20px 0;
    }
    .endtime {
      font-size: 15px;
      color: rgb(111, 109, 109);
      margin-bottom: 20px;
    }
    .time {
      width: 100%;
      height: 60px;
      // background-color: #16a085;
      display: flex;
      font-size: 2rem;
      justify-content: center;
      align-items: center;
      color: rgb(96, 87, 81);
      div {
        width: 50px;
        height: 50px;
        background-color: rgb(96, 87, 81);
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        color: #fff;
      }
    }
  }
  .hdgoods {
    flex-grow: 1;
    // background-color: #9b59b6;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    div {
      width: 260px;
      height: 360px;
      background-color: rgb(250, 250, 250);
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      overflow: hidden;
      .imgs {
        width: 100%;
        height: 200px;
      }
      .msg {
        width: 100%;
        height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .miaoshu {
          font-size: 12px;
          color: #b0b0b0;
        }
        div {
          width: 100%;
          height: 50px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          span {
            margin: 0 5px;
            &:nth-child(1) {
              color: #ff6709;
            }
            &:nth-child(2) {
              text-decoration: line-through;
              color: #b0b0b0;
            }
          }
        }
      }
    }
    .good {
      // transition: all 0.3s ease-in-out;
      border-top: 1px solid #e53935;
      box-shadow: 0 0 5px #ddd;
    }
    .good:hover {
      border: 1px solid #ddd;
      border-top: 1px solid #e53935;
      box-shadow: 0 0 10px #ddd;
    }
  }
}
</style>

<template>
  <div class="toolbar">
    <div>
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
      <img src="@/assets/imgs/qrcode.jpg" alt />
      <span>商业合作</span>
      <span class="last">联系作者</span>
    </div>
    <div>
      <i class="fa fa-comment-o fa-2x"></i>
      <span>人工客服</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
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
</style>
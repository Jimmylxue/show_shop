<template>
  <div class="rootd">
    <!-- 头部区 -->
    <header>
      <div class="container">
        <ul class="links">
          <li>
            <a href>{{name}}</a>
          </li>
          <li v-show="name===''?true:false">
            <a href="/login">登录</a>
          </li>
          <li @click="centerDialogVisible = true" v-show="name===''?false:true">
            <a href="javascript:void(0);">注销</a>
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
    <!-- 搜索区 -->
    <div>
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
    <el-card class="title">
      <div class="rongqi">
        <h2>{{goodsmsg.goodname}}</h2>
      </div>
    </el-card>
    <div class="tishi" v-show="name===''" ref="tishi">
      <span>为方便您购买，请提前登录</span>
      <a href="/login">立即登录</a>
      <span @click="$refs.tishi.style.display ='none'" class="quxiao">x</span>
    </div>
    <!-- 主体区 -->
    <div class="main">
      <el-card class="card">
        <div class="baoguo">
          <div class="goodimg">
            <img :src="goodsmsg.goodimg" width="100%" height="100%" alt />
          </div>
          <div class="goodmsgs">
            <h1>{{goodsmsg.goodname}}</h1>
            <div>{{goodsmsg.goodname}}</div>
            <div>
              <span>价格：</span>
              <span class="money">{{goodsmsg.price}}</span>
            </div>
            <div>
              <span>运费：</span>
              <span class="baoyou">{{goodsmsg.freight}}</span>
            </div>
            <div>
              <span>套餐类型：</span>
              <span>{{goodsmsg.type}}</span>
            </div>
            <div class="rongliang">
              <span>存储容量:</span>
              <span>{{goodsmsg.capacity}}</span>
            </div>
            <div class="count">
              <span>数量：</span>
              <el-input-number v-model="count" size="small" :min="1"></el-input-number>
            </div>
            <div class="btns">
              <button class="bugnow" @click="toBuy">立即购买</button>
              <button class="addcart" @click="addCart">加入购物车</button>
            </div>
          </div>
        </div>
      </el-card>
      <recomend></recomend>
      <advert></advert>
      <h2 class="endding">已经到底啦~</h2>
    </div>
    <!-- 工具栏 -->
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
        <img src="../assets/imgs/qrcode.jpg" alt />
        <span>商业合作</span>
        <span class="last">联系作者</span>
      </div>
      <div>
        <i class="fa fa-comment-o fa-2x"></i>
        <span>人工客服</span>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>确定要退出当前账号吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import recomend from '../components/recommend'
import advert from '../components/advertisement.vue'

// import { mapActions } from 'vuex'
export default {
  components: {
    recomend,
    advert
  },
  data() {
    return {
      // 弹窗
      centerDialogVisible: false,
      count: 1,
      goodsmsg: {},
      name: '',
      // 用户的id
      userid: null
    }
  },
  watch: {
    $route() {
      location.reload()
    }
  },
  methods: {
    // ...mapActions(['getGoods']),
    // 注销
    logout() {
      localStorage.removeItem('user')
      this.centerDialogVisible = false
      this.$router.push('/login')
      this.$message({
        message: '已注销',
        type: 'success'
      })
    },
    // 个人中心
    tomine() {
      if (this.name === '') {
        this.$message({
          message: '您还未登录哦~请先登录。',
          type: 'warning'
        })
        return
      }
      alert('个人中心')
    },
    // 加入购物车
    async addCart() {
      if (this.name === '') {
        this.$notify({
          title: '温馨提示',
          message: '您还未登录哦~不能添加至购物车',
          type: 'warning'
        })
        return
      }
      if (this.count === 0) {
        this.$notify.info({
          title: '温馨提示',
          message: '商品数量为0是不能添加的到购物车的'
        })
      } else {
        let obj = {
          userId: this.userid,
          goodId: this.goodsmsg.goodid,
          goodName: this.goodsmsg.goodname,
          goodDesc: this.goodsmsg.gooddesc,
          buyCount: this.count,
          goodPrice: this.goodsmsg.price,
          goodFreight: this.goodsmsg.freight,
          goodimg: this.goodsmsg.goodimg
        }
        let res = await this.$api.cart.addCart(obj)
        if (res.data.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      }
    },
    // 下单
    toBuy() {
      if (this.name === '') {
        this.$notify({
          title: '警告',
          message: '需要先登录',
          type: 'warning'
        })
      } else {
        console.log(typeof this.userid)
      }
    }
  },
  async mounted() {
    this.name = sessionStorage.getItem('user')
      ? sessionStorage.getItem('user')
      : ''
    this.userid = sessionStorage.getItem('loginUserId')
      ? parseInt(sessionStorage.getItem('loginUserId'))
      : ''
    this.id = parseInt(this.$route.query.id)
    let res = await this.$api.good.getGood(this.id)
    this.goodsmsg = res.data[0]
    // console.log(this.goodsmsg)
    // try {
    //   // let res = await this.getGoods()
    //   this.goodsmsg = res[0]
    // } catch (err) {
    //   console.log(err)
    // }
  }
}
</script>

<style lang="less" scoped>
.rootd {
  width: 100vw;
  // height: 100vh;
  background: rgb(248, 248, 248);
}
// 工具栏
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
.title {
  width: 100%;
  height: 70px;
  // border-top: 1px solid #ddd;
  background: #fff;
  // box-shadow: 0px 0 10px #bbb;
  .rongqi {
    width: 1420px;
    margin: 0 auto;
    font-weight: normal;
    h2 {
      font-weight: normal;
      // line-height: 70px;
    }
  }
}
.tishi {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  .quxiao {
    color: #b5b5b5;
    cursor: pointer;
  }
  a {
    margin: 0 20px;
    color: #ff6700;
  }
}
.main {
  width: 1480px;
  // height: 500px;
  // border: 1px solid #ccc;
  margin: 0 auto;
  .card {
    // height: 100%;
    .baoguo {
      display: flex;
      flex-direction: row;
      .goodimg {
        width: 430px;
        height: 430px;
        border: 1px solid #ccc;
        margin-right: 20px;
      }
      .goodmsgs {
        flex-grow: 1;
        // background-color: rosybrown;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 1.1rem;
        h1 {
          font-weight: normal;
        }
        .money {
          color: #ff0036;
          font-weight: bold;
          font-size: 1.3rem;
        }
        .baoyou {
          color: #b5621b;
        }
        .count {
          span {
            margin-right: 15px;
          }
        }
        .rongliang {
          span {
            border: 1px solid #b8b7bd;
            padding: 3px 5px;
            margin: 0 5px;
            &:nth-child(1) {
              border: none;
              margin-left: 0;
              padding: 0;
            }
          }
        }
        .btns {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          button {
            width: 180px;
            height: 40px;
            outline: none;
            border: 1px solid #ff0036;
          }
          .bugnow {
            background-color: #ffeded;
            color: #ff0036;
          }
          .addcart {
            background-color: #ff0036;
            color: #fff;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .endding {
    font-weight: normal;
    text-align: center;
    padding: 20px 0 50px 0;
  }
}

// 媒体查询部分
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
    width: 90%;
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
}
@media only screen and (max-width: 768px) {
  header {
    .container {
      // display: none;
      width: 90%;
    }
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
  .main {
    width: 90%;
    .card {
      .baoguo {
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>

<template>
  <div class="rootp">
    <!-- 头部 -->
    <div class="head">
      <div class="container">
        <div class="left">
          <img src="../assets/imgs/cart.png" width="70px" height="70px" alt />
          <h1>确认订单</h1>
        </div>
        <div class="center">
          <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
        <div class="right">
          <div class="islogin">
            <span>{{name}}</span>|
            <span>我的订单</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 主体区 -->
    <div class="main">
      <el-card class="card">
        <div class="list">
          <h1>收获地址</h1>
          <div class="addres">
            <div v-for="item in receiptmsg" :key="item.receipt_id" class="addlist">
              <h4>{{item.username}}</h4>
              <p>1{{item.phone}}</p>
              <p>{{item.province}} {{item.city}} {{item.area}} 金龙街道</p>
              <p>{{item.detail}}</p>
            </div>
            <div class="add" @click="dialogVisible = true">
              <i class="fa fa-plus-circle fa-2x"></i>
              <span>添加新地址</span>
            </div>
          </div>
        </div>
        <div class="list">
          <h1>商品</h1>
          <div v-for="item in goodmsg" :key="item.cartid" class="good gooditem">
            <img :src="item.goodimg" width="35px" height="35px" alt />
            <span class="name">{{item.goodname}}</span>
            <span class="count">{{item.goodprice}}元 × {{item.goodcount}}</span>
            <span class="money">{{item.goodprice}}元</span>
          </div>
        </div>
        <div class="list">
          <div class="good">
            <span class="titlea">配送方式</span>
            <span class="baoyou">包邮</span>
          </div>
        </div>
        <div class="lista">
          <h1>发票</h1>
          <div class="goodend">
            <div>
              <div class="msg">
                商品件数：
                <span>{{goodmsg.length}}件</span>
              </div>
              <div>
                商品总价：
                <span>{{allPrice}}元</span>
              </div>
              <div>
                运费价格：
                <span>{{allFreight}}元</span>
              </div>
              <div>
                应付总额：
                <span>{{allMoney}}元</span>
              </div>
            </div>
          </div>
        </div>
        <div class="lists">
          <h1>结算方式</h1>
          <div>
            <div class="way weichat" @click="pay">
              <div>
                <img src="../assets/weichat.png" width="60px" height="60px" alt />
              </div>Jimmy
            </div>
            <div class="way airpay" @click="pay">
              <div>
                <img src="../assets/airpay.png" width="60px" height="60px" alt />
              </div>Jimmy
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 弹窗 -->
    <el-dialog title="添加收货地址" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input placeholder="姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="手机号" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input placeholder="详细地址，路名或街道名称，门牌号" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址标签">
          <el-input placeholder="地址标签 如：”家“，”公司“。限5个字内" v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer fotters">
        <el-button @click="dialogVisible = false" class="quxiao">取 消</el-button>
        <el-button type="primary" class="ok" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      // 用户收货信息
      receiptmsg: [],
      //商品
      goodmsg: [],
      // 地址表单
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      userid: null,
      name: ''
    }
  },
  computed: {
    allPrice() {
      let money = 0
      this.goodmsg.forEach(item => {
        let one = item.goodprice
        money += one
      })
      return money
    },
    allFreight() {
      let money = 0
      this.goodmsg.forEach(item => {
        let one = item.goodfreight
        money += one
      })
      return money
    },
    allMoney() {
      let money = 0
      this.goodmsg.forEach(item => {
        let one = item.goodprice + item.goodfreight
        money += one
      })
      return money
    }
  },
  mounted() {
    this.userid = sessionStorage.getItem('loginUserId')
      ? sessionStorage.getItem('loginUserId')
      : ''
    this.name = sessionStorage.getItem('user')
      ? sessionStorage.getItem('user')
      : ''
    if (this.userid !== '') {
      console.log(this.userid)
      this.getUserReceipt(this.userid)
    }
    this.goodmsg = JSON.parse(sessionStorage.getItem('goodmsg'))
  },
  methods: {
    async getUserReceipt(id) {
      let res = await this.$api.receipt.getUserReceipt({ id })
      this.receiptmsg = res.data
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    pay() {
      this.$message({
        showClose: true,
        message: '支付成功',
        type: 'success'
      })
    }
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
        display: block;
        span {
          margin: 0 5px;
          cursor: pointer;
          &:nth-child(1) {
            margin-right: 3px;
          }
        }
      }
    }
  }
}
.main {
  width: 78%;
  // height: 300px;
  margin: 50px auto;
  margin-bottom: 0;
  // border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .card {
    width: 100%;
    .lista {
      border-bottom: 1px solid rgb(224, 224, 224);
    }
    .lists {
      width: 100%;
      // display: flex;
      div {
        display: flex;
        .way {
          width: 200px;
          height: 70px;
          background-color: rosybrown;
          margin-right: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .weichat {
          background-color: rgb(70, 187, 54);
          font-size: 1.4rem;
          color: #fff;
          // font-weight: 700;
          div {
            width: 60px;
            height: 60px;
            background-color: #fff;
            border-radius: 50%;
            border: none;
            img {
              transform: scale(1.02);
            }
          }
        }
        .airpay {
          background-color: rgb(6, 180, 253);
          font-size: 1.4rem;
          color: #fff;
          div {
            width: 55px;
            height: 55px;
            background-color: #fff;
            border-radius: 50%;
            border: none;
            img {
              transform: scale(1.04);
            }
            margin-right: 5px;
          }
        }
      }
    }

    h1 {
      font-size: 18px;
      color: #333;
      font-weight: 400;
      margin: 20px 0;
    }
    // 地址
    .addres {
      width: 100%;
      // height: 280px;
      // border: 1px solid #ccc;
      display: flex;
      .add {
        width: 300px;
        height: 180px;
        border: 1px solid #e0e0e0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #b0b0b0;
        span {
          margin-top: 5px;
        }
        &:hover {
          border-color: rgb(176, 176, 176);
        }
      }
      .addlist {
        width: 300px;
        height: 180px;
        // background-color: rosybrown;
        margin-right: 15px;
        padding: 20px;
        border: 1px solid #e0e0e0;
        h4 {
          color: #333;
          font-size: 18px;
        }
        p {
          color: #757575;
          margin-top: 5px;
        }
        &:hover {
          border-color: rgb(176, 176, 176);
        }
      }
    }
    // 商品
    .good {
      width: 100%;
      display: flex;
      border-bottom: 1px solid rgb(224, 224, 224);
      padding-bottom: 30px;
      span {
        display: block;
      }
      .name {
        margin-right: auto;
      }
      .count {
        margin-right: 300px;
      }
      .money {
        padding-right: 140px;
        color: #ff6700;
      }
    }
    .goodend {
      display: flex;
      justify-content: flex-end;
      // text-align: right;
      div {
        margin-right: 20px;
        div {
          margin: 10px 0;
          color: #757575;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
            color: #ff6700;
          }
        }
      }
    }
    .titlea {
      font-size: 18px;
      color: #333;
      font-weight: 400;
      margin-top: 20px;
    }
    .baoyou {
      margin-left: 100px;
      padding-top: 20px;
      color: #ff6700;
    }
  }
}
.fotters {
  display: flex;
  // background-color: rgb(245, 245, 245);
  justify-content: center;
  align-items: center;
  .quxiao {
    width: 150px;
    height: 40px;
    background-color: rgb(176, 176, 176);
    color: #fff;
    &:hover {
      border: none;
      background-color: rgb(117, 117, 117);
    }
  }
  .ok {
    width: 150px;
    height: 40px;
    background-color: #ff6700;
    border: #ff6700;
  }
}

.gooditem {
  display: flex;
  align-items: center;
  img {
    margin-right: 15px;
  }
}
</style>

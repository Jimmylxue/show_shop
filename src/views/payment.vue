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
            <span>{{ name }}</span
            >|
            <span @click="$router.push('/users/order')">我的订单</span>
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
            <div
              v-for="item in receiptmsg"
              :class="seltItem === receiptmsg.indexOf(item) ? 'isselect' : ''"
              :key="item.receipt_id"
              @click="seltItem = receiptmsg.indexOf(item)"
              class="addlist"
            >
              <h4>{{ item.username }}</h4>
              <p>1{{ item.phone }}</p>
              <p>
                {{ item.province }} {{ item.city }} {{ item.area }} 金龙街道
              </p>
              <p>{{ item.detail }}</p>
              <span class="sele" v-show="seltItem === receiptmsg.indexOf(item)"
                >修改</span
              >
            </div>
            <div class="add" @click="addreceipt">
              <i class="fa fa-plus-circle fa-2x"></i>
              <span>添加新地址</span>
            </div>
          </div>
        </div>
        <div class="list">
          <h1>商品</h1>
          <div v-for="item in goodmsg" :key="item.cartid" class="good gooditem">
            <img :src="item.goodimg" width="35px" height="35px" alt />
            <span class="name">{{ item.goodname }}</span>
            <span class="count"
              >{{ item.goodprice }}元 × {{ item.goodcount }}</span
            >
            <span class="money">{{ item.goodprice }}元</span>
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
                <span>{{ goodmsg.length }}件</span>
              </div>
              <div>
                商品总价：
                <span>{{ allPrice() }}元</span>
              </div>
              <div>
                运费价格：
                <span>{{ allFreight }}元</span>
              </div>
              <div>
                应付总额：
                <span>{{ allMoney }}元</span>
              </div>
            </div>
          </div>
        </div>
        <div class="lists">
          <h1>结算方式</h1>
          <div>
            <div class="way weichat" @click="pay(0)">
              <div>
                <img
                  src="../assets/weichat.png"
                  width="60px"
                  height="60px"
                  alt
                />
              </div>
              Jimmy
            </div>
            <div class="way airpay" @click="pay(1)">
              <div>
                <img
                  src="../assets/airpay.png"
                  width="60px"
                  height="60px"
                  alt
                />
              </div>
              Jimmy
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 弹窗 -->
    <el-dialog
      title="添加收货地址"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input placeholder="姓名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="手机号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <div class="area">
            <div class="a1">
              <el-select v-model="form.province" placeholder="选择省">
                <el-option
                  v-for="(item, index) in areas"
                  :key="index"
                  :label="item.name"
                  :value="areas[index].name"
                ></el-option>
              </el-select>
            </div>
            <div class="a1">
              <el-select v-model="form.city" placeholder="选择市">
                <el-option
                  v-for="(item, index) in citys"
                  :key="index"
                  :label="item.name"
                  :value="citys[index].name"
                ></el-option>
              </el-select>
              <!-- {{ citys }} -->
            </div>
            <div class="a1">
              <el-select v-model="form.districtAndCounty" placeholder="选择区">
                <el-option
                  v-for="(item, index) in districtAndCounty"
                  :key="index"
                  :label="item"
                  :value="districtAndCounty[index]"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            placeholder="详细地址，路名或街道名称，门牌号"
            v-model="form.detail"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址标签">
          <el-input
            placeholder="地址标签 如：”家“，”公司“。限5个字内"
            v-model="form.flag"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer fotters">
        <el-button @click="dialogVisible = false" class="quxiao"
          >取 消</el-button
        >
        <el-button type="primary" class="ok" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import area from '@/assets/js/area.js'
export default {
  data() {
    return {
      dialogVisible: false,
      // 用户收货信息
      receiptmsg: [],
      //商品
      goodmsg: [],
      areas: [],
      // 地址表单
      form: {
        username: '',
        phone: '',
        province: '',
        city: '',
        districtAndCounty: '',
        detail: '',
        flag: '',
      },
      userid: null,
      name: '',
      seltItem: 0,
      citys: [],
      districtAndCounty: [],
      allmoney: 0,
    }
  },
  computed: {
    // getcity() {
    //   console.log('ssssss', this.form.province)
    //   let res = this.areas.filter(item => item.name === this.form.province)
    //   this.citys = res[0]
    //   return res[0]
    // },

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
    },
  },
  watch: {
    'form.province': function(newval) {
      if (newval) {
        let res = this.areas.filter(item => item.name === this.form.province)
        this.citys = res[0].city
        // console.log('555555', this.citys.city)
      }
    },
    'form.city': function(newval) {
      if (newval) {
        // console.log('ccccc')
        // console.log(this.citys)
        // console.log('1', this.form.city)
        let res = this.citys.filter(item => item.name === this.form.city)
        this.districtAndCounty = res[0].districtAndCounty
        // console.log('6666', this.districtAndCounty)
      }
    },
  },
  mounted() {
    this.areas = area
    console.log(this.areas)
    this.userid = sessionStorage.getItem('loginUserId')
      ? sessionStorage.getItem('loginUserId')
      : ''
    this.name = sessionStorage.getItem('user')
      ? sessionStorage.getItem('user')
      : ''
    if (this.userid !== '') {
      console.log(this.userid)
      // this.form.userid = this.userid
      this.getUserReceipt(this.userid)
    }
    this.goodmsg = JSON.parse(sessionStorage.getItem('goodmsg'))
  },
  methods: {
    allPrice() {
      let money = 0
      this.goodmsg.forEach(item => {
        let one = item.goodprice
        money += one
      })
      this.allmoney = money
      return money
    },
    async getUserReceipt(id) {
      let res = await this.$api.receipt.getUserReceipt({ id })
      this.receiptmsg = res.data
    },
    handleClose() {
      this.dialogVisible = false
    },
    pay(way) {
      console.log(way)
      console.log(this.goodmsg)
      let obj = {}
      obj.userid = this.userid
      obj.buyname = this.name
      obj.goodid = this.goodmsg.reduce((msg, item) => {
        return (msg += `-${item.goodid}`)
      }, '')
      obj.goodcount = this.goodmsg.reduce((count, item) => {
        return (count += item.goodcount)
      }, 0)
      obj.payWay = way
      obj.createtime = Date.now()
      obj.payState = 0
      obj.orderprice = this.allmoney
      let area = this.receiptmsg[this.seltItem]
      this.$swal({
        title: '付款提示',
        text: '立即付款吗老板~',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd6b55',
        confirmButtonText: '是的,立即购买',
        cancelButtonText: '容我三思',
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete.value) {
          obj.payState = 1
          this.$api.order.addorder({ obj, area }).then(res => {
            if (res.data.code === 200) {
              this.$swal('哟吼~', '购买成功~', 'success')
              return
            }
            this.$swal('哎吼~', '出错了~', 'error')
          })
        } else {
          obj.payState = 0
          // console.log('bbb')
          this.$api.order.addorder({ obj, area }).then(res => {
            if (res.date.code === 200) {
              this.$swal('哟吼~', '以下单啦，请及时付款~', 'success')
              return
            }
            this.$swal('哎吼~', '出错了~', 'error')
          })
        }
      })

      // this.$swal({
      //   title: 'Are you sure?',
      //   text:
      //     'Once deleted, you will not be able to recover this imaginary file!',
      //   icon: 'warning',
      //   buttons: true,
      //   dangerMode: true
      // }).then(willDelete => {
      //   console.log(willDelete)
      //   if (willDelete) {
      //     console.log('aaa')
      //   } else {
      //     console.log('bbb')
      //   }
      // })

      console.log(obj.goodcount)

      // const loading = this.$loading({
      //   lock: true,
      //   text: '正在支付',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      // setTimeout(() => {
      //   loading.close()
      //   this.$swal('哟吼~', '支付成功~', 'success')
      // }, 2000)
    },
    // 添加收货地址
    addreceipt() {
      this.form = {}
      // 加上用户的id
      this.form.userid = this.userid
      this.dialogVisible = true
    },
    async add() {
      console.log(this.form)
      let res = await this.$api.receipt.addUserReceipt(this.form)
      if (res.data.code === 200) {
        this.dialogVisible = false
        this.$swal('哟吼~', '添加成功~', 'success')
        this.getUserReceipt(this.userid)
        return
      }
      this.$swal('哦吼~', '报错了~', 'success')
    },
  },
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
        position: relative;
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
        .sele {
          position: absolute;
          right: 15px;
          bottom: 10px;
          color: #ff6700;
          cursor: pointer;
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

.isselect {
  border: 1px solid #ff6700 !important;
}

.area {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .a1 {
    width: 31%;
  }
}
</style>

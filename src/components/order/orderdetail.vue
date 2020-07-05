<template>
  <div class="rootr">
    <header>
      <p>
        我的订单
        <small>请谨防钓鱼链接或诈骗电话，了解更多></small>
      </p>
    </header>
    <div class="type">
      <div>
        <ul>
          <li :class="selectType===1?'select':''" @click="selectType = 1">全部有效订单</li>
          <li :class="selectType===2?'select':''" @click="selectType = 2">待支付</li>
          <li :class="selectType===3?'select':''" @click="selectType = 3">待收货</li>
        </ul>
      </div>
      <div>
        <el-input placeholder="输入商品名称、订单号" suffix-icon="el-icon-search" v-model="input2"></el-input>
      </div>
    </div>
    <el-table style="margin-top:15px;" stripe :data="order">
      <el-table-column label="订单信息">
        <template slot-scope="scope">
          <div class="msg">
            <span>订单号：{{scope.row.orderid}}</span>
            <span>订单价格：{{scope.row.orderprice}}</span>
            <span>下单时间：{{scope.row.createtime | formatTime}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodcount}}件</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <span>
              付款状态：
              <el-tag type="success" v-show="scope.row.paystatus===1">已付款</el-tag>
              <el-tag type="warning" v-show="scope.row.paystatus===0">未付款</el-tag>
            </span>
            <br />
            <span>
              发货状态：
              <el-tag v-show="scope.row.send===1">已发货</el-tag>
              <el-tag v-show="scope.row.send===0" type="warning">未发货</el-tag>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="340" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="seeDetail(scope.row)" size="mini">查看详情</el-button>
            <el-button type="warning" size="mini">提醒发货</el-button>
            <el-button type="success" size="mini">确认收货</el-button>
            <i @click="del(scope.row.orderid)" class="el-icon-delete del"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单信息" :visible.sync="detailstatus" width="60%">
      <div class="Detail">
        <h3>请按照下列商品列表配货</h3>
        <p>订单清单</p>
        <div class="msgcontain" v-for="(item,index) in good" :key="index">
          <div>
            <img :src="item.goodimg" width="200px" height="200px" alt />
          </div>
          <div>
            <p>{{ item.goodname }}</p>
            <p>{{ item.gooddesc }}</p>
            <p>{{ item.capacity }}</p>
          </div>
          <div>
            <span>{{ item.price }}</span>
            ×{{ select.goodcount }}
          </div>
        </div>
        <div class="usermsg">
          <h3>请按照下列信息发货</h3>
          <p>地址:{{ select.province }}{{select.city}}{{select.area}}{{select.detail}}</p>
          <p>收货人:{{ select.username }}</p>
          <p>电话号码:{{ select.phone }}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer send">
        <el-button type="success" v-show="select.send!==0" plain>确认收货</el-button>
        <el-button type="primary" v-show="select.send===0" plain>提醒发货</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: '',
      order: [],
      good: [],
      input2: '', //搜索框
      detailstatus: false,
      select: {},
      selectType: 1
    }
  },
  mounted() {
    console.log('mine')
    this.userid = sessionStorage.getItem('loginUserId')
      ? sessionStorage.getItem('loginUserId')
      : ''
    // this.getOrder()
    if (this.userid === '') {
      this.$swal('注意~', '请先登录哦~', 'error')
      return
    }
    this.getOrder(this.userid)
  },
  methods: {
    async getOrder(id) {
      let res = await this.$api.order.getorder({ userid: id })
      this.order = res.data
      console.log(this.order)
    },
    show() {
      alert('ok')
    },
    del() {
      this.$swal({
        title: '您确定要删除这些信息吗？',
        text: '删除后将无法恢复，请谨慎操作！',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd6b55',
        confirmButtonText: '是的,我要删除',
        cancelButtonText: '容我三思',
        dangerMode: true
      }).then(willDelete => {
        if (willDelete.value) {
          this.$swal('哟吼~', '删除成功~', 'success')
        }
      })
    },
    // 查看详细信息
    async seeDetail(row) {
      let goodid = row.goodid.split('-')
      goodid.splice(0, 1)
      console.log(goodid)
      let res = await this.$api.good.getSomeGood({
        ids: JSON.stringify(goodid)
      })
      this.good = res.data
      // console.log(items)
      this.select = row
      this.detailstatus = true
      console.log('55555', this.select)
    }
  }
}
</script>

<style lang="less" scoped>
.rootr {
  width: 100%;
  padding: 10px;
  background-color: #fff;
  padding: 0 30px;
}
header {
  color: #757575;
  padding-top: 30px;
  p {
    font-size: 30px;
    small {
      font-size: 14px;
    }
  }
}
.type {
  display: flex;
  & > div:nth-child(1) {
    margin-right: auto;
    ul {
      display: flex;
      margin-top: 10px;
      li {
        margin-right: 10px;
        font-size: 16px;
        color: #757575;
        cursor: pointer;
      }
    }
  }
  & > div:nth-child(2) {
    width: 260px;
    margin-right: 40px;
  }
}

.msg {
  display: flex;
  flex-direction: column;
}
.del {
  margin-left: 10px;
  transform: scale(1.1);
  cursor: pointer;
}

.Detail {
  font-size: 16px;
  & > p {
    margin-top: 20px;
    border-bottom: 2px solid rgb(188, 188, 188);
    padding-bottom: 10px;
  }
  .msgcontain {
    display: flex;
    border-bottom: 2px solid rgb(240, 240, 240);
    & > div:nth-child(2) {
      padding-top: 30px;
      & > p:nth-child(1) {
        font-weight: bold;
      }
      & > p:nth-child(2) {
        padding-top: 10px;
        font-weight: bold;
        margin-bottom: 40px;
      }
    }
    & > div:nth-child(3) {
      width: 250px;
      text-align: center;
      padding-top: 40px;
      span {
        color: rgb(254, 62, 68);
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .usermsg {
    margin-top: 50px;
    & > h3 {
      margin-bottom: 15px;
    }
    & > p {
      margin-top: 5px;
    }
  }
}
.select {
  color: #ff6700 !important;
  cursor: pointer;
}
.router-link-active {
  color: #ff6700 !important;
}
</style>

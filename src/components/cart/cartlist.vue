<template>
  <div class="rootl">
    <el-card>
      <el-table
        v-loading="loading"
        :data="cartLists"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品名称" width="450" prop="goodname">
          <template slot-scope="scope">
            <div class="mygood">
              <img :src="scope.row.goodimg" width="100px" height="100px" alt />
              {{scope.row.goodname}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格信息" align="center" width="150">
          <template slot-scope="scope">
            <p>商品单价:{{scope.row.goodprice}}元</p>
            <p>邮费价格:{{scope.row.goodfreight}}元</p>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="200" align="center">
          <template slot-scope="scope">
            <div>
              <el-input-number
                size="mini"
                v-model="scope.row.goodcount"
                @change="handleChange"
                :min="1"
              ></el-input-number>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小计" align="center" prop="goodprice">
          <template slot-scope="scope">
            <div style="color:#ff6700">
              <p>{{scope.row.goodprice+scope.row.goodfreight}}元</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tag class="tag" size="medium" @click="deleteone(scope.row.cartid)" type="danger">删除</el-tag>
            <!-- <el-tag class="tag" size="medium" type="success">结算</el-tag> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="heji">
      <span class="goon">继续购物</span>
      <span class="count">
        共
        <span>{{itemcount}}</span>件商品，已选择
        <span>{{selcount}}</span>件
      </span>
      <div>
        合计：
        <span>{{allmoney}}</span>元
      </div>
      <!-- $router.push('/pay') -->
      <button @click="toPay()">去结算</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      userId: null,
      loading: true,
      tableData: [
        {
          name: '好滋好味鸡蛋仔',
          danjia: 1580,
          count: 1,
          money: 1580,
          desc: 'xiaomi手机',
          id: '12987122',
          category: '江浙小吃、小吃零食',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          name: '好滋好味鸡蛋仔',
          danjia: 1580,
          count: 1,
          money: 1580,
          desc: 'xiaomi手机',
          id: '12987122',
          category: '江浙小吃、小吃零食',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ],
      cartLists: [],
      allmoney: 0,
      selcount: 0,
      rows: []
    }
  },
  computed: {
    itemcount() {
      return this.cartLists.length
    }
  },
  mounted() {
    this.userName = sessionStorage.getItem('user')
      ? sessionStorage.getItem('user')
      : ''
    this.userId = sessionStorage.getItem('loginUserId')
      ? sessionStorage.getItem('loginUserId')
      : ''
    if (
      this.userId !== '' ||
      (this.userId !== null) | (this.userId !== undefined)
    ) {
      this.getCartList(this.userId)
    }
    setTimeout(() => {
      this.loading = !this.loading
    }, 1500)
  },
  methods: {
    handleSelectionChange(rows) {
      this.rows = rows
      // console.log(rows)
      this.allmoney = 0
      this.selcount = 0
      rows.forEach(item => {
        this.selcount++
        let xiaoji = item.goodprice + item.goodfreight
        this.allmoney += xiaoji
      })
    },
    // 删除商品
    deleteone(id) {
      this.$confirm('您将在购物车中删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.cart.deleteOne({ id }).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getCartList(this.userId)
              return
            }
            this.$message({
              type: 'info',
              message: '网络开了小差~'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取用户购物车商品
    async getCartList(id) {
      let res = await this.$api.cart.cartList({ id })
      this.cartLists = res.data
      this.$emit('counts', this.cartLists.length)
      console.log(this.cartLists)
    },
    // 商品数量发生变化
    handleChange() {},
    // 去支付
    toPay() {
      sessionStorage.setItem('goodmsg', JSON.stringify(this.rows))
      this.$router.push('/pay')
    }
  }
}
</script>

<style lang="less" scoped>
.rootl {
  width: 100%;
  // height: 300px;
}
.tag {
  margin-right: 10px;
  cursor: pointer;
}
.heji {
  width: 100%;
  height: 50px;
  // background: chartreuse;
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-top: 15px;
  .goon {
    width: 105px;
    text-align: center;
    border-right: 1px solid rgb(238, 238, 238);
    color: #757575;
  }
  .count {
    margin-right: auto;
    padding-left: 20px;
    span {
      color: #ff6700;
      padding-right: 5px;
    }
  }
  div {
    font-size: 14px;
    color: #ff6700;
    padding: 0 30px;
    span {
      font-size: 30px;
      padding-right: 2px;
    }
  }
  button {
    width: 200px;
    height: 50px;
    background: rgb(255, 103, 0);
    font-size: 18px;
    border: none;
    outline: none;
    color: #b0b0b0;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: rgb(242, 88, 7);
    }
  }
}
.mygood {
  display: flex;
  align-items: center;
  color: #424242;
  font-size: 18px;
  img {
    margin-right: 50px;
  }
}
</style>

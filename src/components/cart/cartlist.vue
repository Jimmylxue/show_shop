<template>
  <div class="rootl">
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
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
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="单价" prop="danjia"></el-table-column>
        <el-table-column label="数量" prop="count"></el-table-column>
        <el-table-column label="小计" prop="money"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-tag class="tag" type="danger">删除</el-tag>
            <el-tag type="success">结算</el-tag>
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
      <button @click="$router.push('/pay')">去结算</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      allmoney: 0,
      selcount: 0
    }
  },
  computed: {
    itemcount() {
      return this.tableData.length
    }
  },
  methods: {
    handleSelectionChange(rows) {
      this.allmoney = 0
      this.selcount = 0
      rows.forEach(item => {
        this.selcount++
        this.allmoney += item.money
      })
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
    background: rgb(224, 224, 224);
    font-size: 18px;
    border: none;
    outline: none;
    color: #b0b0b0;
  }
}
</style>

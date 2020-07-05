<template>
  <div class="root">
    <!-- 导航栏 -->
    <header>
      <div class="container">
        <ul class="links">
          <li>
            <a href>{{ name }}</a>
          </li>
          <li v-show="name === '' ? true : false">
            <a href="/login">登录</a>
          </li>
          <li @click="centerDialogVisible = true" v-show="name === '' ? false : true">
            <a @click="logout">注销</a>
          </li>
          <li>
            <a href="/users/portal">个人中心</a>
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
    <!-- 搜素栏 -->
    <div class="nav">
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
    <!-- 主体栏 -->
    <!-- <div class="main">
      <comain></comain>
      <hot-sale></hot-sale>
      <advertisement></advertisement>
      <recommend></recommend>
      <myvideo></myvideo>
      <h2 class="endding">已经到底啦~</h2>
    </div>-->
    <!-- 弹窗 -->
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
export default {
  data() {
    return {
      // 弹窗
      centerDialogVisible: false,
      name: ''
    }
  },
  mounted() {
    if (sessionStorage.getItem('user')) {
      this.name = sessionStorage.getItem('user')
    }
  },
  methods: {
    // 注销
    logout() {
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
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  // height: 100vh;
  background-color: rgb(248, 248, 248);
  position: relative;
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
      position: relative;
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
</style>

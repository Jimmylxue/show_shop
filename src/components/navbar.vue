<template>
  <div class="root">
    <!-- 搜素栏 -->
    <top></top>
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
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>确定要退出当前账号吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import top from '@/components/top.vue'
export default {
  components: {
    top,
  },
  data() {
    return {
      // 弹窗
      centerDialogVisible: false,
      name: '',
      btnList: [],
    }
  },
  mounted() {
    // if (sessionStorage.getItem('user')) {
    //   this.name = sessionStorage.getItem('user')
    // }
    this.name = sessionStorage.getItem('user')
      ? sessionStorage.getItem('user')
      : ''
    this.getbtns()
  },
  methods: {
    async getbtns() {
      let res = await this.$api.medium.getBtns()
      // console.log(res)
      this.btnList = res.data
    },
    // 注销
    logout() {
      this.centerDialogVisible = false
      this.$router.push('/login')
      this.$message({
        message: '已注销',
        type: 'success',
      })
    },
    // 个人中心
    tomine() {
      if (this.name === '') {
        this.$message({
          message: '您还未登录哦~请先登录。',
          type: 'warning',
        })
        return
      }
      alert('个人中心')
    },
  },
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

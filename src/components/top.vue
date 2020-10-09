<template>
  <div class="navstop">
    <header>
      <div class="container">
        <ul class="links">
          <li>
            <a href>{{ name }}</a>
          </li>
          <li v-show="name === '' ? true : false">
            <a href="/login">登录</a>
          </li>
          <li
            @click="centerDialogVisible = true"
            v-show="name === '' ? false : true"
          >
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
          <div class="logo" @click="$router.push('/home')">
            <img width="100%" height="100%" src="../assets/imgs/logo.jpg" alt />
          </div>
          <div class="searchbar">
            <div class="inputs">
              <input
                type="text"
                v-model="search_text"
                placeholder="请输入商品信息 如:小米10"
                @blur="blurFoucs"
              />
              <div class="searchList" v-show="inputList.length !== 0">
                <ul>
                  <li
                    v-for="(item, index) in inputList"
                    :key="index"
                    @click="$router.push(`/good?id=${item.goodid}`)"
                  >
                    {{ item.goodname }}
                  </li>
                </ul>
              </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      search_text: '', // input输入框的值
      timers: null, // 防抖
      inputList: [],
    }
  },
  watch: {
    search_text() {
      clearTimeout(this.timers)
      this.timers = setTimeout(() => {
        // clearTimeout(this.timers)
        this.fuzzyQuery()
      }, 1000)
    },
  },
  mounted() {
    if (sessionStorage.getItem('user')) {
      this.name = sessionStorage.getItem('user')
    }
  },
  methods: {
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
    inputChange() {
      // console.log('I am CHANGE')
    },
    // 输入框失去焦点
    blurFoucs() {
      this.inputList = []
    },
    async fuzzyQuery() {
      let params = {}
      params.keyWord = this.search_text

      let res = await this.$api.good.getFuzzyQuery(params)
      if (res.data.code === 200) {
        if (res.data.result.length > 0) {
          this.inputList = res.data.result
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.navstop {
  // height: 300px;
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
  overflow: inherit; //  让溢出的部分自有显示  也不会有滚动条
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
        .searchList {
          box-sizing: content-box;
          width: 100%;
          // height: 50px;
          position: absolute;
          z-index: 9999;
          float: left;
          left: -3px;

          top: 47px;
          background-color: rgba(255, 255, 255, 1);
          border: 3px solid #e74c3c;
          border-top: none;
          > ul {
            > li {
              width: 100%;
              height: 40px;
              padding-left: 15px;
              color: #333;
              font-size: 16px;
              line-height: 40px;
              cursor: pointer;
            }
            > li:hover {
              color: #e74c3c;
            }
          }
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
}
</style>

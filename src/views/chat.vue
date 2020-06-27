<template>
  <div class="chat">
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
    <div class="chatForm">
      <div class="header">
        <div>
          <img src="@/assets/imgs/maijia.png" width="100%" height="100%" alt />
        </div>
        <div class="eo">
          <div>简心小蜜</div>
          <div>专门为您提供咨询、订单、支付等问题，快速响应</div>
        </div>
      </div>
      <div class="content">
        <div>
          <div>
            <div class="chatmsg">
              <div
                class="conts"
                v-for="(item,index) in msg"
                :key="index"
                :class="item.userid===undefined?'change':''"
              >
                <div class="item">
                  <div class="headers">
                    <img
                      v-show="item.userid!==undefined"
                      src="@/assets/imgs/shangjia.png"
                      width="100%"
                      height="100%"
                      alt
                    />
                    <img
                      v-show="item.userid===undefined"
                      :src="usermsg.header"
                      width="100%"
                      height="100%"
                      alt
                    />
                  </div>
                  <div class="form">{{item.text}}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span>何时发货</span>
            <span>退换问题</span>
          </div>
          <div>
            <div class="top">
              <img src="@/assets/imgs/smile.png" width="20px" height="20px" alt />
              <img src="@/assets/imgs/photo.png" width="20px" height="20px" alt />
            </div>
            <div class="text">
              <input type="text" v-model="text" />
              <button @click="send">发送</button>
            </div>
          </div>
        </div>
        <div>
          <div class="qrcode">
            <img src="@/assets/imgs/qrcode.jpg" width="100%" height="100%" alt />
          </div>
          <p class="tag">商业合作，联系卖家</p>
          <ul>
            <li>急速响应</li>
            <li>贴心服务</li>
            <li>随时随地，一触即达</li>
          </ul>
          <p class="chats">
            <span>
              <i class="el-icon-phone-outline"></i>服务热线
            </span>
            <i class="el-icon-arrow-down"></i>
          </p>
          <p class="way">
            <span>qq:1002661758</span>
            <span>微信：ysh15120</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      userid: '',
      text: '',
      msg: [{ text: 'hello word' }, { text: 'sknmdlsn' }],
      usermsg: {}
    }
  },
  mounted() {
    this.name = sessionStorage.getItem('user')
      ? sessionStorage.getItem('user')
      : ''
    this.userid = sessionStorage.getItem('loginUserId')
      ? sessionStorage.getItem('loginUserId')
      : ''
    this.getUserMsg()
    this.sockets.listener.subscribe('ids', data => {
      this.id = data
      this.$socket.emit('beforestage', {
        id: this.id,
        userid: this.userid
      })
    })
    this.sockets.listener.subscribe('touser', data => {
      this.msg.push(data)
    })
  },
  methods: {
    async getUserMsg() {
      let res = await this.$api.user.getUserMsg({ id: this.userid })
      console.log(res)
      this.usermsg = res.data[0]
      console.log(this.usermsg)
    },
    logout() {},
    send() {
      let obj = { text: this.text }
      this.$socket.emit('tobacks', obj)
      this.msg.push(obj)
      this.text = ''
    }
  }
}
</script>

<style lang="less" scoped>
.chat {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/imgs/chatbg1.jpg');
  background-size: cover;
  // background-color: blueviolet;
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
.chatForm {
  width: 1000px;
  height: 570px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  margin: 100px auto 0px auto;
  .header {
    width: 100%;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    padding-left: 30px;
    & > div:nth-child(1) {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
    }
    .eo {
      display: flex;
      align-items: flex-end;
      & > div:nth-child(1) {
        font-size: 23px;
        color: rgb(102, 102, 102);
        font-style: italic;
        font-weight: bold;
      }
      & > div:nth-child(2) {
        padding-left: 15px;
        font-size: 12px;
        color: #333;
      }
    }
  }
  .content {
    flex-grow: 1;
    display: flex;
    & > div:nth-child(1) {
      width: 73%;
      height: 100%;
      // background-color: skyblue;
      display: flex;
      flex-direction: column;
      padding: 0 15px;
      & > div:nth-child(1) {
        width: 100%;
        height: 396px;
        // background-color: #1abc9c;
        .chatmsg {
          width: 100%;
          height: 100%;
          overflow: auto;
          .conts {
            width: 100%;

            .item {
              max-width: 500px;
              // height: 40px;
              // background-color: slateblue;
              margin-top: 8px;
              display: flex;
              .headers {
                width: 40px;
                height: 40px;
                // background-color: slategray;
                border-radius: 10px;
              }
              .form {
                max-width: 450px;
                background-color: #fff;
                color: #333;
                margin-left: 8px;
                padding: 5px 10px;
                border-radius: 8px 0 8px 0;
                font-size: 14px;
              }
            }
          }
          .change {
            display: flex;
            flex-direction: row-reverse;
            .item {
              flex-direction: row-reverse;
              .form {
                margin-right: 8px;
                border-radius: 0 8px 0 8px;
                background-color: rgb(225, 221, 140);
                color: #333;
              }
            }
          }
        }
      }
      & > div:nth-child(2) {
        width: 100%;
        height: 50px;
        // background-color: #9b59b6;
        display: flex;
        align-items: center;
        // padding-left: 15px;
        span {
          display: inline-block;
          color: #333;
          font-size: 14px;
          padding: 2px 8px;
          border-radius: 10px;
          margin-right: 10px;
          background-color: #fff;
        }
      }
      & > div:nth-child(3) {
        flex-grow: 1;
        background-color: #fff;
        margin-left: -15px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 5px;
        .top {
          img {
            margin-right: 5px;
            margin-top: 5px;
          }
        }
        .text {
          width: 100%;
          display: flex;
          justify-content: space-between;
          input {
            border: none;
            outline: none;
            flex-grow: 1;
          }
          button {
            width: 78px;
            height: 31px;
            font-size: 14px;
            color: #999;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            background-color: #e9ecee;
            border: none;
            outline: none;
            transition: all ease-in-out 0.3s;
          }
          button:hover {
            background-color: #ff6700;
            color: #fff;
          }
        }
      }
    }
    & > div:nth-child(2) {
      width: 27%;
      height: 100%;
      // background-color: slateblue;
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 20px;
      .qrcode {
        width: 100px;
        height: 100px;
        margin: 0 auto;
      }
      .tag {
        font-style: 14px;
        color: #333;
        padding: 20px 0 25px 0;
      }
      ul {
        font-size: 12px;
        color: #666;
        list-style: disc;
        padding-left: 20px;
      }
      .chats {
        font-size: 14px;
        color: #333;
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
      }
      .way {
        font-size: 12px;
        color: #666;
        display: flex;
        flex-direction: column;
        span {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
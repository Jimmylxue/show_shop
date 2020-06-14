<template>
  <div class="root">
    <div class="container">
      <div class="isregiste" ref="isregiste">
        <div class="touxiang">
          <img ref="touxiang" width="100%" height="100%" alt />
          <div class="add">
            <i class="fa fa-plus fa-lg"></i>
            <input type="file" accept="image/*" @change="changeimg" />
          </div>
        </div>
        <el-form
          :model="registermsg"
          :rules="rules"
          ref="registermsgs"
          status-icon
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            class="item"
            label="请输入手机号(Register Account)"
            label-width="auto"
            prop="userphone"
          >
            <el-input v-model="registermsg.userphone" placeholder="推荐手机号或邮箱"></el-input>
          </el-form-item>
          <el-form-item
            class="item"
            label="请输入密码(Register Password)"
            label-width="auto"
            prop="userpsd"
          >
            <el-input v-model="registermsg.userpsd" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item
            class="item"
            label="请输入注册昵称(Register UserName)"
            label-width="auto"
            prop="uname"
          >
            <el-input v-model="registermsg.uname" placeholder="请输入中英文昵称"></el-input>
          </el-form-item>
        </el-form>
        <div class="read">
          <input type="checkbox" :checked="checkstatus" @click="checkstatus = !checkstatus" />我已阅读并接受
          <a href>《用户协议》</a>和
          <a href>《隐私政策》</a>
        </div>
        <el-button type="primary" class="loginbtn" @click="registers">立即注册</el-button>
        <p>
          <span @click="$router.push('/login')">已有账号? 马上登录</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      checkstatus: false,
      registermsg: {
        userphone: '19905076420',
        userpsd: '123456789',
        uname: 'jack',
        header: '',
        headername: ''
      },
      rules: {
        userphone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        userpsd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        uname: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    // 头像切换
    changeimg(e) {
      console.log(e.target.files[0])
      const files = e.target.files[0]
      const render = new FileReader()
      let imgFile
      // let that = this
      render.readAsDataURL(files)
      render.onload = e => {
        imgFile = e.target.result
        // console.log(imgFile)
        // console.log(Base64.decode(imgFile))
        const arr = imgFile.split(',')
        this.registermsg.headername = arr[0]
        this.registermsg.header = arr[1]
        this.$refs.touxiang.src = e.target.result
        // console.log(imgFile)
        // console.log(imgsrc)
      }
    },

    // 注册
    registers() {
      if (this.checkstatus === false) {
        this.$message.error('请先勾选用户须知手册')
        return
      }
      this.$refs.registermsgs.validate(valid => {
        if (valid && this.registermsg.header !== '') {
          // console.log('hello')
          this.register(this.registermsg)
            .then(code => {
              if (code === 1) {
                this.$message({
                  message: '恭喜你，注册成功',
                  type: 'success'
                })
              }
            })
            .catch(() => {
              this.$message.error('注册失败，请重试')
            })
        } else {
          if (this.registermsg.header === '') {
            this.$message.error('别忘记上传一张帅气的头像呢~')
            return
          }
          this.$message.error('请填写正确的信息哦~')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/bg/01.jpg);
  background-position: 0 140px;
  .container {
    width: 80%;
    height: 100vh;
    // border: 1px solid #ccc;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .code {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;
      .reflash {
        position: absolute;
        right: 5px;
        top: 10px;
        color: #bbb;
      }
      input {
        height: 40px;
        margin-right: auto;
        border: 1px solid #dcdfe6;
        color: #606266;
        padding-left: 15px;
        outline: none;
        border-radius: 4px;
        // margin-top: 18px;
        // position: relative;
      }
      .img {
        width: 110px;
        height: 60px;
        // border: 1px solid #ccc;
      }
    }
    .read {
      font-size: 0.9rem;
      input {
        margin: 0 5px;
      }
      margin: 20px 0 20px 0;
    }
    p {
      text-align: center;
      font-size: 0.9rem;
      color: #409eff;
      margin-top: 10px;
      span {
        cursor: pointer;
        &:hover {
          border-bottom: 1px solid #409eff;
        }
      }
    }
  }
  .loginbtn {
    width: 100%;
  }
  a {
    color: #409eff;
  }
  .item {
    margin: 8px 0;
  }
}
.isregiste {
  // display: none;
  flex-direction: column;
  .touxiang {
    width: 80px;
    height: 80px;
    border: 1px solid #ccc;
    margin: 0 auto;
    border-radius: 50%;
    // overflow: hidden;
    position: relative;
    background-image: url(../assets/imgs/touxiang.png);
    background-size: cover;
    .add {
      position: absolute;
      width: 40px;
      height: 40px;
      right: -40px;
      top: 20px;
      // background: rosybrown;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover i {
        transform: rotate(90deg);
      }
      i {
        transition: all 0.5s ease-in-out;
        font-weight: 200;
        color: rgb(204, 214, 219);
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
    }
  }
}
</style>

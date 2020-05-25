<template>
  <div class="root">
    <div class="container">
      <div class="formbox">
        <div class="islogin" ref="islogin">
          <img src="../assets/imgs/logo.jpg" width="250px" height="80px" alt />
          <el-form
            :model="ruleForm"
            :rules="rules"
            status-icon
            ref="ruleForms"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="请输入账号(Login Account)" label-width="auto" prop="userid">
              <el-input v-model="ruleForm.userid" placeholder="请输入登录账号"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码(Login Password)" label-width="auto" prop="userpsd">
              <el-input v-model="ruleForm.userpsd" placeholder="请输入登录密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="code">
            <div class="fa fa-refresh reflash" @click="reflash"></div>
            <input type="text" v-model="VerificationCode" placeholder="请输入验证码" />
            <div class="img">
              <img ref="imgs" width="100%" height="100%" src="/api//client/user/login" alt />
            </div>
          </div>
          <div class="cando">
            <a href="#" @click="toregisterpage">账号注册</a>
            <a href>密码找回</a>
          </div>
          <div class="read">
            <input type="checkbox" :checked="checkstatus" @click="checkstatus = !checkstatus" />我已阅读并接受
            <a href>《用户协议》</a>和
            <a href>《隐私政策》</a>
          </div>
          <el-button type="primary" class="loginbtn" @click="submitForm(ruleForm)">登录</el-button>
        </div>
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
              label="请输入账号(Register Account)"
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
              prop="username"
            >
              <el-input v-model="registermsg.username" placeholder="请输入中英文昵称"></el-input>
            </el-form-item>
          </el-form>
          <div class="read">
            <input type="checkbox" :checked="checkstatus" @click="checkstatus = !checkstatus" />我已阅读并接受
            <a href>《用户协议》</a>和
            <a href>《隐私政策》</a>
          </div>
          <el-button type="primary" class="loginbtn" @click="register(ruleForm)">立即注册</el-button>
          <p>
            <span @click="tologinpage">已有账号? 马上登录</span>
          </p>
        </div>
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
      VerificationCode: '',
      ruleForm: {
        userid: '12345678',
        userpsd: '123456789'
      },
      registermsg: {
        userphone: '19905076420',
        userpsd: '123456789',
        username: 'jack',
        header: ''
      },
      rules: {
        userid: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          {
            min: 8,
            max: 12,
            message: '长度在 8 到 12 个字符',
            trigger: 'blur'
          },
          { validator: '', trigger: 'blur' }
        ],
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
        username: [
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
    ...mapActions(['login', 'getCode', 'register']),
    submitForm() {
      if (this.checkstatus === false) {
        this.$message.error('请先勾选用户须知手册')
        return
      }
      if (this.VerificationCode === '') {
        this.$message.error('请填写验证码')
        return
      }
      this.$refs.ruleForms.validate(valid => {
        if (valid) {
          this.login({ form: this.ruleForm, code: this.VerificationCode })
            .then(code => {
              if (code === 0) {
                this.$message({
                  message: '恭喜你，登录成功',
                  type: 'success'
                })
                this.$router.push('/')
                return
              }
            })
            .catch(err => {
              console.log(err.body)
              this.$message.error('账号或密码错误~')
            })
          // conrage.setItem('user', 'Jimmy')
        }
      })
    },
    // 注册
    register() {
      if (this.checkstatus === false) {
        this.$message.error('请先勾选用户须知手册')
        return
      }
      this.$refs.registermsgs.validate(valid => {
        if (valid && this.registermsg.header !== '') {
          // console.log('hello')
          this.register(this.registermsg)
          // this.$message({
          //   message: '恭喜你，注册成功',
          //   type: 'success'
          // })
        } else {
          if (this.registermsg.header === '') {
            this.$message.error('别忘记上传一张帅气的头像呢~')
            return
          }
          this.$message.error('请填写正确的信息哦~')
          return false
        }
      })
    },
    tologinpage() {
      this.$refs.isregiste.style.display = 'none'
      this.$refs.islogin.style.display = 'flex'
    },
    toregisterpage() {
      this.$refs.islogin.style.display = 'none'
      this.$refs.isregiste.style.display = 'flex'
    },
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
        this.registermsg.header = arr[1]
        this.$refs.touxiang.src = e.target.result
        // console.log(imgFile)
        // console.log(imgsrc)
      }
    },
    reflash() {
      this.$refs.imgs.src = `/api//client/user/login?time = ${Date.now()}`
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
    .formbox {
      width: 350px;
      // height: 400px;
      // border: 1px solid #ccc;
      display: flex;
      padding: 0 20px 0 20px;
      flex-direction: column;
      justify-content: center;
      // align-items: center;
      .islogin {
        display: flex;
        flex-direction: column;
        img {
          margin: 0 auto;
        }
      }

      .loginbtn {
        width: 100%;
      }
    }
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
    .cando {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      margin: 0 0 10px 0;
      a:nth-child(2) {
        color: #ccc;
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
  a {
    color: #409eff;
  }
  .item {
    margin: 8px 0;
  }
}
.isregiste {
  display: none;
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

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
              <el-input v-model="ruleForm.userpsd" type="password" placeholder="请输入登录密码"></el-input>
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
            <a href="#" @click="$router.push('/register')">账号注册</a>
            <a href>密码找回</a>
          </div>
          <div class="read">
            <input type="checkbox" :checked="checkstatus" @click="checkstatus = !checkstatus" />我已阅读并接受
            <a href>《用户协议》</a>和
            <a href>《隐私政策》</a>
          </div>
          <el-button type="primary" class="loginbtn" @click="submitForm(ruleForm)">登录</el-button>
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
        userid: '173117031',
        userpsd: 'yshzx171107.'
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
        userpsd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['login', 'getCode']),
    // ...mapMutations(['setLoginUserMsg']),
    submitForm() {
      if (this.checkstatus === false) {
        this.$swal('哎吼~', '清先勾选用户手册~', 'error')
        return
      }
      if (this.VerificationCode === '') {
        this.$swal('哎吼~', '请填写验证码~', 'error')
        return
      }
      this.$refs.ruleForms.validate(valid => {
        if (valid) {
          this.login({ form: this.ruleForm, code: this.VerificationCode })
            .then(code => {
              console.log('kjj', code)
              if (code === 1) {
                this.$swal('哎吼~', '登录成功~', 'success')
                // this.setLoginUserMsg(userid)
                this.$router.push('/')
                return
              }
              this.$swal('哎吼~', '账号或密码错误~', 'error')
            })
            .catch(() => {
              this.$swal('哎吼~', '账号或密码错误~', 'error')
            })
        }
      })
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
</style>

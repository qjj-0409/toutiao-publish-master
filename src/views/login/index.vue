<template>
  <div class="login-container">
    <div class="login-box">
      <el-form class="login-from" ref="login-form" :rules="fromRules" :model="user">
          <img src="./logo_index.png">
          <el-form-item prop="mobile">
              <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="code">
              <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item prop="agree">
              <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
              <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onLogin">登录</el-button>
          </el-form-item>
      </el-form>
      </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginLoading: false,
      fromRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[35789]\d{9}$/, message: '请输入正确的手机号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 收集表单数据
      // const user = this.user
      // 验证登陆信息
      this.$refs['login-form'].validate(valid => {
        // 表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过，请求登录
        this.login()
      })
    },
    login () {
      // 发送登录请求
      // 开启登陆中
      this.loginLoading = true

      login(this.user).then(res => {
        console.log(res)
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 添加token到本地存储
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        // 关闭 loading
        this.loginLoading = false

        // 登录成功，跳转到后台首页（编程式导航）
        this.$router.push({ name: 'home' })
      }).catch(err => {
        console.log('登陆失败：' + err)
        this.$message.error('登陆失败，手机号或者验证码错误')

        // 关闭 loading
        this.loginLoading = false
      })
    }
  }
}
</script>
<style scoped lang="less">
  .login-container {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: url('./login_bg.jpg') no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      .login-box {
          padding: 0 50px;
          background-color: #fff;
          width: 400px;
          box-sizing: border-box;
          .login-from {
              img {
                  width: 50%;
                  margin: 20px 0 20px 60px;
              }
              .login-btn {
                  width: 100%;;
              }
          }
      }
  }
</style>

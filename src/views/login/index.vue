<template>
  <div class="login-container">
    <div class="login-box">
      <el-form class="login-from" ref="form" :model="user">
          <img src="./logo_index.png">
          <el-form-item>
              <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item>
              <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item>
              <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
              <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onLogin">登录</el-button>
          </el-form-item>
      </el-form>
      </div>
  </div>
</template>

<script>
// 导入request
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: true,
      loginLoading: false
    }
  },
  methods: {
    onLogin () {
      // 收集表单数据
      const user = this.user
      // 验证登陆信息
      // 发送登录请求
      // 开启登陆中
      this.loginLoading = true

      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        console.log(res)
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 关闭 loading
        this.loginLoading = false
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

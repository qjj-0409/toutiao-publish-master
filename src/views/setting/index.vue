<template>
  <div class="setting-container">
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /面包屑导航 -->
      <el-row>
        <el-col :span="10">
          <!-- 表单区域 -->
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号:">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机:">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存设置</el-button>
            </el-form-item>
          </el-form>
          <!-- /表单区域 -->
        </el-col>
        <el-col :span="8" :offset="6">
          <!-- 头像区域 -->
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="user.photo"
          ></el-avatar>
          <p>点击修改头像</p>
          <!-- /头像区域 -->
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'SettingIndex',
  props: {},
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {
        id: null, // id编号
        name: '', // 媒体名称
        intro: '', // 媒体介绍
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.uploadUserInfo()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // 获取用户个人信息
    uploadUserInfo () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

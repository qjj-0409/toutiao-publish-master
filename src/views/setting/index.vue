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
        <!-- 表单区域 -->
        <el-col :span="10">
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
        </el-col>
        <!-- /表单区域 -->
        <!-- 头像区域 -->
        <el-col :span="8" :offset="6">
          <label for="file">
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="user.photo"
            ></el-avatar>
          <p>点击修改头像</p>
          </label>
          <input
            id="file"
            type="file"
            hidden
            ref="file"
            @change="onFileChange"
          >
        </el-col>
        <!-- /头像区域 -->
      </el-row>
    </el-card>
    <!-- 弹出层 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%"
    >
      <img
        class="previewImage"
        :src="previewImage"
        alt="">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /弹出层 -->
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
      },
      dialogVisible: false, // 是否显示弹出层对话框
      previewImage: '' // 预览图片路径
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
        this.user = res.data.data
      })
    },
    // 上传图片改变
    onFileChange () {
      const file = this.$refs.file
      // console.dir(file)
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      // 显示弹出层
      this.dialogVisible = true
      // 解决选择相同文件不触发change事件问题
      this.$refs.file.value = ''
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.previewImage {
  width: 60%;
}
</style>

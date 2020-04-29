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
          <el-form
            ref="form"
            :rules="rules"
            :model="user"
            label-width="90px"
          >
            <el-form-item label="编号:">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机:">
              {{user.mobile}}
            </el-form-item>
            <el-form-item prop="name" label="媒体名称:">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item prop="intro" label="媒体介绍:">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱:">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="updataUserLoading"
                @click="onUpdateUserInfo"
              >保存设置</el-button>
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
      @opened="onDialogOpend"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          ref="preview-image"
          :src="previewImage"
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onUpdatePhoto"
          :loading="updatePhotoLoading"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- /弹出层 -->
  </div>
</template>

<script>
import {
  getUserProfile,
  updataUserPhoto,
  updataUserProfile
} from '@/api/user'
// 引入cropperjs的css和js文件
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
// 引入global-bus全局通信总线
import globalBus from '@/utils/global-bus'
export default {
  name: 'SettingIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        id: null, // id编号
        name: '', // 媒体名称
        intro: '', // 媒体介绍
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
        ]
      },
      dialogVisible: false, // 是否显示弹出层对话框
      previewImage: '', // 预览图片路径
      cropper: null, // cropper剪切器实例
      updatePhotoLoading: false, // 上传头像的loading
      updataUserLoading: false // 更新用户信息的loadin
    }
  },
  computed: {},
  watch: {},
  created () {
    this.uploadUserInfo()
  },
  methods: {
    onUpdateUserInfo () {
      // 点击按钮，开启loading
      this.updataUserLoading = true
      // 表单验证
      this.$refs.form.validate(valid => {
        // 如果表达验证失败，停止请求提交
        if (!valid) {
          // 关闭loading
          this.updataUserLoading = false
          return
        }
        // 验证通过
        updataUserProfile(this.user).then(res => {
          // 保存成功，关闭loading
          this.updataUserLoading = false
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          // 发布通信事件
          globalBus.$emit('updateUser', this.user)
        }).catch(err => {
          console.log('错误：' + err)
          this.$message({
            type: 'waring',
            message: '更改失败'
          })
        })
      })
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
    },
    onDialogOpend () {
      // 获取图片的DOM节点
      const image = this.$refs['preview-image']
      // 初始化裁剪器
      this.cropper = new Cropper(image, {
        aspectRatio: 1, // 裁剪框比例
        viewMode: 1 // 限制裁切框移动范围不超过图片
      // 当你移动裁剪框的时候调用crop方法
      // crop(event) {
      //   console.log(event.detail.x);
      //   console.log(event.detail.y);
      //   console.log(event.detail.width);
      //   console.log(event.detail.height);
      //   console.log(event.detail.rotate);
      //   console.log(event.detail.scaleX);
      //   console.log(event.detail.scaleY);
      // },
      })
    },
    onDialogClosed () {
      // 销毁裁剪器，重新初始化
      this.cropper.destroy()
    },
    onUpdatePhoto () {
      // 开启loaging
      this.updatePhotoLoading = true
      // 获取裁切的图片对象
      // getCroppedCanvas()方法的返回值是HTMLCanvasElement（canvas对象）
      // 如果浏览器支持“HTMLCanvasElement.toBlob”，则将裁剪后的图像上传到服务器。
      // “toBlob”的第二个参数的默认值是“image/png”，如果需要可以更改它
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求提交fd，更新用户头像
        updataUserPhoto(fd).then(res => {
          // 关闭loading
          this.updatePhotoLoading = false
          // 关闭对话框
          this.dialogVisible = false
          // 更新视图展示
          // this.user.photo = res.data.data.photo
          this.user.photo = window.URL.createObjectURL(file)
          // 发布通信事件
          globalBus.$emit('updateUser', this.user)
        })
      })
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.preview-image-wrap {
  .preview-image {
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>

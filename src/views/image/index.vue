<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <div style="padding-bottom:20px" class="image-flex">
        <el-radio-group
         v-model="collect"
         size="medium"
         @change="loadImages()"
        >
          <el-radio-button
           :label="false"
          >全部</el-radio-button>
          <el-radio-button
           :label="true"
          >收藏</el-radio-button>
        </el-radio-group>
        <el-button
         type="success"
         size="medium"
         @click="dialogVisible = true"
        >添加素材</el-button>
      </div>
      <el-row :gutter="20" v-model="images">
        <el-col :xs="12" :sm="6" :md="6" :lg="4"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image
          style="height: 100px"
          :src="img.url"
          fit="cover"></el-image>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="上传素材"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        name="image"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        :on-success="onUploadSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// 导入图片相关的接口
import { getImages } from '@/api/image.js'
export default {
  name: 'ImageIndex',
  props: {},
  components: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      images: [], // 素材列表
      collect: false, // 是否收藏图片
      dialogVisible: false, // 是否显示对话框
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (collect = false) {
      getImages({
        collect: this.collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogVisible = false
      // 重新渲染素材列表
      this.loadImages(false)
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.image-flex {
  display: flex;
  justify-content: space-between;
}
</style>

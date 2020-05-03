<template>
  <div class="upload-cover" @click="openDialog">
    <!-- <el-image
      class="cover-image"
      ref="cover-image"
      :src="$route.query.id ? coverImage : currentImage"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image> -->
    <div class="cover-wrap">
      <img :src="value" ref="cover-image" class="cover-image">
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <image-list
            :is-show-add="false"
            :is-show-action="false"
            is-show-selected
            ref="image-list"
          ></image-list>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
         <input
            type="file"
            id="file"
            ref="file"
            hidden
            @change="uploadImageChange"
          >
          <label for="file">
            <img
              id="preview-image"
              ref="preview-image"
            >
          </label>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/image-list'

export default {
  name: 'UploadCover',
  // props: ['cover-image'], // 子组件中接收父组件传递的值
  props: ['value'],
  components: {
    ImageList
  },
  data () {
    return {
      dialogVisible: false,
      activeName: 'second',
      currentImage: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    uploadImageChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 预览图片
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
    },
    onCoverConfirm () {
      // 如果tab是上传图片，并且input-file有选择的文件，才执行上传图片的操作
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        // 执行上传文件的操作
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          // console.log(res)
          // 关闭弹出层
          this.dialogVisible = false
          // 展示上传的图片
          // this.$refs['cover-image'].src = res.data.data.url
          this.currentImage = res.data.data.url
          // 将图片发送给父组件
          // this.$emit('update-cover', res.data.data.url)
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择封面图片')
          return
        }
        // 关闭对话框
        this.dialogVisible = false
        // 修改父组件绑定的数据
        this.$emit('input', imageList.images[selected].url)
      }
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.cover-wrap {
  width: 150px;
  height: 160px;
  line-height: 160px;
  border: 1px dashed #ccc;
  font-size: 30px;
  color: #ccc;
  text-align: center;
  .cover-image {
    height: 160px;
    max-width: 100%
  }
}
#preview-image {
  width: 150px;
  height: 160px;
}
</style>

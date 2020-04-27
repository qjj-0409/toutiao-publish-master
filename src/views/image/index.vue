<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding-bottom:20px" class="image-flex">
        <el-radio-group
         v-model="collect"
         size="medium"
         :disabled="loading"
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
         :disabled="loading"
         @click="dialogVisible = true"
        >添加素材</el-button>
      </div>
      <el-row :gutter="20" v-model="images" v-loading="loading">
        <el-col :xs="12" :sm="6" :md="6" :lg="4"
          class="img-box"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image
          style="height: 100px"
          :src="img.url"
          fit="cover"
          ></el-image>
          <div class="img-mask">
            <span
              class="el-icon-star-off icon-xing"
              :style="img.is_collected ? 'color:red' : 'color:white'"
              @click="isCollect(!img.is_collected, img.id)"
            ></span>
            <span
              class="el-icon-delete icon-del"
              @click="delImage(img.id)"
            ></span>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        class="image-pag"
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        :disabled="loading"
        @current-change="onCurrentChange"
      >
      </el-pagination>
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
import {
  getImages,
  isCollectImage,
  delImage
} from '@/api/image.js'
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
      },
      pageSize: 12, // 每页显示条数
      totalCount: 0, // 总素材条数
      currentPage: 1, // 当前页
      loading: false, // 是否显示加载中
      imageCollect: false // 当前图片是否收藏
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (page, collect = false) {
      // 加载中
      this.loading = true
      getImages({
        page,
        per_page: this.pageSize,
        collect: this.collect
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.images = results
        this.totalCount = totalCount
        // 关闭加载中
        this.loading = false
      })
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogVisible = false
      // 重新渲染素材列表
      this.loadImages(this.currentPage, false)
    },
    onCurrentChange (page) {
      // 当页码改变的时候重新渲染素材列表
      this.loadImages(page)
    },
    isCollect (isCollected, imageId) {
      isCollectImage(isCollected, imageId).then(res => {
        console.log(res)
        // 更改收藏成功，刷新页面
        this.loadImages(this.currentPage)
      })
    },
    delImage (imageId) {
      this.$confirm('确定删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delImage(imageId).then(res => {
          this.$message({
            message: res.message,
            type: 'success'
          })
          // 删除成功，更新素材列表
          this.loadImages(this.currentPage)
        }).catch(err => {
          console.log('错误：' + err)
          this.$message.error('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
.img-box {
  position: relative;
  margin-bottom: 20px;
}
.img-mask {
  position: absolute;
  bottom: 4px;
  margin: 0 auto;
  height: 28px;
  line-height: 28px;
  background: rgba(0,0,0,.3);
  width: 90%;
  text-align: center;
  .icon-xing {
    margin: 0 15px;
    color: #fff;
  }
  .icon-del {
    margin: 0 15px;
    color: #fff;
  }
}
</style>

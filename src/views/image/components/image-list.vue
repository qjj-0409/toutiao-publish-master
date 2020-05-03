<template>
  <div class="image-container">
    <el-card class="box-card">
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
         v-if="isShowAdd"
         type="success"
         size="medium"
         :disabled="loading"
         @click="dialogVisible = true"
        >添加素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="20" v-model="images" v-loading="loading">
        <el-col :xs="12" :sm="6" :md="6" :lg="4"
          class="img-box"
          v-for="(img, index) in images"
          :key="index"
          @click.native="selected = index"
        >
          <el-image
          style="height: 100px"
          :src="img.url"
          fit="cover"
          lazy
          ></el-image>
          <div
            class="selected"
            v-if="isShowSelected && selected === index"
          ></div>
          <div v-if="isShowAction" class="img-mask">
            <!-- 收藏图标 -->
            <!-- <span
              class="el-icon-star-off icon-xing"
              :style="img.is_collected ? 'color:red' : 'color:white'"
              @click="isCollect(img)"
            ></span> -->
            <el-button
              class="el-icon-star-off icon"
              :class="{red: img.is_collected}"
              circle
              size="mini"
              :loading="img.isLoading"
              @click="isCollect(img)"
            ></el-button>
            <!-- 删除图标 -->
            <el-button
              class="el-icon-delete icon-del icon"
              circle
              :loading="img.isLoading"
              @click="delImage(img)"
            ></el-button>
          </div>
        </el-col>
      </el-row>
      <!-- /素材列表 -->

      <!-- 分页组件 -->
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
      <!-- /分页组件 -->
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
  name: 'ImageList',
  props: {
    // 是否显示添加素材
    isShowAdd: {
      type: Boolean, // 布尔值
      default: true // 默认值
    },
    // 是否显示图片下方的操作（收藏和删除）
    isShowAction: {
      type: Boolean,
      default: true
    },
    // 是否显示选中状态的对勾
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
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
      pageSize: 6, // 每页显示条数
      totalCount: 0, // 总素材条数
      currentPage: 1, // 当前页
      loading: false, // 是否显示加载中
      selected: null // 选中的索引
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  methods: {
    loadImages (page = 1, collect = false) {
      // 加载中
      this.loading = true
      this.currentPage = page
      getImages({
        page,
        per_page: this.pageSize,
        collect: this.collect
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        results.forEach(img => {
          img.isLoading = false
        })
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
    isCollect (img) {
      img.isLoading = true
      isCollectImage(!img.is_collected, img.id).then(res => {
        this.$message({
          message: `${!img.is_collected ? '收藏' : '取消收藏'}成功`,
          type: 'success'
        })
        // 重置素材的收藏状态
        img.is_collected = !img.is_collected
        img.isLoading = false
      }).catch(err => {
        img.isLoading = false
        console.log('错误：' + err)
        this.$message.error('操作失败')
      })
    },
    delImage (img) {
      img.isLoading = true
      this.$confirm('确定删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delImage(img.id).then(res => {
          this.$message({
            message: res.message,
            type: 'success'
          })
          // 删除成功，更新素材列表
          this.loadImages(this.currentPage)
          img.isLoading = false
        }).catch(err => {
          console.log('错误：' + err)
          this.$message.error('删除失败')
        })
      }).catch(() => {
        img.isLoading = false
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  .red {
    color:red
  }
  .icon {
    background-color: transparent;
    border: 0;
    font-size: 20px;
  }
}
.selected {
  background: url('./selected.png') no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

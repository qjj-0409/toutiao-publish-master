<template>
  <div class="comment-container">
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /面包屑导航 -->
      <!-- 评论列表 -->
      <el-table
        :data="comments"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="评论状态"
        >
          <template slot-scope="scope">
           {{scope.row.comment_status ? '正常' : '关闭'}}
          </template>
        </el-table-column>
        <el-table-column
        label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.loading"
              @change="changeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- /评论列表 -->
      <!-- 分页组件 -->
      <el-pagination
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page.sync="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="loading"
      >
      </el-pagination>
      <!-- /分页组件 -->
    </el-card>
  </div>
</template>

<script>
import {
  getArticle,
  updateCommentStatus
} from '@/api/article'
export default {
  name: 'CommentIndex',
  props: {},
  components: {},
  data () {
    return {
      comments: [], // 评论列表
      totalCount: 0, // 总评论数
      page: 1, // 当前页
      perPage: 10, // 每页显示条数
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadComments(1)
  },
  methods: {
    onloadComments (page = 1) {
      // 开启加载中
      this.loading = true
      this.page = page
      getArticle({
        page,
        per_page: this.perPage,
        response_type: 'comment'
      }).then(res => {
        console.log(res)
        const { results, total_count: totalCount } = res.data.data
        results.forEach(article => {
          article.loading = false
        })
        this.comments = res.data.data.results
        this.totalCount = totalCount
        // 关闭加载中
        this.loading = false
      }).catch(err => {
        console.log('错误：' + err)
        // 关闭加载中
        this.loading = false
      })
    },
    changeStatus (row) {
      // 打开loading，禁用开关
      row.loading = true
      // 请求提交修改
      updateCommentStatus(row.id.toString(), row.comment_status).then(res => {
        this.$message({
          type: 'success',
          message: row.comment_status ? '开启评论功能' : '关闭评论功能'
        })
        // 关闭loading，启用开关
        row.loading = false
      })
    },
    handleSizeChange () {
      this.onloadComments()
    },
    handleCurrentChange () {
      this.onloadComments(this.page)
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.page {
  margin-top: 20px;
}
</style>

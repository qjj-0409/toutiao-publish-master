<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="comments"
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
          label="状态"
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
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getArticle } from '@/api/comment.js'
export default {
  name: 'CommentIndex',
  props: {},
  components: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      comments: [], // 评论列表
      totalCount: 0, // 总评论数
      page: 1, // 当前页
      perPage: 20 // 每页显示条数
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadComments()
  },
  methods: {
    onloadComments () {
      getArticle({
        page: 1,
        per_page: this.perPage,
        response_type: 'comment'
      }).then(res => {
        console.log(res)
        this.comments = res.data.data.results
      }).catch(err => {
        console.log('错误：' + err)
      })
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

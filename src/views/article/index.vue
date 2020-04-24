<template>
  <div class="article-container">
    <el-card class="box-card first-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据选择条件共查询到0条结果：</span>
      </div>
      <!-- 数据列表 -->
      <el-table
      :data="articles"
      stripe
      style="width: 100%">
        <el-table-column
          prop="date"
          label="封面">
          <img src="" alt="">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="warning">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template>
            <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain></el-button>
            <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 分页列表 -->
      <el-pagination
        background
        class="article-page"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
      <!-- /分页列表 -->
    </el-card>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  props: {},
  components: {},
  data () {
    return {
      form: {
        name: 'ArticleIndex',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'warning' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      getArticle().then(res => {
        this.articles = res.data.data.results
      })
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.first-card {
  margin-bottom: 20px;
}
.article-page {
  margin: 20px;
  float: right;
}
</style>

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
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择活动区域">
            <el-option
            label="全部"
            :value="null"
            ></el-option>
            <el-option
            v-for="(channel, index) in channels"
            :key="index"
            :label="channel.name"
            :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
          type="primary"
          :disabled="isLoading"
          @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据选择条件共查询到{{totalCount}}条结果：</span>
      </div>
      <!-- 数据列表 -->
      <!-- Element 提供了两种调用 Loading 的方法：指令和服务。对于自定义指令v-loading，只需要绑定Boolean即可。 -->
      <el-table
      :data="articles"
      stripe
      v-loading="isLoading"
      style="width: 100%">
        <el-table-column
          prop="date"
          label="封面">
          <template slot-scope="scope">
          <el-image
           style="width: 100px; height: 100px"
           :src="scope.row.cover.images[0]"
           fit="cover">
           <div slot="placeholder" class="image-slot">加载中</div>
           </el-image>
            <!-- <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]"
            class="article-cover"
            alt="">
            <img v-else
            src="./no-cover.gif"
            class="article-cover"
            alt=""> -->
            <!--
              下面这种情况是在运行期间动态改变处理的。
              而本地图片必须在打包的时候就存在。
             -->
            <!-- <img
              class="article-cover"
              :src="scope.row.cover.images[0] || './no-cover.gif'" alt=""
            > -->
          </template>
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

      <!--
        total 用来设定总数据的条数
        他默认按照 10 条每页计算总页码
        page-size 每页显示条目个数，支持 .sync 修饰符，默认每页 10 条数据
       -->
      <!-- 分页列表 -->
      <el-pagination
        background
        class="article-page"
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :disabled="isLoading"
        @current-change="onCurrentChange"
        >
      </el-pagination>
      <!-- /分页列表 -->
    </el-card>
  </div>
</template>

<script>
import { getArticle, getChannel } from '@/api/article'
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
      ],
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页显示条数
      status: null, // 查询文章的状态，不传就是全部
      channels: [], // 文章的频道列表
      channelId: null, // 频道的id
      rangeDate: null, // 筛选的范围日期
      isLoading: false // 是否显示加载
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
    this.getChannels()
  },
  methods: {
    loadArticles (page = 1) {
      // 开启loading加载
      this.isLoading = true
      // 发送axios请求
      getArticle({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截至日期
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        // 请求成功，关闭loading加载
        this.isLoading = false
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    getChannels () {
      getChannel().then(res => {
        this.channels = res.data.data.channels
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
.article-cover {
  width: 100px;
  background-size: cover;
}
.article-page {
  margin: 20px;
  float: right;
}
</style>

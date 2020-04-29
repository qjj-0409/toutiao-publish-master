<template>
  <div class="fans-container">
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /面包屑导航 -->
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="粉丝列表"
          name="first"
        >
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="粉丝画像"
          name="second"
        >粉丝画像</el-tab-pane>
      </el-tabs>
      <!-- 分页组件 -->
      <!-- <el-pagination
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
      </el-pagination> -->
      <!-- /分页组件 -->
    </el-card>
  </div>
</template>

<script>
import { getFansList } from '@/api/fans'
export default {
  name: 'FansIndex',
  props: {},
  components: {},
  data () {
    return {
      activeName: 'first',
      fans: [], // 粉丝列表
      currentPage: 1, // 当前页码
      pageSize: 20 // 每页显示数据量
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadFans()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 获取粉丝列表
    onloadFans (page = 1) {
      // 后端接口要求：per_page must be within the range 20 - 50
      getFansList({
        page,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        this.fans = res.data.data.results
      })
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

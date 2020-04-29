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
          <el-row :gutter="20" v-model="fans" v-loading="loading">
            <el-col
              :xs="12"
              :sm="8"
              :md="6"
              :lg="4"
              v-for="(item, index) in fans"
              :key="index"
            >
              <div class="block">
                  <el-avatar
                    :size="80"
                    :src="item.photo"
                  ></el-avatar>
                  <p>{{item.name}}</p>
                  <el-button
                    type="primary"
                    plain
                    size="small"
                  >
                    +关注
                  </el-button>
              </div>
            </el-col>
          </el-row>
          <!-- 分页组件 -->
          <el-pagination
            class="fans-page"
            background
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            :total="totalCount"
            :disabled="loading"
            @current-change="onCurrentChange"
          >
          </el-pagination>
          <!-- /分页组件 -->
        </el-tab-pane>
        <el-tab-pane
          label="粉丝画像"
          name="second"
        >粉丝画像</el-tab-pane>
      </el-tabs>
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
      pageSize: 20, // 每页显示数据量
      totalCount: 0, // 总数据量
      loading: false // 加载粉丝列表的loading
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
      this.loading = true
      // 后端接口要求：per_page must be within the range 20 - 50
      getFansList({
        page,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '获取粉丝列表成功'
        })
        this.fans = res.data.data.results
        this.totalCount = res.data.data.total_count
        // 关闭loading
        this.loading = false
      }).catch(err => {
        console.log('错误：' + err)
        this.$message.error('获取粉丝列表失败')
      })
    },
    onCurrentChange (page) { // 默认回调参数是当前页
      this.onloadFans(page)
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border: 1px dashed #ccc;
  font-size: 12px;
  padding: 10px 0;
}
.fans-page {
  margin-top: 10px;
}
</style>

<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="标题"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="总评论数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="粉丝评论数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
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
      }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

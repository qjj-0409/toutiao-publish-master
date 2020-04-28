<template>
  <div class="setting-container">
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /面包屑导航 -->
      <el-row>
        <el-col :span="10">
          <!-- 表单区域 -->
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
              123
            </el-form-item>
            <el-form-item label="手机">
              456
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          <!-- /表单区域 -->
        </el-col>
        <el-col :span="8" :offset="6">
          <!-- 头像区域 -->
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            src="http://toutiao.meiduo.site/Fpjp-yiQyQavWHaL99ut1giTDKml"
          ></el-avatar>
      <!-- /头像区域 -->
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SettingIndex',
  props: {},
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

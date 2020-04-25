<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发表文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="article.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="article.channel_id" placeholder="请选择频道">
          <el-option
           v-for="(article, index) in channels"
           :key="index"
           :label="article.name"
           :value="article.id"
           ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  getChannel
} from '@/api/article'
export default {
  name: 'PublishIndex',
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
      },
      channels: [],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: ''
        },
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadChannels()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    onloadChannels () {
      getChannel().then(res => {
        this.channels = res.data.data.channels
      })
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

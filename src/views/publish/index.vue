<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发表文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :model="article" label-width="80px">
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
      <el-form-item v-if="$route.query.id">
        <el-button type="warning" @click="onUpdate(false)">确认修改</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="onPublish(false)">发表</el-button>
        <el-button @click="onPublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  getChannel,
  publishArticle,
  getOneArticle,
  updateArticle
} from '@/api/article'
export default {
  name: 'PublishIndex',
  props: {},
  components: {},
  data () {
    return {
      channels: [],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadChannels()
    if (this.$route.query.id) {
      // 路径中有id，表示是编辑文章
      this.loadArcitle()
    }
  },
  methods: {
    onloadChannels () {
      getChannel().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft) {
      publishArticle(this.article, draft).then(res => {
        console.log(res)
        this.$message({
          message: `${draft ? '存入草稿' : '发布'}成功`,
          type: 'success'
        })
        // 发表文章成功，跳转到内容管理页面
        this.$router.push('/article')
      }).catch(err => {
        console.log('错误：' + err)
        this.$message.error('发布文章失败')
      })
    },
    loadArcitle () {
      getOneArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    },
    onUpdate (draft) {
      updateArticle(this.$route.query.id, this.article, draft).then(res => {
        this.$message({
          message: '修改文章成功',
          type: 'success'
        })
        // 修改文章成功，跳转到内容管理页面
        this.$router.push('/article')
      }).catch(err => {
        console.log('错误信息：' + err)
        this.$message.error('修改文章内容失败')
      })
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

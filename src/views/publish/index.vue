<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发表文章'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form
      ref="publish-form"
      :model="article"
      :rules="formRules"
      label-width="60px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="article.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- 5.在模板中使用组件element-tiptap -->
        <el-tiptap
         v-model="article.content"
         :extensions="extensions"
         placeholder="请输入文章内容"
         height="400"
         ></el-tiptap>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <template v-if="article.cover.type > 0">
          <upload-cover
            v-for="(cover, index) in article.cover.type"
            :key="cover"
            v-model="article.cover.images[index]"
          ></upload-cover>
          <!-- <upload-cover
            v-for="(cover, index) in article.cover.type"
            :key="cover"
            v-model="article.cover.images[index]"
            :cover-image="article.cover.images[index]"
            @update-cover="onUpdateCover(index, $event)"
          ></upload-cover> -->
        </template>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select
          v-model="article.channel_id"
          placeholder="请选择频道">
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
// 1.导入富文本编辑器插件
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  TextColor,
  Image,
  Underline,
  Italic,
  Strike,
  HorizontalRule,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  CodeBlock,
  Preview,
  Fullscreen
} from 'element-tiptap'
// 2.导入富文本编辑器样式文件
import 'element-tiptap/lib/index.css'
import UploadCover from './components/upload-cover'

// 导入图片上传接口
import { uploadImage } from '@/api/image.js'

export default {
  name: 'PublishIndex',
  props: {},
  components: {
    UploadCover,
    // 3.局部引入element-tiptap组件
    'el-tiptap': ElementTiptap
  },
  data () {
    return {
      channels: [],
      article: {
        title: '',
        content: '',
        cover: {
          type: 1, // 1 单图，3 三图，0 无图，-1 自动
          images: []
        },
        channel_id: null
      },
      // 4.在data中配置extensions选项
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
      extensions: [
        new Doc(),
        new Text(), // 文本
        new Paragraph(), // 段落
        new Heading({ level: 5 }), // 标题
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮 加粗
        new TextColor(), // 文本颜色
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }), // 图片
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 横线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(), // 清单
        new CodeBlock(), // 代码块
        new Preview(), // 预览
        new Fullscreen() // 全屏显示
      ],
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator: (rule, value, callback) => {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ]
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
      // 表单验证
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        // 验证通过，请求发布
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
    },
    onUpdateCover (index, url) {
      console.log(index, url)
      this.article.cover.images[index] = url
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>

<template>
  <el-container class="layout-container">
  <el-aside width="auto">
    <app-aside
    class="aside-menu"
    :isCollapse="isCollapse"
    ></app-aside>
  </el-aside>
  <el-container>
    <el-header class="header">
      <div>
      <i
        :class="{
          'el-icon-s-fold': isCollapse,
          'el-icon-s-unfold': !isCollapse
        }"
        @click="isCollapse = !isCollapse"
      ></i>
      <span>江苏传智播客科技教育有限公司</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img :src="user.photo" class="avatar">
        <span>{{user.name}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <i class="el-icon-setting"></i>
          <span>个人设置</span>
        </el-dropdown-item>
        <el-dropdown-item @click.native="onLogout">
          <i class="el-icon-unlock"></i>
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-header>
    <el-main>
      <!-- 子路由出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
// 导入global-bus全局通信总线
import globalBus from '@/utils/global-bus'
export default {
  name: 'layoutIndex',
  props: {},
  components: {
    AppAside
  },
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边菜单栏的展示状态
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确定退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除token
        window.localStorage.removeItem('user')
        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  created () {
    // 组件初始化后，请求获取用户信息
    this.loadUserProfile()
    globalBus.$on('updateUser', data => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.el-aside {
    background-color: #D3DCE6;
    .aside-menu {
      height: 100%;
    }
}
.header {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
    }
}
.el-main {
    background-color: #E9EEF3;
}
</style>

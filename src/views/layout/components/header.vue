<template>
  <div class="header-container">
    <div>
      <i class="el-icon-s-fold"></i>
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
        <el-dropdown-item>
          <i class="el-icon-unlock"></i>
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'AppHeader',
  props: {},
  components: {},
  data () {
    return {
      user: {} // 当前登录用户信息
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  },
  created () {
    // 组件初始化后，请求获取用户信息
    this.loadUserProfile()
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.header-container {
    width: 100%;
    height: 100%;
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
</style>

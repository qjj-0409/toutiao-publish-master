<template>
  <el-container class="layout-container">
  <el-aside width="200px">
    <app-aside class="aside-menu"></app-aside>
  </el-aside>
  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
import AppHeader from './components/header'
export default {
  name: 'layoutIndex',
  props: {},
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
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
.el-header {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
}
.el-main {
    background-color: #E9EEF3;
}
</style>

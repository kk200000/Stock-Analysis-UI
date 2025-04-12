<template>
  <div class="layout-container">
    <el-header>
      <div class="header">
        <div class="l-content">
          <el-icon size="25" color="white" @click="handleSideBar"><Operation /></el-icon>
          Stock-Analysis
        </div>
      </div>
    </el-header>
    <el-container>
      <vsideBar />
      <el-main>
        <!-- 首页 -->
        <!-- 菜单的内容 -->
        <router-view class="router"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { usesideBarStore } from '@/stores/sideBar'
import vsideBar from '@/components/sideBar.vue'
const sideBarStore = usesideBarStore()
const handleSideBar = () => {
  sideBarStore.handleCollapse()
}
</script>
<style scoped>
.el-header {
  position: absolute;
  height: 70px;
  right: 0;
  left: 0;
  top: 0;
  background-color: black;
}
.header {
  line-height: 70px;
  display: flex;
  justify-content: space-between;
}
.l-content {
  color: white;
}
.el-icon {
  vertical-align: middle;
  margin-right: 20px;
}
.el-dropdown {
  vertical-align: middle;
}
.el-container {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 70px;
}
.el-main {
  margin: 0;
  padding: 0;
}
.tags {
  height: 35px;
  line-height: 35px;
  padding: 0 6px;
  border-bottom: 1px solid var(--el-border-color-light);
}
.router {
  padding: 15px;
  box-sizing: border-box;
}
</style>

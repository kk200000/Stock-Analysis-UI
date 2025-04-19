<template>
  <div class="layout-container">
    <el-header>
      <div class="header">
        <div class="l-content">
          <el-icon size="25" color="#232946" @click="handleSideBar"><Operation /></el-icon>
          <span class="header-title">Stock-Analysis</span>
        </div>
        <div class="r-content">
          <span class="username">Hi, {{ username }}</span>
          <el-button type="text" class="logout-btn" @click="logout">退出登录</el-button>
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
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const sideBarStore = usesideBarStore()
const router = useRouter()
const handleSideBar = () => {
  sideBarStore.handleCollapse()
}
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
const username = ref(localStorage.getItem('username') || '') // 可根据实际登录用户动态获取
</script>
<style scoped>
.el-header {
  position: absolute;
  height: 70px;
  right: 0;
  left: 0;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #e5e6eb;
  z-index: 10;
}
.header {
  line-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  color: #232946;
  display: flex;
  align-items: center;
}
.header-title {
  font-weight: bold;
  font-size: 20px;
  margin-left: 6px;
  color: #232946;
}
.r-content {
  display: flex;
  align-items: center;
}
.logout-btn {
  color: #232946;
  font-weight: 500;
  font-size: 15px;
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
.username {
  color: #232946;
  font-size: 15px;
  margin-right: 18px;
  font-weight: 500;
}
</style>

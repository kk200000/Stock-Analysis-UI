<template>
  <el-aside :width="width">
    <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        background-color="#324157"
        text-color="#bfcbd9"
        :collapse="isCollapse"
        active-text-color="#d618f3"
        :collapse-transition="false"
        router
      >
        <template v-for="(menuItem, menuIndex) in sideBarTitle" :key="menuIndex">
          <el-menu-item :index="menuItem.index" click="">
            <el-icon size="15"><component :is="menuItem.icon" color="#d618f3"></component></el-icon
            ><span>{{ menuItem.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script lang="ts" setup>
import { usesideBarStore } from '@/stores/sideBar'
import { sideBarTitle } from '@/components/sideBarTitle'
import { computed } from 'vue'

const sideBarStore = usesideBarStore()
const isCollapse = computed(() => {
  return sideBarStore.collapse
})
const width = computed(() => (sideBarStore.collapse ? '0px' : '300px'))
</script>
<style>
.el-aside {
  height: 100vh;
  background-color: #324157;
  box-shadow: 2px 0 8px 0 rgba(0,0,0,0.08);
  transition: width 0.3s cubic-bezier(.4,0,.2,1), min-width 0.3s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
  /* 展开时显示边框 */
  border-right: 1px solid #2329461a;
}
.el-aside .el-scrollbar {
  padding-top: 16px;
  padding-bottom: 16px;
}
.el-menu {
  border-right: none;
  background-color: transparent;
  transition: background 0.3s;
}
.el-menu-item {
  border-radius: 6px;
  margin: 4px 8px;
  transition: background 0.2s;
}
.el-menu-item.is-active,
.el-menu-item:hover {
  background: rgba(214,24,243,0.08) !important;
  color: #d618f3 !important;
}
.el-menu-item span {
  margin-left: 8px;
  font-size: 16px;
}
</style>

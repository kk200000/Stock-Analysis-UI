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
}
.el-menu {
  border-right: none;
}
</style>

import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usesideBarStore = defineStore('sideBar', () => {
  const collapse = ref(true)
  const handleCollapse = () => {
    collapse.value = !collapse.value
    console.log(collapse.value)
  }
  return { collapse, handleCollapse }
})

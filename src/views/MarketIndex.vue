<template>
  <div class="market-index">
    <h1>股市大盘指数</h1>
    <el-card>
      <el-table :data="marketData" style="width: 100%">
        <el-table-column prop="index" label="指数名称" />
        <el-table-column prop="value" label="当前点位" />
        <el-table-column prop="change" label="涨跌幅" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const marketData = ref([
  { index: '上证指数', value: '3200.00', change: '+1.23%' },
  { index: '深证成指', value: '12000.00', change: '-0.45%' },
  { index: '创业板指', value: '2500.00', change: '+0.78%' },
])

onMounted(() => {
  // 模拟API调用获取数据
  console.log('Fetching market index data...')
})
</script>

<style scoped>
.market-index {
  padding: 20px;
}
</style>
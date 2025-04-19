<template>
  <div class="market-index">
    <h1 class="page-title">大盘指数行情</h1>
    <el-card class="index-card">
      <el-tabs v-model="activeTab" class="index-tabs">
        <el-tab-pane label="上证指数" name="sh">
          <div class="index-title">上证指数（000001）的K线历史走势</div>
          <div ref="chartContainer" class="chart"></div>
        </el-tab-pane>
        <el-tab-pane label="深证成指" name="sz">
          <div class="index-title">深证成指（399001）的K线历史走势</div>
          <div ref="chartContainer2" class="chart"></div>
        </el-tab-pane>
        <el-tab-pane label="创业板指" name="cyb">
          <div class="index-title">创业板指（399006）的K线历史走势</div>
          <div ref="chartContainer3" class="chart"></div>
        </el-tab-pane>
        <el-tab-pane label="中小板指" name="zx">
          <div class="index-title">中小板指（399005）的K线历史走势</div>
          <div ref="chartContainer4" class="chart"></div>
        </el-tab-pane>
        <el-tab-pane label="沪深300" name="hs300">
          <div class="index-title">沪深300（000300）的K线历史走势</div>
          <div ref="chartContainer5" class="chart"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const activeTab = ref('cyb') // 默认创业板指

const chartContainer = ref(null)
const chartContainer2 = ref(null)
const chartContainer3 = ref(null)
const chartContainer4 = ref(null)
const chartContainer5 = ref(null)

onMounted(() => {
  drawKLine(activeTab.value)
})

watch(activeTab, (val) => {
  drawKLine(val)
})

function drawKLine(tab: string) {
  // 这里只做占位，实际可集成K线图组件
  // 清空所有
  [chartContainer, chartContainer2, chartContainer3, chartContainer4, chartContainer5].forEach(refEl => {
    if (refEl.value) refEl.value.innerHTML = ''
  })
  let el
  switch (tab) {
    case 'sh': el = chartContainer.value; break
    case 'sz': el = chartContainer2.value; break
    case 'cyb': el = chartContainer3.value; break
    case 'zx': el = chartContainer4.value; break
    case 'hs300': el = chartContainer5.value; break
  }
  if (el) {
    // 占位内容
    el.innerHTML = `<div class="kline-placeholder">[K线图区域，可集成K线图]</div>`
  }
}
</script>

<style scoped>
.market-index {
  padding: 24px 24px 0 24px;
  background: #f5f7fa;
  min-height: 100vh;
}
.page-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #222;
}
.index-card {
  background: #f8fafd;
  border-radius: 8px;
  box-shadow: none;
  padding: 0 0 16px 0;
}
.index-tabs {
  margin-top: 0;
}
.index-title {
  font-size: 16px;
  font-weight: 500;
  margin: 18px 0 10px 0;
  color: #333;
}
.chart {
  width: 100%;
  height: 320px;
  background: #e9ecef;
  border-radius: 6px;
  position: relative;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kline-placeholder {
  color: #888;
  font-size: 18px;
  text-align: center;
}
</style>
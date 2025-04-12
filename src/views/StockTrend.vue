<template>
  <div class="stock-trend">
    <h1>个股价格趋势</h1>
    <el-card>
      <el-form @submit.prevent="fetchStockData" class="stock-form">
        <el-form-item label="股票代码">
          <el-input v-model="stockCode" placeholder="请输入股票代码" />
        </el-form-item>
        <el-button type="primary" native-type="submit">查询</el-button>
      </el-form>
    </el-card>

    <el-card v-if="stockData.length" class="chart-card">
      <h2>单只股票价格走势图</h2>
      <div ref="singleStockChart" class="chart"></div>
    </el-card>

    <el-card v-if="comparisonData.length" class="chart-card">
      <h2>两只股票价格对比</h2>
      <div ref="comparisonChart" class="chart"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const stockCode = ref('')
const stockData = ref([])
const comparisonData = ref([])
const singleStockChart = ref(null)
const comparisonChart = ref(null)

const fetchStockData = () => {
  if (!stockCode.value) return

  // 模拟API调用获取单只股票数据
  stockData.value = [
    { date: '2023-01-01', price: 100 },
    { date: '2023-01-02', price: 102 },
    { date: '2023-01-03', price: 105 },
  ]

  // 模拟API调用获取两只股票对比数据
  comparisonData.value = [
    { date: '2023-01-01', stockA: 100, stockB: 98 },
    { date: '2023-01-02', stockA: 102, stockB: 99 },
    { date: '2023-01-03', stockA: 105, stockB: 101 },
  ]

  drawSingleStockChart()
  drawComparisonChart()
}

const drawSingleStockChart = () => {
  if (!singleStockChart.value) return

  const svg = d3
    .select(singleStockChart.value)
    .append('svg')
    .attr('width', 500)
    .attr('height', 300)

  // 绘制单只股票价格走势图
  console.log('Drawing single stock chart...')
}

const drawComparisonChart = () => {
  if (!comparisonChart.value) return

  const svg = d3
    .select(comparisonChart.value)
    .append('svg')
    .attr('width', 500)
    .attr('height', 300)

  // 绘制两只股票价格对比图
  console.log('Drawing comparison chart...')
}
</script>

<style scoped>
.stock-trend {
  padding: 20px;
}

.chart-card {
  margin-top: 20px;
}

.chart {
  width: 100%;
  height: 300px;
}
</style>
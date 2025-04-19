<template>
  <div class="stock-trend">
    <h1 class="page-title">个股量化分析</h1>
    <el-card class="search-card">
      <el-form @submit.prevent="fetchStockData" class="stock-form" inline>
        <el-form-item label="股票代码">
          <el-input v-model="stockCode" placeholder="请输入股票代码" />
        </el-form-item>
        <el-button type="primary" native-type="submit">搜索</el-button>
      </el-form>
    </el-card>

    <div v-if="stockInfo" class="stock-info-section">
      <div class="stock-header">
        <h2>{{ stockInfo.name }}</h2>
        <p class="stock-desc">{{ stockInfo.desc }}</p>
      </div>
      <el-card class="chart-card">
        <div class="chart-title">{{ stockInfo.name }}（{{ stockCode }}）的K线历史走势</div>
        <div ref="singleStockChart" class="chart"></div>
      </el-card>
      <el-card class="finance-card">
        <div class="finance-title">主要财务指标</div>
        <el-table :data="financeRows" border style="width: 100%; margin-bottom: 8px;">
          <el-table-column prop="name1" label="指标名称" />
          <el-table-column prop="value1" label="最新数据" />
          <el-table-column prop="name2" label="指标名称" />
          <el-table-column prop="value2" label="最新数据" />
        </el-table>
        <div class="data-source">数据来源: {{ stockInfo.dataSource }}</div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import * as d3 from 'd3'

const stockCode = ref('')
const stockInfo = ref<any>(null)
const financeRows = ref<any[]>([])
const singleStockChart = ref(null)

const fetchStockData = async () => {
  if (!stockCode.value) return

  // 模拟API获取公司信息和财务数据
  stockInfo.value = {
    name: '南华生物医药股份有限公司',
    desc: '南华生物医药股份有限公司是...（此处省略详细介绍，可替换为API返回内容）',
    dataSource: '2024半年报，部分数据来自最新公告',
    finance: [
      { name: '基本每股收益(元)', value: '-0.0254' },
      { name: '每股净资产(元)', value: '0.7531' },
      { name: '扣非每股收益(元)', value: '-0.0339' },
      { name: '每股经营现金流(元)', value: '0.0006' },
      { name: '稀释每股收益(元)', value: '-0.0254' },
      { name: '每股公积金(元)', value: '1.2832' },
      { name: '每股未分配利润(元)', value: '-1.6347' },
      { name: '总股本(万股)', value: '33,002.31' },
      { name: '', value: '' },
      { name: '总股本(万股)', value: '31,066.87' },
    ]
  }

  // 组装财务表格为两列
  const arr = stockInfo.value.finance
  financeRows.value = []
  for (let i = 0; i < arr.length; i += 2) {
    financeRows.value.push({
      name1: arr[i]?.name || '',
      value1: arr[i]?.value || '',
      name2: arr[i + 1]?.name || '',
      value2: arr[i + 1]?.value || ''
    })
  }

  // 模拟API获取K线数据
  const klineData = [
    { date: '2023-01-01', price: 21 },
    { date: '2023-04-01', price: 18 },
    { date: '2023-07-01', price: 15 },
    { date: '2023-10-01', price: 12 },
    { date: '2024-01-01', price: 9 },
    { date: '2024-04-01', price: 7 },
    { date: '2024-07-01', price: 8 },
  ]

  await nextTick()
  drawSingleStockChart(klineData)
}

function drawSingleStockChart(data: { date: string, price: number }[]) {
  if (!singleStockChart.value) return

  d3.select(singleStockChart.value).selectAll('*').remove()

  const margin = { top: 20, right: 30, bottom: 30, left: 50 }
  const width = 700 - margin.left - margin.right
  const height = 320 - margin.top - margin.bottom

  const svg = d3
    .select(singleStockChart.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  const parseDate = d3.timeParse('%Y-%m-%d')
  const x = d3.scaleTime()
    .domain(d3.extent(data, d => parseDate(d.date)!) as [Date, Date])
    .range([0, width])

  const y = d3.scaleLinear()
    .domain([d3.min(data, d => d.price)! * 0.9, d3.max(data, d => d.price)! * 1.1])
    .range([height, 0])

  // X轴
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(6))

  // Y轴
  g.append('g').call(d3.axisLeft(y))

  // 背景分区
  const yTicks = y.ticks(5)
  g.selectAll('.bg-band')
    .data(yTicks)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', d => y(d))
    .attr('width', width)
    .attr('height', (d, i) => i < yTicks.length - 1 ? y(yTicks[i]) - y(yTicks[i + 1]) : 0)
    .attr('fill', (d, i) => i % 2 === 0 ? '#f3f3f3' : '#fff')
    .lower()

  // 价格线
  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#2E93fA')
    .attr('stroke-width', 2)
    .attr('d', d3.line<any>()
      .x(d => x(parseDate(d.date)!))
      .y(d => y(d.price))
      .curve(d3.curveMonotoneX)
    )

  // 坐标轴标题
  svg.append('text')
    .attr('x', margin.left)
    .attr('y', margin.top - 8)
    .attr('fill', '#333')
    .attr('font-size', 14)
    .text('股价')

  svg.append('text')
    .attr('x', width + margin.left)
    .attr('y', height + margin.top + 24)
    .attr('text-anchor', 'end')
    .attr('fill', '#333')
    .attr('font-size', 14)
    .text('日期')
}
</script>

<style scoped>
.stock-trend {
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
.search-card {
  margin-bottom: 18px;
  background: #f8fafd;
  border-radius: 8px;
  box-shadow: none;
}
.stock-info-section {
  margin-top: 10px;
}
.stock-header {
  margin-bottom: 10px;
}
.stock-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
}
.stock-desc {
  color: #555;
  font-size: 15px;
  margin-bottom: 10px;
}
.chart-card {
  margin-bottom: 18px;
  background: #fff;
  border-radius: 8px;
}
.chart-title {
  font-size: 16px;
  font-weight: 500;
  margin: 12px 0 8px 0;
  color: #333;
}
.chart {
  width: 100%;
  height: 320px;
}
.finance-card {
  margin-bottom: 18px;
  background: #fff;
  border-radius: 8px;
  padding-bottom: 8px;
}
.finance-title {
  font-size: 16px;
  font-weight: 500;
  margin: 12px 0 8px 0;
  color: #333;
}
.data-source {
  color: #888;
  font-size: 13px;
  margin-top: 4px;
}
</style>
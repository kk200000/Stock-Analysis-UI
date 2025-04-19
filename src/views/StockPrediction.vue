<template>
  <div class="stock-prediction">
    <h1>股票价格预测</h1>

    <!-- 预测结果图 -->
    <el-card class="prediction-chart">
      <h2>预测结果图</h2>
      <div ref="chartContainer" class="chart"></div>
    </el-card>

    <div class="analysis-row">
      <!-- 评论展示 -->
      <el-card class="comments-section">
        <h2>评论</h2>
        <el-table :data="comments" style="width: 100%">
          <el-table-column prop="user" label="用户" />
          <el-table-column prop="content" label="评论内容" />
        </el-table>
      </el-card>

      <!-- 情感因子 -->
      <el-card class="sentiment-section">
        <h2>情感因子分析</h2>
        <el-table :data="sentiments" style="width: 100%">
          <el-table-column prop="factor" label="因子" />
          <el-table-column prop="value" label="值" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const comments = ref([
  { user: '用户1', content: '这只股票未来看涨！' },
  { user: '用户2', content: '我觉得风险较大，谨慎投资。' },
])

const sentiments = ref([
  { factor: '市场情绪', value: '积极' },
  { factor: '新闻情感', value: '中性' },
])

const chartContainer = ref(null)

onMounted(() => {
  drawPredictionChart()
})

const drawPredictionChart = () => {
  if (!chartContainer.value) return

  // 清空旧图表
  d3.select(chartContainer.value).selectAll('*').remove()

  const svg = d3
    .select(chartContainer.value)
    .append('svg')
    .attr('width', 500)
    .attr('height', 300)

  // 示例数据
  const data = [
    { date: '2024-06-01', optimistic: 12, neutral: 10, pessimistic: 8 },
    { date: '2024-06-02', optimistic: 13, neutral: 11, pessimistic: 9 },
    { date: '2024-06-03', optimistic: 14, neutral: 12, pessimistic: 10 },
    { date: '2024-06-04', optimistic: 15, neutral: 13, pessimistic: 11 },
    { date: '2024-06-05', optimistic: 16, neutral: 14, pessimistic: 12 },
  ]

  const margin = { top: 20, right: 30, bottom: 30, left: 40 }
  const width = 500 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  const x = d3
    .scalePoint()
    .domain(data.map(d => d.date))
    .range([0, width])

  const y = d3
    .scaleLinear()
    .domain([
      d3.min(data, d => d.pessimistic) ?? 0,
      d3.max(data, d => d.optimistic) ?? 20,
    ])
    .nice()
    .range([height, 0])

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // X轴
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))

  // Y轴
  g.append('g').call(d3.axisLeft(y))

  // 画线函数
  const line = (key: string, color: string) =>
    d3
      .line<any>()
      .x(d => x(d.date)!)
      .y(d => y(d[key]))
      .curve(d3.curveMonotoneX)

  // 乐观
  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#20E647')
    .attr('stroke-width', 2)
    .attr('d', line('optimistic', '#20E647'))

  // 中性
  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#2E93fA')
    .attr('stroke-width', 2)
    .attr('d', line('neutral', '#2E93fA'))

  // 悲观
  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#FF4560')
    .attr('stroke-width', 2)
    .attr('d', line('pessimistic', '#FF4560'))

  // 图例
  const legend = [
    { name: '乐观', color: '#20E647' },
    { name: '中性', color: '#2E93fA' },
    { name: '悲观', color: '#FF4560' },
  ]
  legend.forEach((item, i) => {
    svg
      .append('circle')
      .attr('cx', 60 + i * 100)
      .attr('cy', 15)
      .attr('r', 6)
      .style('fill', item.color)
    svg
      .append('text')
      .attr('x', 70 + i * 100)
      .attr('y', 20)
      .text(item.name)
      .style('font-size', '12px')
      .attr('alignment-baseline', 'middle')
  })
}
</script>

<style scoped>
.stock-prediction {
  padding: 20px;
}

.prediction-chart {
  margin-bottom: 24px;
}

.analysis-row {
  display: flex;
  gap: 24px;
}

.comments-section,
.sentiment-section {
  flex: 1;
}

.chart {
  width: 100%;
  height: 300px;
}
</style>
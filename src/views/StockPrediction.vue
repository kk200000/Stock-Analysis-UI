<template>
  <div class="stock-prediction">
    <h1>股票价格预测</h1>

    <!-- 评论展示 -->
    <el-card class="comments-section">
      <h2>评论</h2>
      <el-table :data="comments" style="width: 100%">
        <el-table-column prop="user" label="用户" />
        <el-table-column prop="content" label="评论内容" />
      </el-table>
    </el-card>

    <!-- 预测结果图 -->
    <el-card class="prediction-chart">
      <h2>预测结果图</h2>
      <div ref="chartContainer" class="chart"></div>
    </el-card>

    <!-- 情感因子 -->
    <el-card class="sentiment-section">
      <h2>情感因子</h2>
      <el-table :data="sentiments" style="width: 100%">
        <el-table-column prop="factor" label="因子" />
        <el-table-column prop="value" label="值" />
      </el-table>
    </el-card>
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

  const svg = d3
    .select(chartContainer.value)
    .append('svg')
    .attr('width', 500)
    .attr('height', 300)

  // 绘制预测结果图
  console.log('Drawing prediction chart...')
}
</script>

<style scoped>
.stock-prediction {
  padding: 20px;
}

.comments-section,
.prediction-chart,
.sentiment-section {
  margin-top: 20px;
}

.chart {
  width: 100%;
  height: 300px;
}
</style>
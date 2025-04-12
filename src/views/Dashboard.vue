<template>
  <div class="dashboard-page">
    <h1 class="dashboard-title">基于大数据的股票量化分析与预测系统</h1>
    <p class="dashboard-description">
      系统利用网络爬虫从东方财富网采集大盘指数、资金流向、个股K线、财务指标等海量的股票数据，从基本面、技术面、政策面等角度进行分析，挖掘市场行情热度与热点板块，并对个股进行多维度诊断分析。同时基于深度学习神经网络对股票趋势进行建模，预测未来走势。该系统可以更加科学地进行股票投资决策，提高投资回报率。
    </p>
    <div class="dashboard-cards">
      <el-card class="dashboard-card" shadow="hover">
        <h3>股票数据采集</h3>
        <p>利用 requests 模拟请求东方财富等财经网站，抓取大盘、个股、财务等数据，并进行清洗和存储。</p>
      </el-card>
      <el-card class="dashboard-card" shadow="hover">
        <h3>大盘与板块分析</h3>
        <p>从大盘指数、涨停板热度、资金流向等角度分析市场行情热度与热点板块分布。</p>
      </el-card>
      <el-card class="dashboard-card" shadow="hover">
        <h3>个股诊断分析</h3>
        <p>支持股票模糊搜索、代码搜索，计算个股的基本面、技术面、资金面等多维度评分。</p>
      </el-card>
      <el-card class="dashboard-card" shadow="hover">
        <h3>可视化交互分析平台</h3>
        <p>利用 Flask + Echarts 搭建可视化交互平台，展示股票数据分析结果。</p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this static page
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
  background-color: #f5f7fa;
}

.dashboard-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.dashboard-description {
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.dashboard-card {
  padding: 20px;
  text-align: center;
}
</style>
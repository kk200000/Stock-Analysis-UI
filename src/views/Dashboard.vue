<template>
  <div class="dashboard-bg">
    <div class="dashboard-main">
      <div class="dashboard-info">
        <h1 class="dashboard-title">基于大数据的股票量化分析与预测系统</h1>
        <p class="dashboard-description">
          系统利用网络爬虫从东方财富网采集大盘指数、资金流向、个股K线、财务指标等海量的股票数据，从基本面、技术面、政策面等角度进行分析，挖掘市场行情热度与热点板块，并对个股进行多维度诊断分析。同时基于深度学习神经网络对股票趋势进行建模，预测未来走势。该系统可以更加科学地进行股票投资决策，提高投资回报率。
        </p>
      </div>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('happy') // 可根据实际登录用户动态获取

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.dashboard-bg {
  min-height: 100vh;
  width: 100vw;
  background: url('/src/assets/forest-image.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.dashboard-main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.dashboard-info {
  width: 100%;
  background: rgba(255,255,255,0.92);
  border-radius: 14px;
  padding: 36px 48px 28px 48px;
  margin-bottom: 36px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
}
.dashboard-title {
  font-size: 30px;
  font-weight: bold;
  color: #232946;
  margin-bottom: 22px;
  text-align: left;
  letter-spacing: 1px;
}
.dashboard-description {
  font-size: 18px;
  color: #444;
  line-height: 1.8;
  text-align: left;
}
.dashboard-cards {
  width: 100%;
  display: flex;
  gap: 28px;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.dashboard-card {
  flex: 1 1 260px;
  min-width: 260px;
  max-width: 320px;
  background: rgba(255,255,255,0.96);
  border-radius: 12px;
  padding: 28px 18px 22px 18px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.03);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.dashboard-card h3 {
  font-size: 19px;
  font-weight: 600;
  color: #232946;
  margin-bottom: 12px;
}
.dashboard-card p {
  font-size: 15px;
  color: #555;
  line-height: 1.7;
}
</style>
<template>
  <div class="login-page">
    <h2 class="login-title">欢迎使用“基于大数据的股票量化分析与预测系统”</h2>
    <div class="login-container">
      <div class="image-section">
        <img src="/src/assets/forest-image.jpg" alt="Forest" class="background-image" />
      </div>
      <el-card class="login-card">
        <h3 class="form-title">用户登录</h3>
        <el-form
          :model="form"
          :rules="rules"
          ref="loginForm"
          @submit.prevent="handleLogin"
          label-position="top"
          class="login-form"
        >
          <el-form-item label="手机号" class="form-item" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="密码" class="form-item" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-button type="primary" native-type="submit" class="login-button" color="#f0b429"
            >登录</el-button
          >
        </el-form>
        <div class="register-section">
          <span>没有账号？</span>
          <el-button type="text" @click="goToRegister">返回注册</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import service from '@/utils/request'

const router = useRouter()
const loginForm = ref(null)

const form = ref({
  phone: '', // 修改字段名为 phone
  password: '',
})

const rules = ref({
  phone: [
    // 修改字段名为 phone
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 3, message: '手机号至少3个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6个字符', trigger: 'blur' },
  ],
})

const handleLogin = async () => {
  loginForm.value?.validate(async (valid) => {
    if (valid) {
      try {
        const response = await service.post('/base/login/', {
          phone: form.value.phone, // 使用 phone 字段
          password: form.value.password,
        })
        localStorage.setItem('token', response.data.token)
        ElMessage.success('登录成功')
        router.push('/Dashboard')
      } catch (error) {
        if (error.response?.status === 404) {
          ElMessage.error('接口未找到，请检查接口路径是否正确')
        } else {
          const errorMessage = error.response?.data?.error
          if (errorMessage === '密码错误') {
            ElMessage.error('密码错误，请重试')
          } else if (errorMessage === '用户不存在') {
            ElMessage.error('用户不存在，请检查手机号')
          } else {
            ElMessage.error('登录失败，请重试')
          }
        }
      }
    } else {
      ElMessage.error('请检查表单输入是否正确')
    }
  })
}

const goToRegister = () => {
  router.push('/Register')
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  height: 100vh;
  padding: 20px;
}

.login-title {
  color: #1f2d3d;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8eaf6;
}

.background-image {
  width: 100%;
  height: 39vh;
  object-fit: cover;
}

.login-card {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-button {
  width: 100%;
  margin-top: 10px;
  color: #fff;
}

.register-section {
  text-align: center;
  margin-top: 20px;
}
</style>

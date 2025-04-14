<template>
  <div class="login-page">
    <h2 class="login-title">欢迎使用“基于大数据的股票量化分析与预测系统”</h2>
    <div class="login-container">
      <div class="image-section">
        <img src="/src/assets/forest-image.jpg" alt="Forest" class="background-image" />
      </div>
      <el-card class="login-card">
        <h3 class="form-title">用户注册</h3>
        <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          @submit.prevent="handleRegister"
          label-position="top"
          class="login-form"
        >
          <el-form-item label="用户名" class="form-item" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" class="form-item" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-button type="primary" native-type="submit" class="login-button" color="#f0b429"
            >注册</el-button
          >
        </el-form>
        <div class="register-section">
          <span>已有账号？</span>
          <el-button type="text" @click="goToLogin">直接登录</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能少于3个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' },
  ],
}

const formRef = ref()

const router = useRouter()

const handleRegister = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      router.push('/Dashboard')
    } else {
      alert('请完成表单校验')
    }
  })
}

const goToLogin = () => {
  router.push('/login')
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

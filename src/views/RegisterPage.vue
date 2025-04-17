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
          <el-form-item label="手机号" class="form-item" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="验证码" class="form-item" prop="verification_code">
            <el-input v-model="form.verification_code" placeholder="请输入验证码" />
            <el-button type="primary" color="#f0b429" @click="sendVerificationCode" class="send-code-button">
              发送验证码
            </el-button>
          </el-form-item>
          <el-form-item label="密码" class="form-item" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码" class="form-item" prop="confirm_password">
            <el-input
              v-model="form.confirm_password"
              type="password"
              placeholder="请再次输入密码"
            />
          </el-form-item>
          <el-button type="primary" native-type="submit" class="login-button" color="#f0b429">
            注册
          </el-button>
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
import { ElMessage } from 'element-plus'
import service from '@/utils/request'

const form = reactive({
  phone: '',
  verification_code: '',
  password: '',
  confirm_password: '',
})

const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' },
  ],
  verification_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' },
  ],
  confirm_password: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const formRef = ref()
const router = useRouter()

const sendVerificationCode = async () => {
  if (!form.phone) {
    ElMessage.error('请先输入手机号')
    return
  }
  try {
    await service.post('/base/send_verification_code/', { phone: form.phone })
    ElMessage.success('验证码发送成功')
  } catch (error) {
    ElMessage.error(error.response?.data?.error || '验证码发送失败')
  }
}

const handleRegister = async () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const response = await service.post('/base/register/', {
          phone: form.phone,
          password: form.password,
          verification_code: form.verification_code,
        })
        ElMessage.success(response.data.message || '注册成功')
        router.push('/login')
      } catch (error) {
        ElMessage.error(error.response?.data?.error || '注册失败')
      }
    } else {
      ElMessage.error('请完成表单校验')
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

.send-code-button {
  margin-top: 10px;
  color: #fff;
}

.register-section {
  text-align: center;
  margin-top: 20px;
}
</style>

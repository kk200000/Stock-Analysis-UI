import axios from 'axios'

const service = axios.create({
  baseURL: '/base', // 设置 baseURL 为 /base
  timeout: 60000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // 从 localStorage 获取 token
    if (token) {
      config.headers.Authorization = `Token ${token}` // 在请求头中添加 token
    }
    return config
  },
  (error) => {
    return Promise.reject(error) // 请求错误处理
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response // 成功响应处理
  },
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，清除 token 并跳转到登录页面
      localStorage.removeItem('token')
      window.location.href = '/login'
    } else if (error.response?.status === 400) {
      // 处理 400 错误
      console.error('Bad Request:', error.response.data)
    }
    return Promise.reject(error) // 其他错误响应处理
  }
)

export default service

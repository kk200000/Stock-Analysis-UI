import axios from 'axios'

const service = axios.create({
  //   baseURL: 'http://127.0.0.1:8000',
  timeout: 60000,
})

// 请求拦截器
service.interceptors.request.use((config) => {
  return config
})

// 响应拦截器（修正后）
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response // 成功响应处理
  },
  (error) => {
    return Promise.reject(error) // 错误响应处理
  },
)

export default service

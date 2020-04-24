// 基于axios封装的请求模块
import axios from 'axios'

// 创建一个axios实例，说白了就是赋值一个axios
// 我们通过设置这个实例去发请求，把需要的配置配置到这个实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基准地址
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // console.log(config)
    const user = JSON.parse(window.localStorage.getItem('user'))

    // 如果有登录用户信息，则统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 然后我们就可以在允许请求出去之前定制统一业务功能处理

    // 当这里return config 之后请求才会真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器

// 导出请求方法
export default request

// 基于axios封装的请求模块
import axios from 'axios'

// 创建一个axios实例，说白了就是赋值一个axios
// 我们通过设置这个实例去发请求，把需要的配置配置到这个实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基准地址
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request

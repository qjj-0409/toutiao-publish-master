// 基于axios封装的请求模块
import axios from 'axios'
// 导入json-bigint插件，处理id超出js准确表示的最大范围
import JSONbig from 'json-bigint'
import router from '@/router'

// 加载非组件模块
import { Message } from 'element-ui'

// 创建一个axios实例，说白了就是赋值一个axios
// 我们通过设置这个实例去发请求，把需要的配置配置到这个实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基准地址
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // 参数data就是后端响应的数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (error) {
      console.log('转换失败', error)
      // 如果转换失败，则将原数据直接返回给请求使用
      return data
    }
  }]
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
request.interceptors.response.use(function (response) {
  // 所有响应码为 2xx 的响应都会进入这里
  // request 是响应结果，注意：一定要把响应结果return，否则真正发请求的位置拿不到数据
  return response
}, function (error) {
  const { status } = error.response
  if (status === 401) {
    // 清除本地存储中的用户登录状态
    window.localStorage.removeItem('user')
    // 跳转到登录页面
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
  } else if (status === 403) {
    // token未携带或已过期
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务器内部异常，请稍后重试')
  }
})

// 导出请求方法
export default request

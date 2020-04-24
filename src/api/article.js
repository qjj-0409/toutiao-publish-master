/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

// 获取文章列表
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers设置
    params
  })
}

// 获取频道列表
export const getChannel = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

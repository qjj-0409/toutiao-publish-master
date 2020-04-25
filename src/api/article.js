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

// 删除文章
export const delArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 发表文章
export const publishArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

// 根据id获取指定文章
export const getOneArticle = id => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${id}`
  })
}

// 更新指定文章内容
export const updateArticle = (id, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${id}`,
    params: {
      draft
    },
    data
  })
}

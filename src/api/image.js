/**
 * 图片相关模块
 */
// 导入请求方法
import request from '@/utils/request.js'

// 封装上传图片接口
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}

// 获取图片列表接口
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 收藏图片素材接口
export const isCollectImage = (collect, id) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${id}`,
    data: {
      collect
    }
  })
}

// 收藏图片素材接口
export const delImage = (id) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${id}`
  })
}

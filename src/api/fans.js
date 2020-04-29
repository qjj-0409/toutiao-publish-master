/**
 * 粉丝管理模块
 */
// 引入request请求
import request from '@/utils/request'

export const getFansList = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}

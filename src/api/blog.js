import { createAPI } from '@/utils/request'

export const page = data => createAPI('/blog/page', 'get', data)
export const changePublish = data => createAPI('/blog/changePublish', 'post', data)
export const changeTop = data => createAPI('/blog/changeTop', 'post', data)
export const deleteById = data => createAPI('/blog/deleteById', 'get', data)
export const addOrUpdate = data => createAPI('/blog/addOrUpdate', 'post', data)
export const new10 = data => createAPI('/blog/new10', 'get', data)
export const top10 = data => createAPI('/blog/top10', 'get', data)
export const getById = data => createAPI('/blog/getById', 'get', data)
export const likeBlog = data => createAPI('/blog/likeBlog', 'post', data)

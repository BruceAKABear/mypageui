import { createAPI } from '@/utils/request'

export const addOrUpdate = data => createAPI('/blogTag/addOrUpdate', 'post', data)
export const page = data => createAPI('/blogTag/page', 'get', data)
export const deleteById = data => createAPI('/blogTag/deleteById', 'get', data)
export const tagList = data => createAPI('/blogTag/tagList', 'get', data)

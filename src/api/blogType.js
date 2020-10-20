import { createAPI } from '@/utils/request'

export const addOrUpdate = data => createAPI('/blogType/addOrUpdate', 'post', data)
export const page = data => createAPI('/blogType/page', 'get', data)
export const deleteById = data => createAPI('/blogType/deleteById', 'get', data)
export const typeList = data => createAPI('/blogType/typeList', 'get', data)

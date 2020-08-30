import { createAPI } from '@/utils/request'

export const page = data => createAPI('/article/page', 'get', data)
export const getTop = data => createAPI('/article/getTop', 'get', data)
export const getById = data => createAPI('/article/getById', 'get', data)

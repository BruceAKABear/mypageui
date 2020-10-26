import { createAPI } from '@/utils/request'

export const pageApi = data => createAPI('/opensource/page', 'get', data)
export const frontPageApi = data => createAPI('/opensource/frontPage', 'get', data)
export const getByIdApi = data => createAPI('/opensource/getById', 'get', data)

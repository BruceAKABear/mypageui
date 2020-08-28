import { createAPI } from '@/utils/request'

export const getIndexInfo = data => createAPI('/index/getIndexInfo', 'get', data)

import { createAPI } from '@/utils/request'

export const getBasicInfo = data => createAPI('/system/getBasicInfo', 'get', data)
export const addOrUpdateBasicInfo = data => createAPI('/system/addOrUpdateBasicInfo', 'post', data)

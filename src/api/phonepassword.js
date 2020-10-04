import { createAPI } from '@/utils/request'

export const getPhonePassword = data => createAPI('/system/getPhonePassword', 'get', data)
export const addOrUpdatePhonePassword = data => createAPI('/system/addOrUpdatePhonePassword', 'post', data)

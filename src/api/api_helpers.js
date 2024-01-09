import axios from 'axios'

import { APP_DOMAIN } from '../config/config'


export const send_api = async (endpoint, method, data) => {
    if (method === 'post') {
        return await axios.post(`${APP_DOMAIN}/${endpoint}`, data,{
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        })
    } else if (method === 'get') {
        return await axios.get(`${APP_DOMAIN}/${endpoint}`, data)
    }
}



export default {
    send_api,
}
import sha256 from "crypto-js/sha256"
import { send_api } from './api_helpers'

// import { APP_DOMAIN } from '../config/config'
import axios from 'axios'

export default {
    
     // UPDATE ACCOUNT INFO
    get_pelanggan: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop-new/pelanggan.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    get_pelanggan_status: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop-new/pelanggan_status.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    get_area_pickup: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop-new/area_pickup.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    get_pelanggan_bisnis: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop/pelanggan_bisnis.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    get_pelanggan_sales: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop/pelanggan_sales.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    get_location: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop/location.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    add_customer: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop-new/save_cust.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    update_customer: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop-new/update_cust.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    get_kota: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop-new/get_kota.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    area_pickup: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop-new/area_pickup.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    login: async function (payload) {
        //DEFINE API ENDPOINT
        let endpoint = 'siapx/desktop-new/login.php';
        let method = 'post';
    
        //SEND API
        endpoint = endpoint;
        let result = await send_api(endpoint, method, payload);
    
        //RESULT PROCESS
        return result;

    },
    // get_public_template: async function(payload) {
    //     //DEFINE API ENDPOINT
    //     let endpoint = '/template/public/detail';
    //     let method = 'get';
    //     let timeStamp = (new Date).getTime();

    //     //GENERATE SIGNATURE
    //     let obj_param = payload;
    //     let source_signature = applySign(obj_param, timeStamp);
        
    //     //ASIGN PARAM URL
    //     let public_param = publicParam(timeStamp);
    //     let params = await createParams(payload);
    //     let signature = '&signature='+source_signature;

    //     //SEND API
    //     endpoint = endpoint + '?' + public_param + params + signature;
    //     let result = await send_api(endpoint, method);

    //     //RESULT PROCESS
    //     return result;
    // },
}
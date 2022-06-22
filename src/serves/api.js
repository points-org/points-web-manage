import axios from 'axios'
import {getToken} from './index'
import router from '../router/index';
import {getLocalStorage} from './localStorage'
import {message} from 'ant-design-vue';

let token

export function setToken(t) {
    token = t
}

axios.interceptors.request.use(config => {
    const userInfo = getLocalStorage('access_token') //获取用户信息
    let token = ''
    if (userInfo) {
        token = userInfo
    }
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
}, err => {
    return Promise.resolve(err)
})

// axios.interceptors.response.use(
//     response => {
//         console.log(response);
//         if (response.status === 200) {
//             if (response.data.code === '999995' || response.data.code === '999996' || response.data.code === '999997' || response.data.code === '999998') {
//                 message.error(response.data.message)
//                 router.push({path: '/'});
//             } else if (response.data.code === '999999') {
//                 message.error(response.data.message)
//             }
//             return Promise.resolve(response)
//         } else if (response.status === 415) {
//             message.error('请求参数类型错误')
//         } else if (response.status === 404) {
//             message.error('请求资源未找到')
//         } else if (response.status === 500) {
//             message.error(response.data.message)
//         } else {
//             return Promise.reject(response)
//         }
//     }
// )

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * patch方法，对应patch请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function patch(url, params) {
    return new Promise((resolve, reject) => {
        axios.patch(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}


/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * delete，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function delete_(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

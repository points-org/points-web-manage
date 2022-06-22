import {post, get, patch, delete_} from './api';

let baseURL = '/api';
baseURL = process.env.NODE_ENV === 'production' ? baseURL : '/api';

// 获取操作日志记录
export function getToken() {
    return post('/api/user/login?password=123456&userName=admin', {
        password: '123456',
        userName: 'admin'
    });
}

// 新增新闻动态
export function login(params) {
    return post(`${baseURL}/login`, params);
}

// 新增新闻动态
export function addNews(params) {
    return post(`${baseURL}/news`, params);
}

// 查询新闻动态
export function queryNews(skip, limit) {
    return get(`${baseURL}/news/?skip=${skip}&limit=${limit}`);
}

// 修改新闻
export function updateNews(params) {
    return patch(`${baseURL}/news/${params.id}`, params);
}

// 删除新闻
export function deleteNews(params) {
    return delete_(`${baseURL}/news/${params}`);
}

// 新增历史
export function addHistory(params) {
    return post(`${baseURL}/history`, params);
}

// 新增历史
export function queryHistory(skip, limit) {
    return get(`${baseURL}/history/?skip=${skip}&limit=${limit}`);
}

// 修改历史
export function updateHistory(params) {
    return patch(`${baseURL}/history/${params.id}`, params);
}

// 删除历史
export function deleteHistory(params) {
    return delete_(`${baseURL}/history/${params}`);
}



import axios from "axios";
import { getToken, removeToken } from '@/utils/TokenUtils';

//创建一个axios实例
const api = axios.create({
    baseURL: "/api",
    timeout: 3000
});

// //创建一个请求拦截器，用于在Headers中添加Token
// api.interceptors.request.use((config) => {
//     config.headers["Authorization"] = getToken();
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

//创建一个响应拦截器
api.interceptors.response.use(resp => {
    let data = resp.data;
    // console.log(data);
    if(data.error === "jwt无效" && data.code === 401)
    {
        console.log("清除token");
        removeToken("token");
    }
    return data;
}, error => {
    Promise.reject("获取服务器数据异常");
});

export default api;
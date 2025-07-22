import axios from 'axios'

const instance = axios.create({
    baseURL:'/api',  // 백엔드 API 주소
    withCredentials: false,                 // 쿠키 필요 시
})

export default instance;

import { request,request1 } from './request'
import { qss } from './qs'

export function Login(ccc) {
    return request({
        method: 'post',
        url: '/api/login/Login',
        data: qss(ccc)
    })
}
export function qqlogin(aa) {
    return request1({
        method: 'post',
        url: '/api/users/QCLogin',
        data: qss(aa)
    })
}
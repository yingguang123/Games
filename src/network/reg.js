import {request,request1} from './request.js'
import {qss} from './qs.js' 
// 注册
export function reg(i){
    return request1({
        method:'post',
        url:'/api/users/appInsert',
        data:qss(i)
    })
}


// 邮箱
export function Email(a){
    return request({
        method:'post',
        url:'/api/SMS/Email/',
        data:qss(a)
    })
}



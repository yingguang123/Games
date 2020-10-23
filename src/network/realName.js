import {request,request1} from './request.js'
import {qss} from './qs.js' 

// 实名认证
export function real(i){
    return request({
        method:'post',
        url:'/api/users/UserRealID',
        data:qss(i)
    })
}
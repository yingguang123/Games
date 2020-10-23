import {request,request1} from './request.js'
import {qss} from './qs.js' 


// 校验邮箱验证码
export function emailcode(number){
    return request1({
        method:'post',
        url:'/api/sms/CodeCheck',
        params:{
           number:number
        }
    })
}
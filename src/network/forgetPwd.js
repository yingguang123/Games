import {request,request1} from './request.js'
import {qss} from './qs.js' 
// 绑定邮箱
export function ForgetPwd(account,phone){
    return request1({
        method:'post',
        url:'/api/users/CheckUser',
        params:{
            account:account,
            phone:phone
        }
    })
}
import {request,request1} from './request.js'
import {qss} from './qs.js' 
// 注册
export function repwd(account,phone,pwd){
    return request1({
        method:'post',
        url:'/api/users/ForgetPwd',
        params:{
            account:account,
            phone:phone,
            pwd:pwd
        }
    })
}
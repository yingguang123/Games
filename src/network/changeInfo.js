import {request,request1} from './request'
import {qss} from './qs'
// 个人信息
export function personal(id) {
    return request1({
        method:'get',
        url: '/api/users/GetDataApp',
        params:{
            id:id
        }
    })
}
// 绑定邮箱
export function myEmail(email,uid){
    return request1({
        method:'post',
        url:'/api/users/UpdataEmail',
        params:{
            email:email,
            ID:uid
        }
    })
}
//绑定手机号
export function myphone(phone){
    return request1({
        method:'post',
        url:'/api/users/Updataphone',
        data:qss(phone)
    })
}

// 更换头像
export function Myavatar(uid,filePath){
    return request1({
        method:'post',
        url:'/api/sms/Save64',
        params:{
            uid:uid,
            filePath:filePath
        }
    })
}
// 发送手机验证码
export function GetCode(i){
    return request1({
        method:'post',
        url:'/api/sms/Sendmsg',
        data:qss(i)
    })
}
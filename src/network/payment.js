import {request,request1} from './request.js'
import {qss} from './qs.js' 


// 支付宝
export function aplay(oid,url){
    return request({
        method:'post',
        url:'/api/transaction/ZFmoney',
        params:{
            oid:oid,
            url:url
        }
    })
}
// 微信
export function chat(a){
    return request1({
        method:'post',
        url:'',
        data:qss(a)
    })
}
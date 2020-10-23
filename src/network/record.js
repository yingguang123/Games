import {request,request1} from './request.js'
import {qss} from './qs.js' 


// 交易记录
export function Order(i){
    return request1({
        method:'post',
        url:'/api/transaction/InsertModel',
        data:qss(i)
    })
}
// 删除订单
export function delOrder(gid,uid){
    return request1({
        method:'post',
        url:'/api/transaction/Dlete',
        params:{
            gid:gid,
            uid:uid
        }
    })
}
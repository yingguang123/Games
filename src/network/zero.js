import {request,request1} from './request.js'
import {qss} from './qs.js' 
// 商品信息
export function goodsinfo(){
    return request1({
        method:'get',
        url:'/api/land/QueryCommodity',
    })
}

// 添加
export function add(i){
    return request({
        method:'post',
        url:'/api/transaction/insert',
        data:qss(i)
    })
}


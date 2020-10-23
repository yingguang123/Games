import {request,request1} from './request.js'
import {qss} from './qs.js' 

// 商品详情
export function Detail(gid){
    return request({
        method:'get',
        url:'/api/Game/Details',
        params:{
            gid:gid
        }
    })
}

// 获取收藏状态
export function collectstatus(uid,gid) {
    return request1({
        method:'post',
        url: '/api/Collections/Querylist',
        params:{
            uid:uid,
            gid:gid
        }
    })
}

// 创建角色名
export function Create(uid,gid,aid,rolename) {
    return request1({
        method:'post',
        url: '/api/role/QueryRole',
        params:{
            uid:uid,
            gid:gid,
            aid:aid,
            rolename:rolename
        }
    })
}
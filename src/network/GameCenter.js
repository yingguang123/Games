import {request,request1} from './request'
import {qss} from './qs'
// 轮播图
export function Banner(ccc) {
    return request({
        method:'get',
        url: '/api/Banner/GetData',
        data:ccc
    })
}
// 游戏列表
export function GameList() {
    return request({
        method:'get',
        url: '/api/Game/Appquery',
    })
}
// 游戏名称
export function gamename() {
    return request1({
        method:'get',
        url: '/api/Game/AppSupport',
    })
}
//游戏大区
export function Region(gid) {
    return request1({
        method:'get',
        url: '/api/land/QueryArea',
        params:{
            gid:gid
        }
    })
}
//游戏角色
export function role(i) {
    return request1({
        method:'post',
        url: '/api/role/APPRole',
        data:qss(i)
    })
}
// 游戏记录
export function Gamerecord(uid,gid) {
    return request1({
        method:'post',
        url: '/api/land/UpdataGame',
        params:{
            uid:uid,
            gid:gid
        }
    })
}

// 商品信息
export function goodsInfo() {
    return request1({
        method:'get',
        url: '/api/land/QueryCommodity',
    })
}


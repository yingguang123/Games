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
// 游戏记录
export function GameRecord(uid) {
    return request1({
        method:'post',
        url: '/api/land/GetGame',
        params:{
            uid:uid
        }
    })
}

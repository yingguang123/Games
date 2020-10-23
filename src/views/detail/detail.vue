<template>
<div class="all">
    <div class="">
        <Header>
            <span slot="left">
                <i @click="back()" class="fa fa-angle-left font" aria-hidden="true"></i>
            </span>
            <span slot="center">游戏详情</span>
        </Header>
        <div v-for="item in info" :key="item.id">
            <div class="detail">
                <img :src="'http://www.wwyyyy.shop/' + item.flash" alt="" />
            </div>
            <div class="cent">
                <p class="name">
                    游戏名字：<span>{{ item.gamename }}</span>
                </p>
                <p class="branch">
                    评分：<span>{{ item.score }}分</span>
                </p>
                <p class="pro">
                    游戏简介：<span>{{ item.brief }}</span>
                </p>
            </div>
            <div class="icon">
                <div class="collect" @click="collect(item)">
                    <img class="hollow" v-if="is_active" src="../../assets/img/s.png" alt="" />
                    <img v-else class="hello" src="../../assets/img/s1.png" alt="" />
                    <p>收藏</p>
                </div>
                <div class="active" @click="action(item)">开始游戏</div>
            </div>
        </div>
        <!--选择大区弹框-->
        <div class="role" v-show="show"></div>
        <div class="Iboth" v-if="show">
            <!-- content -->
            <div class="Icontent">
                <div class="Icontent-div">
                    <p>大区</p>
                    <select v-model="area" @change="gamearea()">
                        <option value>请选择</option>
                        <option v-for="item in opt1" :key="item.id">{{item.area}}</option>
                    </select>
                    <!-- <p>角色</p>
                    <input type="text" name id placeholder="请输入角色名" v-model="rolename" /> -->
                </div>
            </div>
            <!-- last -->
            <div class="last">
                <button @click="judge()">确定</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
        <!-- 添加角色 -->
        <div class="dlog" v-if="showModel"></div>
        <div class="mask" v-if="showModel">
            <p>创建角色</p>
            <input type="text" name id placeholder="请输入角色名" v-model="rolename" />
            <button @click="shows">确定</button>
            <button @click="remove1">取消</button>
        </div>
    </div>
</div>
</template>

<script>
import Header from "../../components/common/header/header.vue";
import axios from "axios";
import {
    Region
} from '../../network/GameCenter'
import $ from "jquery"; //引用JQ
import {
    Detail,
    Create,
    collectstatus
} from "../../network/detail";
export default {
    components: {
        Header,
    },
    props: {},
    data() {
        return {
            is_active: 1, //空心
            // is_active1: false, //实心
            info: {},
            gid: "", //角色id
            area: '', //大区
            aid: '', //大区id
            show: false,
            opt1: [],
            showModel: false, //创建角色
            rolename: "", //角色名
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        // 进入游戏页面
        action(item) {
            this.gid = item.id
            // 显示大区弹框
            this.show = !this.show
            // 大区
            Region(this.gid).then(res => {
                // console.log(res.data.list)
                this.opt1 = res.data.list;
            });

        },
        // 选择大区改变事件
        gamearea() {
            for (let i in this.opt1) {
                if (this.opt1[i].area == this.area) {
                    // console.log(this.opt1[i].id)
                    this.aid = this.opt1[i].id
                    this.$store.commit('aid', this.aid)
                }
            }
        },

        judge() {
            // 校验角色
            axios({
                method: 'post',
                url: 'http://www.wwyyyy.shop/api/role/CheckRole',
                params: {
                    uid: this.$store.state.uid,
                    gid: this.gid,
                    aid: this.aid
                }
            }).then(res => {
                // console.log(res.data)
                this.show = !this.show
                this.showModel = !this.showModel
                if (res.data.msg == false) {
                    this.$layer.msg("请创建角色", {
                        icon: 16,
                        // shade: 0.3,
                        time: false
                    });
                } else {
                    axios({
                        method: 'post',
                        url: 'http://www.wwyyyy.shop/api/role/APPRole',
                        params: {
                            gid: this.gid,
                            uid: this.$store.state.uid,
                            aid: this.aid
                        }
                    }).then(res => {
                        console.log(res.data.roleUserName)
                        this.rolename = res.data.roleUserName

                    })
                }
            })
            console.log(this.aid)
        },
        cancel() {
            this.show = false;
            (this.tradename = ""), (this.money = "");
        },
        // 确认创建角色按钮
        shows() {
            // 创建角色
            Create(this.$store.state.uid, this.gid, this.aid, this.rolename).then(res => {
                console.log(res)
                if (res.data.result = "角色创建成功") {
                    this.showModel = !this.showModel
                    // 游戏记录
                    axios({
                        url: "http://116.62.181.150/api/land/UpdataGame",
                        method: "post",
                        params: {
                            id: this.$store.state.uid,
                            gid: this.gid,
                            aid: this.aid
                        },
                    }).then((res) => {
                        // console.log(res)
                        if ((res.data = true)) {
                            this.$router.push({
                                name: "Ingame",
                                params: {
                                    id: this.$store.state.uid,
                                    gid: this.gid,
                                    aid: this.aid
                                },
                            });
                        }
                    });

                }
            })
        },
        remove1() {},

        // 游戏收藏
        collect(item) {
            // 收藏状态
            axios({
                method: "post",
                url: "http://www.wwyyyy.shop/api/Collections/BaseCollection",
                params: {
                    gid: item.id,
                    uid: parseInt(this.$store.state.uid),
                },
            }).then((res) => {
                // console.log(res);
                if (res.data.msg == "取消收藏成功") {
                    this.is_active = 1;
                } else {
                    this.is_active = 0;
                }
            });
        },

    },
    created() {
        // 收藏
        var gid = this.$route.params.gid;
        Detail(gid).then((res) => {
            // console.log(res)
            this.info = res.data;
        });
        axios({
            method: "post",
            url: "http://www.wwyyyy.shop/api/Collections/Querylist",
            params: {
                gid: gid,
                uid: parseInt(this.$store.state.uid),
            },
        }).then((res) => {
            // console.log(res);
            if (res.data.res == false) {
                this.is_active = 1;

            } else {
                this.is_active = 0
            }
        });
    },
};
</script>

<style scoped>
.all {
    background: #fcefe157;
    padding-bottom: 50vw;
}

.font {
    position: absolute;
    left: 33px;
    top: 14px;
    font-size: 38px;
}

.detail img {
    /* width: 100%;
    height: 50%; */
    width: 100vw;
    height: 60vw;
}

.cent {
    margin-top: 20px;
    margin-left: 20px;
}

.cent>p {
    margin-bottom: 10px;
    font-size: 16px;
    color: #a4a0a0;
}

.pro>span {
    color: #f0f0f0;
}

.cent>p>span {
    font-size: 19px;
    color: #69a2a7;
    /* color:rgb(236, 130, 130) */
}

.icon {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 66px;
    align-items: center;
}

.icon .collect {
    width: 50%;
    text-align: center;
    background-color: #f0f0f0;
    height: 66px;
    align-items: center;
    color: rgb(133, 128, 128);
}

.icon .collect>img {
    width: 28px;
    padding-top: 13px;
}

.icon .active {
    width: 50%;
    text-align: center;
    background-color: #b4dde1;
    height: 66px;
    line-height: 66px;
    color: #fff;
}

/*选择大区 */
.role {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.Iboth {
    position: absolute;
    top: 198px;
    left: 30px;
    width: 82%;
    height: 35%;
    background: #fff;
    z-index: 2;
}

.Iboth>img {
    width: 100vw;
    height: 100vw;
    opacity: 0.6;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.Icontent>p {
    font-size: 16px;
    padding: 30px;
    text-align: center;
}

.Icontent-div {
    text-align: center;
    margin-top: 56px;
}

.Icontent-div>p {
    display: inline-block;
    font-size: 14px;
    color: #333;
    margin-right: 5vw;
}

.Icontent-div>select {
    width: 221px;
    height: 27px;
    margin-bottom: 6vw;
}

.Icontent-div>input {
    width: 217px;
    height: 24px;
}

.last {
    /* text-align: center; */
    margin-top: 5vw;
}

.last>button {
    border: none;
    color: #fff;
    width: 22vw;
    height: 10vw;
    background-color: rgba(51, 153, 255, 1);
    /* margin-left: 14vw; */
    margin-left: 13vw;
}

/* 角色弹框 */
.dlog {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.mask {
    width: 60vw;
    height: 49vw;
    background-color: #fff;
    position: fixed;
    top: 36%;
    left: 16%;
    z-index: 2;
    padding: 4vw 15vw;
    border-radius: 5px;
    color: #000;
    margin: 2vw 7.4vw;
    padding: 0;
    overflow: hidden;
}

.mask>img {
    float: right;
}

.mask>p {
    margin: 0;
    margin-bottom: 6vw;
    font-size: 14px;
    margin-top: 6vw;
    text-align: center;
}

.mask>input {
    width: 33.1vw;
    display: block;
    height: 5.5vw;
    margin: 8vw auto;
    font-size: 12px;
    text-align: center;
}

.mask>button {
    width: 20vw;
    height: 7vw;
    background-color: rgba(51, 153, 255, 1);
    border: none;
    color: #fff;
    margin-left: 7vw;
}
</style>

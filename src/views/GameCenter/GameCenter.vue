<template>
<div>
    <div class="bg">
        <Header>
            <span slot="center">游戏中心</span>
        </Header>
        <button class="payment" @click="tradeName=true">支付</button>
    </div>
    <!--轮播图-->
    <banner :bannerList="bannerlist"></banner>
    <!--游戏列表-->
    <h5>全部游戏</h5>
    <game :gameList="gamelist"></game>
    <!--弹框-->
    <!-- 商品名称 -->
    <div class="goodsModel" v-show="tradeName"></div>
    <div class="goodsName" v-show="tradeName">
        <p>商品名称</p>
        <div class="commodity">
            <select v-model="tradename">
                <option value>请选择</option>
                <option v-for="item in goodsName" :key="item.id">{{item.commodity}}</option>
            </select>
        </div>
        <div class="icon">
            <button @click="goods">确定</button>
            <button @click="remove">取消</button>
        </div>

    </div>
    <!-- 输入金额 -->
    <div class="dlog" v-if="showModel"></div>
    <div class="mask" v-if="showModel">
        <img src="@/assets/img/x.png" alt @click="showModel=false" />
        <p>请输入您要充值的金额</p>
        <input type="number" name id placeholder="请输入充值金额" v-model="money" />
        <button @click="shows">确定</button>
        <button @click="remove1">取消</button>
    </div>
    <!--选择角色-->
    <div class="role" v-show="show"></div>
    <div class="Iboth" v-if="show">
        <!-- content -->
        <div class="Icontent">
            <p>请选择您要充值的有些角色</p>
            <div class="Icontent-div">
                <p>游戏</p>
                <select v-model="gamename" @change="changename()">
                    <option value>请选择</option>
                    <option v-for="item in opt" :key="item.id">{{item.gamename}}</option>
                </select>
            </div>
            <div class="Icontent-div">
                <p>大区</p>
                <select v-model="area" @change="changearea()">
                    <option value>请选择</option>
                    <option v-for="item in opt1" :key="item.id">{{item.area}}</option>
                </select>
            </div>
            <div class="Icontent-div">
                <p>角色</p>
                <select v-model="roleUserName">
                    <option value>请选择</option>
                    <option v-for="item in opt2" :key="item.id">{{item}}</option>
                </select>
            </div>
        </div>
        <!-- last -->
        <div class="last">
            <button @click="judge()">确定</button>
            <button @click="cancel">取消</button>
        </div>
    </div>
    <!--支付方式-->
    <div v-if="pay" class="one"></div>
    <div v-if="pay" class="popup">
        <img src="@/assets/img/x.png" alt @click="pay=false" />
        <p>请选择支付方式</p>
        <img src="@/assets/img/zfb.png" alt @click="zfb" />
        <img src="@/assets/img/wx.png" alt @click="chat" />
    </div>
</div>
</template>

<script>
// 引入头部插槽
import Header from "../../components/common/header/header.vue";
// 引入轮播图
import banner from "../../components/content/GameCenter/banner.vue";
// 引入游戏列表
import game from "../../components/content/GameCenter/gamelist.vue";
// 引入css样式
import "@/views/GameCenter/GameCenter.css";
// 引入scroll-better
import Scroll from "../../components/common/scroll/scroll";
import Swiper from "swiper";

// 引入js
import {
    Banner,
    GameList,
    Region,
    role,
    Gamerecord,
    code,
    goodsInfo,
    Create,
    collectstatus,
    gamename
} from "../../network/GameCenter";
import axios from "axios";

//引入下拉刷新
import mynew from "@/components/content/mynew.vue";
export default {
    components: {
        Header,
        banner,
        game,
        Scroll
    },
    props: {

    },
    data() {
        return {
            pay: false, //支付弹框
            bannerlist: [], //轮播图
            gamelist: [], //游戏列表
            showModel: false, //充值金额
            money: "", //金额
            gamename: "", //游戏名
            area: "", //大区
            roleUserName: "", //角色名
            show: false,
            // 选择角色
            opt: [], //游戏名称
            opt1: [], //大区
            opt2: [], //角色
            gid: "", //商品id
            aid: "", //大区id
            roleid: '', //角色id
            // 商品名称
            goodsName: [],
            tradename: "",
            tradeName: false,
            is_active: true
        };
    },
    methods: {

        goods() {
            this.tradeName = false;
            (this.showModel = true), (this.money = "");
        },
        // 充值金额
        shows() {
            if (this.money == "") {
                this.$layer.msg("充值金额不能为空", {
                    icon: 16,
                    // shade: 0.3,
                    time: false
                });
            } else {
                this.show = !this.show;
                this.showModel = !this.showModel;
            }
        },
        // 根据游戏清空大区和游戏角色
        changename() {
            this.area = ''
            this.roleUserName = ''
            for (let j in this.opt) {
                if (this.opt[j].gamename == this.gamename) {
                    console.log(this.opt[j].id)
                    this.gid = this.opt[j].id
                    this.$store.commit('gid', this.gid)
                    // 大区
                    Region(this.gid).then(res => {
                        console.log(res)
                        this.opt1 = res.data.list;
                    });
                }
            }

        },
        changearea() {
            this.roleUserName = ''
            for (let i in this.opt1) {
                if (this.opt1[i].area == this.area) {
                    // console.log(this.opt[i].id)
                    this.aid = this.opt1[i].id;
                    this.$store.commit('aid', this.aid)
                    // console.log(this.gid)
                    axios({
                        method: "post",
                        url: "http://116.62.181.150/api/role/APPRole",
                        params: {
                            gid: this.$store.state.gid,
                            uid: this.$store.state.uid,
                            aid: this.aid
                        }
                    }).then(res => {
                        // console.log(res)
                        this.opt2 = res.data.roleUserName;
                        this.roleid = res.data.roleID[0]
                        // console.log(this.opt2);
                    });
                }
            }
        },
        judge() {
            // 跳转
            this.$router.push("/GameCenter").catch(err => {
                err;
            });
            if (this.gamename == "" || this.gamename == "请选择") {
                this.$layer.msg("请选择游戏", {
                    icon: 16,
                    // shade: 0.3,
                    time: false
                });
            } else if (this.area == "" || this.area == "请选择") {
                this.$layer.msg("请选择大区", {
                    icon: 16,
                    // shade: 0.3,
                    time: false
                });
            } else if (this.roleUserName == "" || this.roleUserName == "请选择") {
                this.$layer.msg("请选择角色", {
                    icon: 16,
                    // shade: 0.3,
                    time: false
                });
            } else {
                this.show = !this.show;
                this.pay = !this.pay;
            }
        },
        cancel() {
            this.show = !this.show;
            (this.tradename = ""), (this.money = "");
        },
        remove() {
            (this.tradename = ""), (this.tradeName = false);
        },
        remove1() {
            (this.money = ""), (this.showModel = false), (this.tradename = "");
        },
        payment() {
            (this.tradename = ""),
            (this.money = ""),
            (this.gamename = ""),
            (this.area = ""),
            (this.roleUserName = "");
        },
        // 支付方式
        zfb() {
            this.$router.push({
                name: "zero",
                params: {
                    money: this.money, //价钱
                    gamename: this.gamename, //游戏名
                    aid: this.aid, //大区id
                    area: this.area, //大区名
                    role: this.roleUserName, //角色名
                    payment: "支付宝", //
                    gid: this.gid, //商品id
                    roleid: this.roleid, //角色id
                    tradename: this.tradename
                }
            });
        },
        // 微信支付
        chat() {
            this.$router.push({
                name: "zero",
                params: {
                    money: this.money,
                    gamename: this.gamename,
                    flash: this.flash,
                    name: this.name,
                    payment: "微信"
                }
            });
        },

    },
    created() {
        Banner().then(resArray => {
            this.bannerlist = resArray.data.BList;
        });
        // 游戏
        GameList().then(res => {
            // console.log(res)
            this.gamelist = res.data.data;
        });
        // 游戏名称
        gamename().then(res => {
            this.opt = res.data.list
        })
        // 商品名称
        goodsInfo().then(res => {
            // console.log(res.data.data)
            this.goodsName = res.data.data;
        });
    },
    mounted() {
        var mySwiper = new Swiper(".swiper-container", {
            //自动播放
            autoplay: true,
            //   direction: "vertical",
            disableOnInteraction: false, //点击让轮播停止
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true //修改swiper的父元素时，自动初始化swiper
        });
        //上拉加载
        //监听页面到底部
        //     let that = this;
        //     window.onscroll = function () {
        //       //变量scrollTop是滚动条滚动时，距离顶部的距离
        //       var scrollTop =
        //         document.documentElement.scrollTop || document.body.scrollTop;
        //       //变量windowHeight是可视区的高度
        //       var windowHeight =
        //         document.documentElement.clientHeight || document.body.clientHeight;
        //       //变量scrollHeight是滚动条的总高度
        //       var scrollHeight =
        //         document.documentElement.scrollHeight || document.body.scrollHeight;
        //       //滚动条到底部的条件
        //       if (scrollTop + windowHeight == scrollHeight) {
        //         //到了这个就可以进行业务逻辑加载后台数据了
        //         that.num++;
        //         gamelist(that.num).then((res) => {
        //           that.pushgamelist = res.data.data;
        //           // this.gameslists.concat(pushgamelist)
        //           that.gameslist = that.gameslist.concat(that.pushgamelist);
        //           console.log(that.gameslist);
        //         });
        //         that.toast("到了底部");
        //       }
        //     };
    }
};
</script>

<style scoped>
@import "../../../node_modules/swiper/css/swiper.css";

.pro>span {
    width: 59vw;
    height: 20px;
    display: block;
    overflow: hidden;
    /* text-overflow: ellipsis; */
    text-overflow: ellipsis;
    white-space: nowrap;
}

.wrapper {
    height: 110vw;
    overflow: hidden;
}

.role {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/*商品名称弹框 */
.goodsModel {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.goodsName {
    position: absolute;
    top: 165px;
    left: 59px;
    width: 67%;
    height: 32%;
    background: #fff;
    z-index: 2;
}

.goodsName img {
    float: right;
}

.goodsName p {
    margin: 25px auto;
    text-align: center;
}

.commodity {
    text-align: center;
}

.commodity>select {
    width: 182px;
    height: 27px;
    margin-bottom: 11vw;
    margin-top: 7px;
}

.icon {
    display: flex;
    justify-content: space-between;
    margin: 0 40px;
}

.icon>button {
    width: 20vw;
    height: 7vw;
    background-color: rgba(51, 153, 255, 1);
    border: none;
    color: #fff;
}

/* 弹框 */
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

.Iboth {
    position: absolute;
    top: 165px;
    left: 30px;
    width: 82%;
    height: 49%;
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

.one {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.popup {
    width: 60vw;
    height: 39vw;
    background: #fff;
    text-align: center;
    margin-top: 5vw;
    position: fixed;
    top: 36%;
    left: 20%;
    z-index: 2;
}

.popup>img:first-child {
    margin: 0;
    width: 22px;
    height: 22px;
    float: right;
}

.popup>p {
    padding: 10px;
    font-size: 16px;
    font-weight: 666;
}

.popup>img {
    margin-top: 20px;
    margin-left: 11vw;
    width: 53px;
    height: 53px;
    float: left;
}
</style>

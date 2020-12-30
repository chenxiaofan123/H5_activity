<template>
    <div class='my-awards' v-cloak>
        <div class="awards-content">
            <div class="title">
                <div class="leftbox">排名</div>
                <div class="middlebox">用户ID</div>
                <div class="rightbox">答对题数</div>
            </div>
            <ul class="awards-list" v-if='heroListData&&heroListData.length>=0'>
                <li class="title list-items" v-if='heroListDataOne'>
                    <div class="leftbox">
                        <img src="./res/one.png" alt="">
                        <span class="Ranking-num">1</span>
                    </div>
                    <div class="middlebox">
                        <span class="text">{{heroListDataOne.telephone}}</span>
                    </div>
                    <div class="rightbox">
                        <span class="text">{{heroListDataOne.totalCorrectNum}}</span>
                    </div>
                </li>
                <li class="title list-items" v-if='heroListDataTwo'>
                    <div class="leftbox">
                        <img src="./res/two.png" alt="">
                        <span class="Ranking-num">2</span>
                    </div>
                    <div class="middlebox">
                        <span class="text">{{heroListDataTwo.telephone}}</span>
                    </div>
                    <div class="rightbox">
                        <span class="text">{{heroListDataTwo.totalCorrectNum}}</span>
                    </div>
                </li>
                <li class="title list-items" v-if='heroListDataThree'>
                    <div class="leftbox">
                        <img src="./res/three.png" alt="">
                        <span class="Ranking-num">3</span>
                    </div>
                    <div class="middlebox">
                        <span class="text">{{heroListDataThree.telephone}}</span>
                    </div>
                    <div class="rightbox">
                        <span class="text">{{heroListDataThree.totalCorrectNum}}</span>
                    </div>
                </li>
                <li class="title list-items" v-for='(item,index) in heroListDataOther' :key='index' v-if='heroListDataOther'>
                    <div class="leftbox">
                        <div class="ranking">{{item.rank}}</div>
                    </div>
                    <div class="middlebox">
                        <span class="text">{{item.telephone}}</span>
                    </div>
                    <div class="rightbox">
                        <span class="text">{{item.totalCorrectNum}}</span>
                    </div>
                </li>
                <li class="bottom-tip" v-if='rankThousand==1'>
                    第1000名 答对题数为 {{totalCorrectNum}}
                </li>
            </ul>
            <div class="awards-no" v-else-if='heroListData.length<=0'>
                <img src="./res/no-data.png" alt="">
                <p>还没有榜单呢，快来上榜吧~</p>
            </div>
        </div>
    </div>
</template>
<script>
import User from "../../service/common/User";
import {actCode,heroList} from '../../service/pages/anActivityAnswer/service.js'
export default {
    data() {
        return {
            user: new User(),
            heroListDataOne:null,//第一名英雄榜
            heroListDataTwo:null,//第二名英雄榜
            heroListDataThree:null,//第三名英雄榜
            heroListDataOther:null,//4-10英雄榜
            heroListData1000:null,
            heroListData:null,
            rankThousand:-1,
            totalCorrectNum:0,
        }
    },
    watch: {
    },
    filters: {
    
    },
    components: {
    },
    mounted() {
        this.getHeroList();
        clientInit.done(function() {
        	GB.utils.callCustomMethod("setTopRightButton", {
        		title: ""
        	});
        });
    },
    activated() {

    },
    methods: {
        /**
         * 获取英雄榜
         */
        getHeroList(){
            let that = this
            let param = {
                actCode:actCode,
                size:10,
                specialRank:1000,
            }
            heroList(param).then(res=>{
                let resData = res.data;
                if(resData.code=='0000'){
                    that.rankThousand = resData.data.rankThousand;
                    that.totalCorrectNum = resData.data.totalCorrectNum;
                    that.heroListData = resData.data.heroList;
                    let heroListDataOthers = [];
                    that.heroListData.forEach(ele=>{
                        if(ele.rank==1){
                            that.heroListDataOne = ele;
                        }else if(ele.rank==2){
                            that.heroListDataTwo = ele;
                        }else if(ele.rank==3){
                            that.heroListDataThree = ele;
                        }else{
                            heroListDataOthers.push(ele)
                        }
                    })
                    that.heroListDataOther = heroListDataOthers;
                }else{
                    GB.utils.htoast(resData.msg);
                }
            })
        }
        
    },
    beforeMount() {

    }
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
@font-face {
  font-family: "DINBlack";
  src: url("../../assets/DINBlack.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}
.fontFamily(){
    font-family: "DINBlack";
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./res/@{file}");
}
[v-cloak] {
  display: none !important;
}
// 圆角
.radius2(){
    .px2rem(border-radius,2);
}
.borderWidth(){
    .px2rem(border-width,4);
}
// 前三名
.Ranking-num{
    .pa();
    top:50%;
    left: 50%;
    transform: translate(-50%,-49%);
    color: #fff;
    .px2rem(font-size,32);
    font-weight: 700;
}
// 标题
.title{
    font-weight: 700;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background:  #0688ED;
    box-sizing: border-box;
    .px2rem(height,120);
    div{
        .px2rem(height,120);
        .px2rem(line-height,120);
        .px2rem(font-size,32);
        .px2rem(letter-spacing,1);
        color: #391543;
        border: 4px solid #391543;
        .borderWidth();
        border-top: none;
        box-sizing: border-box;
    }
    .text{
        .px2rem(font-size,34);
        letter-spacing: 0;
    }
    .leftbox{
        .px2rem(width,180);
        border-left: none;
        display: flex;
        align-items: center;
        justify-content: center;
        .pr();
        // 前三名
        img{
            .px2rem(width,86);
            .px2rem(height,78);
        }
        // 第四名以后
        .ranking{
            box-sizing: border-box;
            .px2px(width,60);
            .px2px(height,60);
            .px2px(line-height,46);
            .px2px(padding-top,4);
            .px2px(font-size,38);
            border-radius: 50%;
            background: #4DCDCF;
            border: 4px solid #391543;
            .borderWidth();
            box-shadow: 2px 2px 0 0 #A6E3E4, inset 1px 2px 0 0 #FFFFFF;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
        }
    }
    .middlebox{
        .px2rem(width,300);
    }
    .rightbox{
        .px2rem(width,210);
        border-right: none;
    }
}
.my-awards {
    background: #044DAE url(./res/kuang.png) repeat;
    background-size:15px 15px;
    font-family: PingFang-SC-Regular;
    .px2rem(font-size,28);
    color: #40404B;
    .px2rem(padding,30);
    .awards-content{
        width:100%;
        height: 100%;
        background: #FFFFFF;
        border: 4px solid #391543;
        .borderWidth();
        .radius2();
        box-sizing: border-box;
        // 有数据
        .awards-list{
            .list-items{
                background:  #fff;
                border-bottom: 0.5px solid #D2C4CB;
                .rightbox,
                .middlebox,
                .leftbox {
                    border: none;
                }
            }
            // 底部提示語
            .bottom-tip{
                .px2rem(height,160);
                .px2rem(line-height,160);
                .px2rem(font-size,32);
                text-align: center;
                font-weight: 700;
            }
        }
        //没有数据
        .awards-no{
            text-align: center;
            img{
                .px2rem(width,230);
                .px2rem(height,214);
                .px2rem(margin-top,140);
                .px2rem(margin-bottom,50);
            }
            p{
                color: #391543;
            }
        }
    }
}
</style>
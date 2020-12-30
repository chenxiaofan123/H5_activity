<template>
    <div class='my-awards' v-cloak>
        <div class="awards-content">
            <div class="title">
                <span class="leftbox">奖励名称</span>
                <span class="rightbox">获得时间</span>
            </div>
            <div v-if='myRewardData&&myRewardData.length>0' class="reward-body">
                <div class="reward-body-box">
                    <ul class="awards-list" >
                        <li class="awards-items" v-for='(item,index) in myRewardData' :key='index'>
                            <span class="name">{{item.prizeDesc}}</span>
                            <span class="time">{{item.obtainTime}}</span>
                        </li>
                    </ul>
                    <div class="loadMore" v-show='!isShowTips' @click="loadMore">查看更多</div>
                    <div class="loadMore" v-show='isShowTips'>没有更多了</div>
                </div>                
            </div>
            <div class="awards-no" v-else-if='myRewardData.length<=0'>
                <img src="./res/no-data.png" alt="">
                <p>还没有活动奖励哦，快去答题拿奖～</p>
            </div>
        </div>
    </div>
</template>
<script>
import User from "../../service/common/User";
import {actCode,myReward} from '../../service/pages/anActivityAnswer/service.js'
PageBack.addCb(function(){
//     alert(1)
//     console.log('执行app页面回退操作!');
// //   location.reload();
})
export default {
    data() {
        return {
            user: new User(),
            myRewardData:null,
            currentMyreward:null,
            size:15,
            start:0,
            count:0,
            isShowTips:false,
            telephone: '',
			sessionId: '',
        }
    },
    watch: {
    },
    filters: {
    
    },
    components: {
    },
    mounted() {
        let that = this
        clientInit.done(function() {
        	GB.utils.callCustomMethod("setTopRightButton", {
        		title: ""
        	});
        });
        sessionProObj.getUserInfo((telephone,sessionId)=>{
            that.telephone=telephone;
            that.sessionId=sessionId;
            if(telephone){
                this.getMyReward();
            }
        })
    },
    activated() {
    },
    methods: {
        getMyReward(){
            let that = this
            that.isShowTips = false;
            let param = {
                actCode:actCode,
                size:that.size,
                start:that.start,
                telephone:that.telephone,
                sessionId:that.sessionId
            }
            myReward(param).then(res=>{
                let resData = res.data
                if(resData.code=='0000'){
                    var currentData = [];
                    that.currentMyreward = resData.data.rewardList
                    that.count = resData.data.count
                    if (that.currentMyreward.length < that.size) {
                        that.isShowTips = true;
                    }
                    that.myRewardData = that.myRewardData?that.myRewardData:[];
                    that.myRewardData = that.myRewardData.concat(that.currentMyreward)
                }else{
                    GB.utils.htoast(resData.msg);
                }
            })
        },
        loadMore(){
            if (this.currentMyreward.length < this.size) {
                return;
            }
            this.start = this.start + this.size;
            this.getMyReward();
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
// 标题
.title{
    font-weight: 700;
    text-align: center;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    span{
        .px2rem(font-size,32);
        .px2rem(letter-spacing,1);
        .px2rem(line-height,100);
        color: #391543;
        display: inline-block;
        .px2rem(height,120);
        .px2rem(line-height,120);
        width: 100%;
        border-bottom: 2px solid #391543;
        border-top: 2px solid #391543;
        background: #4DCDCF;
    }
    .leftbox{
        border-right: 2px solid #391543;
    }
    .rightbox{
        border-left: 2px solid #391543;
    }
    
}
.my-awards {
    background: #044DAE url(./res/kuang.png) repeat;
    background-size:15px 15px;
    font-family: PingFang-SC-Regular;
    height: 100%;
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
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .reward-body{
            height: 100%;
            overflow: hidden;
            .reward-body-box{
                height: 100%;
                overflow-y: auto;
                -webkit-overflow-scrolling:touch;
            }
            // 加载更多
            .loadMore{
                .px2rem(height,100);
                .px2rem(line-height,100);
                .px2rem(font-size,26);
                color: #391543;
                text-align: center;
                width: 100%;
            }
        }
        // 有数据
        .awards-list{
            .awards-items{
                font-weight: 700;
                .px2rem(height,110);
                display: flex;
                align-items: center;
                // justify-items: space-around;
                justify-content: space-around;
                border-bottom: 1px solid #D2C4CB;
                span{
                    flex: 1;
                    color: #391543;
                    text-align: center;
                }
                .name{
                    .px2rem(font-size,32);
                    letter-spacing: 0;
                }
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

    // .awards-list{
    //     width:100%;
    //     height: 100%;
    //     background-color: pink;
    // }
}
</style>
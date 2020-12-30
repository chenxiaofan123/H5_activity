<template>
    <div class="main-page" v-cloak>
		<!-- 预热 -->
		<preheat v-if='actStatus==1'></preheat>
		<!-- 活动开始 -->
		<in-activity :datas='pageData' :islogin='isLogin' @getdata='getMainPage' v-else-if='actStatus==2' :telephone='telephone' :sessionid='sessionId'></in-activity>
		<!-- 活动结束 -->
		<end-activity :datas='pageDataEnd' :islogin='isLogin' v-else-if='actStatus==3'></end-activity>
		<!-- 分享彈框 -->
        <!-- <share-modal :show.sync="isShare"></share-modal> -->
    </div>
</template>
<script>
import User from "../../service/common/User";
import util from "../../utils/tool.js";
import preheat from './components/preheat.vue'
import inActivity from './components/inActivity.vue'
import endActivity from './components/endActivity.vue'
import pageVisibility from '../../commonScript/pageVisibility.js';
import shareModal from "./components/shareModal.vue";
import {
	actCode,
	mainPage,
	shareCode,
	queryActStatus,
	actFinishPage} from '../../service/pages/anActivityAnswer/service.js'

var showPage
pageVisibility.visibilitychange(()=>{
	if(showPage==2){
		location.reload();
	}
    // if(GB.utils.getPlatform() != 'android'){
		
	// }
})
export default {
	data() {
		return {
			user: new User(),
			telephone: '',
			sessionId: '',
			isLogin:-1,//1未登录  2已登录
			pageData:{},//活动中数据
			isPageHide:false,
			actStatus:-1,
			pageDataEnd:{},//活动结束数据
		}
	},
	watch: {},
	filters: {
	},
	components: {
		preheat,
		inActivity,
		endActivity,
		shareModal
	},
	methods: {
		/**
		 * 活动主页面数据获取-活动中
		 */
		getMainPage(){
			let that = this;
			let param = {
				actCode:actCode,
				telephone: that.telephone,
				sessionId: that.sessionId
			}
			mainPage(param).then(res=>{
				let resData = res.data;
				if(resData.code=='0000'){
					console.log('我被触发重新加载了')
					that.pageData = resData.data;
				}else{
					GB.utils.htoast(resData.msg);
				}
			})
		},
		/**
		 * 直播-活动后
		 */
		actFinishPage(){
			let that = this
			let param = {
				actCode:actCode,
				telephone: that.telephone,
				sessionId: that.sessionId
			}
			actFinishPage(param).then(res=>{
				let resData = res.data;
				if(resData.code=='0000'){
					that.pageDataEnd = resData.data;
				}else{
					GB.utils.htoast(resData.msg);
				}
			})
		},
		/**
		 * 查询活动状态
		 */
		queryActStatus(){
			let that = this
			let param = {
				actCode:actCode
			}
			queryActStatus(param).then(res=>{
				let resData = res.data;
				if(resData.code=='0000'){
					showPage  = resData.data.actStatus
					that.actStatus = resData.data.actStatus;
					if(that.actStatus==2){
						if(that.isLogin==2){
							that.getMainPage();
						}
					}else if (that.actStatus==3){
						if(that.isLogin==2){
							that.actFinishPage();
						}
					}
				}else{
					GB.utils.htoast(resData.msg);
				}
			})
		},
		//二维码
		getShareInfo(path, tel, code) {
			var that = this;
			$.getJSON(
				path + "info/getShareInfoJsonp?jsoncallback=?",
				{
				telephone: tel,
				code: code,
				pageUrl: encodeURIComponent(location.href.split("#")[0].toString())
				},
				function(_data) {
					var lineLink = location.href;
					if (_data.wxurl) {
						lineLink = _data.wxurl;
					}
					that.url = lineLink;
					params["title"] = _data.title;
					params["imageUrl"] = _data.imageUrl;
					params["description"] = _data.description;
					params["url"] = lineLink;
				}
			);
		},
	},
	mounted() {
		let that = this;
		// getShareInfo(sharebasePath, "", shareCode);
		/**
		 * 登陆状态获取
		 */
        sessionProObj.getUserInfo((telephone,sessionId)=>{
            that.telephone=telephone;
			that.sessionId=sessionId;
            if(!telephone){
                that.isLogin = 1;
            } else{//已登录
				that.isLogin = 2;
			}
			console.log(that.isLogin)
			console.log('我是主页面')
			that.queryActStatus();
			that.getShareInfo(sharebasePath, telephone, shareCode);
        })
	},
	activated() {
       	// if (GB.utils.getPlatform() == "android") {
        //     clientInit.done(() => {
		// 		// GB.utils.callCustomMethod("setTopRightButton", {
		// 		// 	"title": "分享"
		// 		// });
		// 		GB.utils.callCustomMethod("setTitle", {
		// 			title: "答题夺取四重礼"
		// 		});
        //     });
        // } else {
        //     GB.utils.callCustomMethod("setTitle", {
        //     	title: "答题夺取四重礼"
        //     });
		// }
    },
	beforeMount() {}
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
@font-face {
  font-family: "DIN-Bold";
  src: url("../../assets/DIN-Bold.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
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
.main-page {
   
}

</style>
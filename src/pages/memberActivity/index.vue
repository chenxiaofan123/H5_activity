<template>
    <div class="member-activity" v-cloak>
		<header>
			<div class="card-nologin" v-if='isLogin!=2'>
				<div class="login-btn" id='login-btn-member' @click='goLogin($event)'>
					<span class="lineHeight">请您登录后查看</span>
				</div>
			</div>
			<div class="card-login" v-else>
				<div class="card"  :class="{'ordinary-card ordinary-color': memberInfo.grade == 1,'silver-card silver-color': memberInfo.grade == 2,'gold-card gold-color': memberInfo.grade == 3,'platinum-card platinum-color': memberInfo.grade == 4}">
					<p class="card-dear fl">Dear</p>
					<p class="card-title fl" :class="{'ordinary-title':memberInfo.grade == 1,'silver-title':memberInfo.grade == 2,'gold-title':memberInfo.grade == 3,'platinum-title':memberInfo.grade == 4}"></p>
					<p class="card-btn fr" :class="{'ordinary-btn':memberInfo.grade == 1,'silver-btn':memberInfo.grade == 2,'gold-btn':memberInfo.grade == 3,'platinum-btn':memberInfo.grade == 4}" :id="`myCoupon${memberInfo.grade}`" @click='myCoupon($event)'>
						<span class="lineHeight card-btn-line-height">我的升级礼包</span>
					</p>
					<div class="bubble" id='goMemberCenter' @click='goMemberCenter($event)'>
						了解<br>
						更多会员信息
					</div>
				</div>
			</div>
		</header>
		<article>
			<div class="leaf"></div>
			<div class="article-title">
				<span class="title-bgm">MEMBER EXCLUSIVE</span>
				<div class="member-title">
					<span class="title-spot"></span>
					<span class="title">会员限时专享</span>
				</div>
			</div>
			<div class="member-coupon">
				<p class="member-body-title">加息产品每人限投5万，限一次，数量有限，先到先得</p>
				<div class="coupon-box">
					<ul>
						<li v-for='(item,index) in pageData' :key='index'>
							<div class="maskSC" :id="`target${item.tagType}`" @click='goTarget($event,item.tagType,item.depositWapUrl)'></div>
							<div class="coupon-name">{{item.name}}</div>
							<div class="coupon-left fl">
								<p class="rate">{{item.rateText}}</p>
								<p class="tip">目标年化回报率</p>
							</div>
							<div class="coupon-middle fl">
								<p class="limit">{{item.productDuration}}</p>
								<p class="tip">出借期</p>
							</div>
							<div class="grade-img grade-img-silver" v-if='item.tagType==6'></div>
							<div class="grade-img grade-img-gold" v-else-if='item.tagType==7'></div>
							<div class="grade-img grade-img-platinum" v-else-if='item.tagType==8'></div>
						</li>
					</ul>
				</div>
			</div>
			<div class="footer">
				<p class="footer-title">活动规则</p>
				<p class="paragraph">
					<span class="num">1.</span>
					<span class="txt">活动时间：2019年07月04日-2019年07月18日；</span>
				</p>
				<p class="paragraph">
					<span class="num">2.</span>
					<span class="txt">活动期间不同等级会员可购买本等级会员专属加息产品一份；</span>
				</p>
				<p class="paragraph">
					<span class="num">3.</span>
					<span class="txt">加息产品每人限投5万，数量有限，先到先得；</span>
				</p>
				<p class="paragraph">
					<span class="num">4.</span>
					<span class="txt">加息产品仅限白银及以上会员可买；</span>
				</p>
				<p class="paragraph">
					<span class="num">5.</span>
					<span class="txt">客服电话：4000-339-993。</span>
				</p>
			</div>
		</article>
		<!-- 提示框 -->
		<tip-modal :show.sync="isTip"></tip-modal>
		<grade-modal :isShow.sync="isGrade" :memberInfo="memberInfo" @close="modalClose"></grade-modal>
		<upgrade-modal :show.sync="isUpgrade"></upgrade-modal>
    </div>
</template>
<script>
import User from "../../service/common/User";
import util from "../../utils/tool.js";
import tipModal from './components/tipModal.vue'
import gradeModal from "./components/gradeModal.vue";
import upgradeModal from "./components/upgradeModal.vue";
import {memberGradeInfo,memberTargetInfo} from '../../service/pages/memberActivity/service.js'
import version from './../../utils/appVersion'
export default {
	data() {
		return {
			user: new User(),
			telephone: '',
			sessionId: '',
			isLogin:-1,//1未登录  2已登录
			pageData:[],//优惠卷数据
			memberInfo:{},//会员信息
			isTip:false,
			isGrade:false,
			isUpgrade:false,
		}
	},
	watch: {
		isGrade(val){
			this.isScroll(val);
		},
		isTip(val){
			this.isScroll(val);
		},
		isUpgrade(val){
			this.isScroll(val);
		}
	},
	filters: {
	},
	components: {
		tipModal,
		gradeModal,
		upgradeModal
	},
	methods: {
		// 页面滑动
		_preventDefault(e) { e.preventDefault(); },
		GetPageScroll(){
			var y;
			if (window.pageYOffset) {    // all except IE
				y = window.pageYOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {    // IE 6 Strict
				y = document.documentElement.scrollTop;
			} else if (document.getElementsByClassName('slide-bg')) {    // all other IE
				y = document.getElementsByClassName('slide-bg').scrollTop;
			}
			return y
		},
		isScroll(val){
			if (val){
                document.body.style.overflow = 'hidden';
                window.addEventListener('touchmove',this._preventDefault);
            }else{
                document.body.style.overflow = 'auto';
                window.removeEventListener('touchmove', this._preventDefault);
            }
		},
		goLogin(e){
			this.trackHeatMap(e);
			this.callAppLogin();
		},
		/**
         * 登录
         */
        callAppLogin() {	
            this.user.callAppLogin();
		},
		/**
         * 定级弹框关闭
         */
		modalClose(val) {
			this.isGrade = val;
		},
		/**
		 * 我的升级礼包
		 */
		myCoupon(e){
			this.trackHeatMap(e);
			if(this.memberInfo.grade==1){
				this.isTip = true;
				return;
			}			
			window.location.href = `${h5GbankerAppBusiness}/html/pages/equityDetail/?tab=1&version=${GB.utils.GetRequest()['version']}`;
		},
		/**
		 * 点击标的
		 */
		goTarget(e,type,depositWapUrl){
			if(this.isLogin!=2){
				this.callAppLogin();
				return;
			}
			if(type==6&&this.memberInfo.grade!==2){
				GB.utils.htoast('白银会员专享');
			}else if(type==7&&this.memberInfo.grade!==3){
				GB.utils.htoast('黄金会员专享');
			}else if(type==8&&this.memberInfo.grade!==4){
				GB.utils.htoast('铂金会员专享');
			}else{
				this.trackHeatMap(e);
				window.location.href = depositWapUrl;
			}
		},
		/**
		 * 了解更多
		 */
		goMemberCenter(e){
			this.trackHeatMap(e);
			window.location.href = `${h5GbankerAppBusiness}/html/pages/memberCenter/?version=${GB.utils.GetRequest()['version']}&isMemberCenter=true`;
		},
		getMemberInfo(){
			let that = this
			let param = {
				telephone:that.telephone,
				sessionId:that.sessionId
			}
			memberGradeInfo(param).then(res=>{
				let resData = res.data
				if(resData.code=='0000'){
					that.memberInfo = resData.data
					that.modalOpen();
				}else{
					GB.utils.htoast(resData.msg);
				}
			})
		},
		modalOpen() {
			//判断是否是会员中心进入的
			let isMemberCenter = GB.utils.GetRequest()['isMemberCenter']||null;
			if(isMemberCenter){
				return;
			}
			let { grade, experienceGrade } = this.memberInfo;
			let curGrade = grade >= experienceGrade ? grade : experienceGrade;
			let preMess = JSON.parse(localStorage.getItem("preMess")) || null,
				comeNum = preMess ? preMess.comeNum : 0, // 进页面次数
				preGrade = preMess ? preMess.preGrade : ""; // 之前的等级（取最大的等级）
			if (!comeNum) {
				// 首次进页面
				this.isGrade = true;
			} else if (curGrade > preGrade) {
				//不是首次进来 且 当前比之前的等级高
				this.isGrade = true;
			}
			comeNum ++;
			let obj = {
				comeNum: comeNum,
				preGrade: curGrade
			};
			localStorage.setItem("preMess", JSON.stringify(obj));
		},
		getMemberTargetInfo(){
			let that = this
			let param = {}
			memberTargetInfo(param).then(res=>{
				let resData = res.data
				if(resData.code=='0000'){
					that.pageData = resData.data.targetList
				}else{
					GB.utils.htoast(resData.msg);
				}
			})
		},
		/**
         * 埋点
         */
        trackHeatMap(e){
			this.$sa.quick('trackHeatMap', e.currentTarget);
        }
	},
	mounted() {
		let that = this;
		that.getMemberTargetInfo();
		/**
		 * 判断版本
		 */
		var vs = GB.utils.GetRequest()['version']||'';
		var newvs = '6.3.0';	
		let res = version.getVersion(vs,newvs);
        if(!res){
			this.isUpgrade = true;
			return;
        }
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
				that.getMemberInfo();
			}
        })
	},
	activated() {
       	
    },
	beforeMount() {}
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
@font-face {
  font-family: "DINMedium";
  src: url("../../assets/DIN-Medium.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}
@font-face {
  font-family: "DINRegular";
  src: url("../../assets/DIN-Regular.otf") format("truetype");
  font-style: normal;
  font-weight: normal;
}
.DINMedium(){
	font-family: 'DINMedium';
}
.DINBlack(){
	font-family: 'DINBlack';
}
.DINRegular(){
	font-family: 'DINRegular';
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
// 行高设置问题
.lineHeight{
	display: table-cell;
	text-align: center;
	vertical-align: middle;
}
// 普通
.ordinary-color{
	color: #3A565E;
}
// 白银
.silver-color{
	color: #42506E;
}
// 黄金
.gold-color{
	color: #7C5B2A;
}
// 铂金
.platinum-color{
	color: #815337;
}
.fl{
	float: left;
}
.fr{
	float: right;
}
.clearfix(){
  *zoom:1;
 &:before, &:after{ content:""; display:table; }
 &:after{ clear: both; }
}
.member-activity {
	.px2rem(font-size, 28);
	header{
		.bg-img( 'header.png' , 750, 670 );
		.pr();
		//未登录
		.card-nologin{
			.bg-img( 'no-login.png' , 690, 220 );
			.pa();
			.px2rem(bottom, -20);
			.px2rem(left, 30);
			text-align: center;
			.login-btn{
				margin: 0 auto;
				.px2rem(margin-top, 50);
				.px2rem(width, 316);
				.px2rem(height, 80);
				.pr();
				z-index: 100;
				span{
					.px2rem(width, 316);
					.px2rem(height, 80);
					.px2rem(border-radius, 40);
					background: rgba(0,0,0,0.20);
					color: #FFFFFF;
				}
			}
		}
		//登录后
		.card-login{
			.card{
				.pa();
				.px2rem(bottom, -20);
				.px2rem(left, 30);
				text-align: center;
				.px2rem(padding-top, 60);
				.px2rem(padding-left, 30);
				.px2rem(padding-right, 30);
			}
			.card-dear{
				.px2rem(line-height, 60);
			}
			.card-title{
				.px2rem(margin-left, 8);
				vertical-align: middle;
			}
			.card-btn{
				.px2rem(width, 196);
				.px2rem(height, 60);
				.px2rem(border-radius, 30);
				.px2rem(font-size, 24);
				color: #FFFFFF;
				.pr();
				z-index:100;
			}
			.card-btn-line-height{
				.px2rem(width, 196);
				.px2rem(height, 60);
				.px2rem(border-radius, 30);
			}
			.bubble{
				.bg-img( 'bubble.png' , 228, 140 );
				.px2rem(font-size, 24);
				.px2rem(line-height, 34);
				.px2rem(padding-left, 30);
				.px2rem(padding-right, 30);
				.px2rem(padding-top, 28);
				color: #FFFFFF;
				.pa();
				.px2rem(top, -68);
				.px2rem(left, 30);
				text-align: left;
			}
			// 普通
			.ordinary-title{
				.bg-img( 'ordinary-title.png' , 180, 60 );
			}
			.ordinary-card{
				.bg-img( 'ordinary-bgm.png' , 690, 220 );
			}
			.ordinary-btn{
				background-color: rgba(58,86,94,0.4);
			}
			// 白银
			.silver-title{
				.bg-img( 'silver-title.png' , 180, 60 );
			}
			.silver-card{
				.bg-img( 'silver-bgm.png' , 690, 220 );
			}
			.silver-btn{
				background-color: rgba(66,80,110,0.4);
			}
			// 黃金
			.gold-title{
				.bg-img( 'gold-title.png' , 180, 60 );
			}
			.gold-card{
				.bg-img( 'gold-bgm.png' , 690, 220 );
			}
			.gold-btn{
				background-color: rgba(124,91,42,0.4);
			}
			// 鉑金
			.platinum-title{
				.bg-img( 'platinum-title.png' , 180, 60 );
			}
			.platinum-card{
				.bg-img( 'platinum-bgm.png' , 690, 220 );
			}
			.platinum-btn{
				background-color: rgba(129,83,55,0.4);
			}
		}
	}
	article{
		.bg-img( 'body-bgm.png' , 750, 1606 );
		height: auto;
		.pa();
		.px2rem(top, 548);// 空白18px
		.px2rem(padding-left, 30);
		.px2rem(padding-right, 30);
		.px2rem(padding-bottom, 100);
		overflow: hidden;
		.leaf{
			.bg-img( 'leaf.png' , 106, 334 );
			.pa();
			.px2rem(top, 158);// 空白18px
			right:0;
			z-index: 1;
		}
		.article-title{
			z-index: 2;
			.px2rem(margin-top, 176);// 空白18px
			.pr();
			.title-bgm{
				.DINBlack();
				.px2rem(font-size, 60);
				.px2rem(line-height, 74);
				color: #FFFFFF;
				opacity: 0.1;
			}
			.member-title{
				.pa();
				.px2rem(top, 34);
				display: flex;
				justify-content: center;
				align-items: center;
				.title-spot{
					display: inline-block;
					.bg-img( 'spot.png' , 40, 40 );
					.px2rem(margin-right, 16);
				}
				.title{
					font-weight: 700;
					.px2rem(font-size, 44);
					.px2rem(line-height, 62);
					background: linear-gradient(to top, #FFDDA8 ,#FFF6DE);
                   -webkit-background-clip: text;
                    color: transparent;
				}
			}
		}
		.member-coupon{
			z-index: 2;
			padding-bottom: 2px;
			.px2rem(margin-top, 62);
			.px2rem(width, 690);
			.px2rem(border-radius, 18);
			background-image: linear-gradient(-180deg, #2D364C 0%, #151D31 100%);
			box-shadow: inset -2px -2px 8px 0 rgba(0,0,0,0.10), inset 2px 2px 8px 0 rgba(0,0,0,0.10);
			border:2px solid #E9C69D;
			.pr();
			.member-body-title{
				text-align: center;
				.px2rem(height, 116);
				.px2rem(line-height, 116);
				.px2rem(font-size, 26);
				color: #FFFFFF;
				.px2rem(border-radius, 18);
			}
			.coupon-box{
				.bg-img( 'text-bgm.png' , 682, 706 );
				margin: 0 auto;
				ul{
					.px2rem(padding-top, 40);
					li{
						.px2rem(width, 630);
						.px2rem(height, 200);
						color: #FFFFFF;
						.px2rem(padding-left, 40);
						.px2rem(padding-top, 30);
						background-image: linear-gradient(-180deg, #465272 0%, #3D4A68 100%);
						.px2rem(border-radius, 8);
						margin: 0 auto;
						.px2rem(margin-bottom, 20);
						.clearfix();
						.pr();
						.maskSC{
							.pa();
							background-color: transparent;
							top:0;
							bottom:0;
							left:0;
							right: 0;
							z-index: 100;
						}
						.coupon-name{
							color: #FFFFFF;
							.px2rem(margin-bottom, 14);
						}
						.rate{
							.px2rem(font-size, 40);
							.px2rem(line-height, 50);
							.DINMedium();
						}
						.tip{
							.px2rem(font-size, 24);
							.px2rem(line-height, 34);
							color: #9FA4B2;
						}
						.limit{
							.px2rem(font-size, 36);
							.px2rem(line-height, 50);
							.DINRegular();
						}
						.coupon-left{
							.px2rem(margin-right, 80);
							text-align: left;
						}
						.coupon-middle{
							text-align: left;
						}
						.grade-img{
							.pa();
							top: 0;
							right: 0;
						}
						.grade-img-silver{
							.bg-img( 'silver-tip.png' , 110, 110 );
						}
						.grade-img-gold{
							.bg-img( 'gold-tip.png' , 110, 110 );
						}
						.grade-img-platinum{
							.bg-img( 'platinum-tip.png' , 110, 110 );
						}
					}
					li:last-child{
						margin-bottom: 0;
					}
				}
			}
		}
		.footer{
			.px2rem(margin-top, 76);
			color: #838795;
			.footer-title{
				letter-spacing: 1.17px;
				.px2rem(margin-bottom, 16);
			}
			.paragraph{
				.clearfix();
				display: block;
				.px2rem(font-size, 24);
				.px2rem(margin-bottom, 12);
				letter-spacing: 1px;
				span{
					float: left;
				}
				.num{
					width:4%;
				}
				.txt{
					width:96%;
				}
			}
		}
	}
	
}

</style>
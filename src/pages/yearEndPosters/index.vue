<template>
    <div class='share-page' v-cloak>
        <div class="part9">
                <div class="partTextAll">
                    <div class="part1Text">
                         <div v-if='type==1 '>
                              <div class="shareImg1"></div>
                              <div class="shareImgText1"></div>
                              <div class="shareText">熬最深的夜，开最壕的跑车</div>
                          </div>
                          <div v-if='type==2'>
                              <div class="shareImg2"></div>
                              <div class="shareImgText2"></div>
                              <div class="shareText">钱，妙不可言。缘分到了，自然就富了。</div>
                          </div>
                          <div v-if='type==3'>
                              <div class="shareImg3"></div>
                              <div class="shareImgText3"></div>
                              <div class="shareText">尽管市场多变，你总能找到赚钱的办法</div>
                          </div>
                          <div v-if='type==4'>
                              <div class="shareImg4"></div>
                              <div class="shareImgText4"></div>
                              <div class="shareText">凭你认识的朋友，你没办法穷</div>
                          </div>
                        <div class="shareBottom">
                            <div class="line"></div>
                            <div class="clearfix shareContent">
                                <div class="left ">
                                    <div class="bottomLogo"></div>
                                    <div class="bottomText">来黄金钱包回顾你的2018</div>
                                </div>
                                <div class="right codeImg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="part9yezi"></div>
                <div class="part1Bottom">
                </div>
        </div>
    </div>
</template>
<script>
import { shareScreen } from "../../utils/util";
import QRCode from "qrcode";
import { yearEndShareCode } from "../../service/pages/yearEndInventory/service.js";
export default {
  data() {
    return {
      telephone: "",
      sessionId: "",
      url: "",
      bott: {},
      topp: {},
      small: false,
      type:null
    };
  },
  created() {
    var that = this;
     this.type = this.getUrlVars()['type']||null;
     clientInit.done(function() {
      GB.utils.callCustomMethod("setTopRightButton", {
        title: "分享"
      });
      opera.addCb(function() {
        shareScreen(yearEndShareCode, 0);
      });
    });

  },
  mounted() {
    let bodyh = document.body.offsetHeight;
    let bodyw = document.body.offsetWidth;
    if (bodyh / bodyw < 1.5) {
      this.small = true;
      var imgh = 1.14 * bodyw;
    } else {
      var imgh = 1.26 * bodyw;
    }
    let txth = 0.15 * bodyw;
    if (bodyh / bodyw > 1.8) {
      var margt = 0.1 * bodyh;
      this.topp = { top: "10%" };
    } else {
      var margt = 0.045 * bodyh;
      this.topp = { top: "4.5%" };
    }
    let h = bodyh - imgh - txth - margt;
    this.bott = { bottom: h / 2 + "px" };
  },
  methods: {
    //页面截取参数
     getUrlVars(){
            var vars = [], hash;
            var href = unescape(window.location.href);
            var hashes = href.slice(window.location.href.indexOf('?')+1).split('&');
            for(var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
    //s生成链接
    getShareInfo(path, tel, code) {
      var that = this;
      var params = new Object();
      params["methodName"] = "getShareParams";
      params["type"] = 1;
      params["code"] = "";
      params["needLogin"] = "1";
      params["platform"] = "0";
      params["pushShareMark"] = "";
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
    }
  },
  beforeMount() {
    window.scrollTo(0, 0);
  }
};
</script>
<style lang="less" scoped>
@import "../../../statics/less/base/method.less";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.left {
  float: left;
}
.right {
  float: right;
}

[v-cloak] {
  display: none !important;
}

.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./res/@{file}");
}
.ImgX( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./res/iphoneX/@{file}");
}

.share-page {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
  .part9 {
    height: 100%;
    .partTextAll {
      // .px2rem(padding-top, 30);
      .bg-img("textbg.png",750,964);
       position: relative;
      .part1Text {
          position: absolute;
          .px2rem(top, 20);
         text-align: center;
         left:2.2%;
         z-index: 100;
         .px2rem(padding-top, 240);
         .bg-img("text9.png",718,1116);
        .shareImg1 {
          .bg-img("share1.png",550,360);
           margin: 0 auto;
        }
        .shareImg2 {
          .bg-img("share2.png",550,360);
           margin: 0 auto;
        }
        .shareImg3 {
          .bg-img("share3.png",550,360);
           margin: 0 auto;
        }
        .shareImg4 {
          .bg-img("share4.png",550,360);
           margin: 0 auto;
        }
        .shareImgText1 {
          .bg-img("shareText1.png",550,74);
            margin: 0 auto;
          .px2rem(margin-top, 40);
          .px2rem(margin-bottom, 20);
         
        }
        .shareImgText2 {
          .bg-img("shareText2.png",550,74);
            margin: 0 auto;
          .px2rem(margin-top, 40);
          .px2rem(margin-bottom, 20);
        }
        .shareImgText3 {
          .bg-img("shareText3.png",550,74);
            margin: 0 auto;
          .px2rem(margin-top, 40);
          .px2rem(margin-bottom, 20);
        }
         .shareImgText4 {
          .bg-img("shareText4.png",550,74);
            margin: 0 auto;
          .px2rem(margin-top, 40);
          .px2rem(margin-bottom, 20);
        }

        .shareText {
          font-family: "PingFang-SC-Light";
          .px2rem(font-size, 30);
          color: #36363a;
        }
        .shareBottom{
             .px2rem(height, 180);
               position: absolute;
              .px2rem(bottom, 90);
                left:12.5%;
            .line{
                .bg-img("line.png",536,4);
                margin:0 auto;
            }
            .shareContent{
                .px2rem(width, 536);
                  .left{
                      .px2rem(margin-top, 74);
                  }
                .bottomLogo{
                    .bg-img("logo.png",268,40);
                     .px2rem(margin-bottom, 10);
                }
                .bottomText{
                    font-family: "PingFang-SC-Regular";
                    .px2rem(font-size, 26);
                    color: #36363A;
                    text-align:left;
                }
                .codeImg{
                  .px2rem(margin-top, 40);
                  .bg-img("code.png",140,140);
                }
            }
        }
      }
    }
    .part9yezi {
      .bg-img("yezi4.png",220,290);
      position: fixed;
      left: 0;
      z-index: 99;
      .px2rem(bottom, 0);
    }
    .part1Bottom {
      .bg-img("bottom9.png",750,360);
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
}

//iphoneX、iphoneXs
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .share-page .part9 .partTextAll{
     .px2rem(padding-top, 40);
     .part1Text{
         .px2rem(top, 40);
       .ImgX("iphone.png",718,1216);
       .px2rem(padding-top, 250);
      .shareImgText1,.shareImgText2,.shareImgText3,.shareImgText4{
         .px2rem(margin-top, 60);
       }
       .shareBottom{
        .px2rem(height, 200);
            position: absolute;
          .px2rem(bottom, 110);
           .shareContent{
                .left{
                    .px2rem(margin-top, 94);
                }
                .codeImg{
                  .px2rem(margin-top, 60);
                }
            }
       }
    }
   } 
}

//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .share-page .part9 .partTextAll{
    .px2rem(padding-top, 40);
    .part1Text{
       .px2rem(top, 40);
      .ImgX("iphone.png",718,1216);
      .px2rem(padding-top, 250);
      .shareImgText1,.shareImgText2,.shareImgText3,.shareImgText4{
        .px2rem(margin-top, 60);
      }
      .shareBottom{
        .px2rem(height, 200);
            position: absolute;
          .px2rem(bottom, 110);
           .shareContent{
                .left{
                    .px2rem(margin-top, 94);
                }
                .codeImg{
                  .px2rem(margin-top, 60);
                }
            }
       }
   }
  } 
}

//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  .share-page .part9 .partTextAll{
    .px2rem(padding-top, 40);
    .part1Text{
       .px2rem(top, 40);
      .ImgX("iphone.png",718,1216);
      .px2rem(padding-top, 250);
      .shareImgText1,.shareImgText2,.shareImgText3,.shareImgText4{
        .px2rem(margin-top, 60);
      }
      .shareBottom{
        .px2rem(height, 200);
            position: absolute;
          .px2rem(bottom, 110);
           .shareContent{
                .left{
                    .px2rem(margin-top, 94);
                }
                .codeImg{
                  .px2rem(margin-top, 60);
                }
            }
       }
   }
  } 
}
</style>

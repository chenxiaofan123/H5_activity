<template>
    <div class="wx-landing-page" v-cloak>
   
       <div class="img-canvas" id="img-canvas">
         <p></p>
         <!-- <v-qr :showFrameType='showFrameType' :url='url' @closeFrameBox="closeFrameBox"></v-qr> -->
       </div>
       <footer @click="share">分享测试</footer>
    </div>
</template>
<script>
import util from "../../utils/tool.js";
import html2canvas from "html2canvas";
/* in ES 6 */
import domtoimage from "dom-to-image";
//import{getNewUserGoldInfo} from '../../service/common/info/service.js';
export default {
  data() {
    return {
      imgurl: "",
      showFrameType: 2,
      url:'',
    };
  },
  watch: {},
  filters: {},
  components: {},
  mounted() {
    this.canvasUrl = this.gethtml2canvas();
  },
  computed: {},
  methods: {
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
      //生成二维码
    openFrameQr(e) {
      this.$sa.quick('trackHeatMap', e.currentTarget)
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      this.tipsShowQr = true;
      this.showFrameType = 2;
    },
    share() {
      var params_shared = {
        type: "3", //分享类型 1：新闻类分享  2：截图分享
        code: "privilege", //活动code，分享统计标示
        needLogin: "1",
        platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
        pushShareMark: "1", //是否需要统计用户分享
        imageData: this.imgurl //图片的字符串
      };
      GB.utils.callCustomMethod("share", params_shared);
    },
    imagetoCanvas() {},
    gethtml2canvas() {
      var that = this;
      var $register = document.getElementById("img-canvas");
      //var $register = document.getElementById("wx-landing-page");
      console.log($register);
      //  domtoimage
      //   .toPng($register)
      //   .then(function(dataUrl) {
      //     var img = new Image();
      //     img.src = dataUrl;
      //     img.style.transform = "scale(1)";
      //     that.imgurl = dataUrl.replace("data:image/png;base64,", "");
      //     console.log(that.imgurl);
      //     document.body.appendChild(img);
      //   })
      //   .catch(function(error) {
      //     console.error("oops, something went wrong!", error);
      //   });

      if (GB.utils.getPlatform() == "android") {
        domtoimage
          .toPng($register)
          .then(function(dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.style.transform = "scale(1)";
            that.imgurl = dataUrl.replace("data:image/png;base64,", "");
            console.log(that.imgurl);
            document.body.appendChild(img);
          })
          .catch(function(error) {
            console.error("oops, something went wrong!", error);
          });
      } else {
        domtoimage
          .toJpeg($register)
          .then(function(dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.style.transform = "scale(1)";
            that.imgurl = dataUrl.replace("data:image/jpeg;base64,", "");
            console.log(that.imgurl);
            document.body.appendChild(img);
          })
          .catch(function(error) {
            console.error("oops, something went wrong!", error);
          });
        // domtoimage
        //   .toSvg($register)
        //   .then(function(dataUrl) {
        //     var img = new Image();
        //     img.src = dataUrl;
        //    var reg = new RegExp("data:.*?base64,");
        //    //var regfooter = new RegExp(") format(truetype).*?");
        //    var header = dataUrl.match(reg);
        //    // that.imgurl = dataUrl;
        //     var url = dataUrl.replace(
        //       header,
        //       ""
        //     );
        //     that.imgurl = url.replace(
        //       ') format(truetype); font-style: normal; font-weight: normal; }</style></div></foreignObject></svg>',
        //       ""
        //     );
        //     // that.imgurl = url
        //     console.log("imgurl********"+that.imgurl);
        //     document.body.appendChild(img);
        //   })
        //   .catch(function(error) {
        //     console.error("oops, something went wrong!", error);
        //   });
      }
    }
  },
  beforeMount() {}
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
@import "../../less/special.less";
.barrage {
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  // font-family: "PingFangSC-Semibold";
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.padding {
  .px2rem(padding-left,40);
  .px2rem(padding-right,40);
}

.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./res/@{file}");
}

.border(@size,@color) {
  @bor: @size / 75 * 1rem;
  border: @bor solid @color;
}
[v-cloak] {
  display: none !important;
}

.wx-landing-page {
  font-family: "DIN-Regular", "黑体";
  .img-canvas {
    // .bg-img("https://img.g-banker.com/data/online/other/OJ7DALQB_20190730105150.png",750,1200);
    .px2rem(width, 750);
    .px2rem(height,1443);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("./res/qqq.png");
    position: relative;
    p {
      position: absolute;
      bottom: 20px;
      left: 20%;
      .bg-img("wx.png",200,200);
    }
  }
  footer {
    height: 100px;
    widows: 100px;
    background: #0056a0;
  }
}
</style>

/**页面内播放视频***/
var isOpenBig = false;
function Video(obj,type) {
	this.video = obj;
	this.isOpenBig = false;
	console.log("this.video"+type);
	this.$header = $("header");
	this.$type = type;
	this.$video = $(obj);
	this.$main = $(".video-main");
	this.$wrapper = $(".videobox");
	this.$close=this.$main.find(".close-video");
	this.$open = this.$main.find(".open-video");
	this.init();
}
Video.prototype = {
	init() {
        if(!this.is_weixn()){
            this.resize();
            this.bindUI();
        }else{
            window.onresize = function(){
                this.$wrapper.css('width', screen.width+ "px");
                this.$wrapper.css('height', screen.height + "px")

            }
		}

	},
    is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
	},
	bindUI() {
		this.end();
		var that = this;
		/**微信内事件**/
		this.video.addEventListener("x5videoexitfullscreen", function() {
            //退出全屏
            that.exit();

        })
        this.video.addEventListener("x5videoenterfullscreen", function() {
            //进入全屏
            that.play();
        })
		//ios
    /*    function is_weixn(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return true;
            } else {
                return false;
            }
        }*/
        if(this.is_weixn()){
        	return;
		}
		that.$video.on('webkitbeginfullscreen', function() {
			that.play();
		})/*.on('webkitendfullscreen', function() {
			that.exit();
		});*/
		that.$video.on("click",function(){
			//0 初始状态
			if(that.$type == 0){
                that.$open.show();
                setTimeout(function(){
                    that.$open.hide();
                },2000)
				return;
			}
            //1 放大状态
            if(that.$type == 1){
                that.$close.show();
                setTimeout(function(){
                    that.$close.hide();
                },2000)
                return;
            }
		})
		
		//android 下  全屏退出		
	/*	this.$main.on("click",function(e){
			e.stopPropagation()
			if(e.target.className=='video-main'){
				that.exit();
			}						
		})*/
		this.$close.on("click",function(){
            $("header").removeClass("bigShow");
            that.$open.show();
            that.$close.hide();
            that.$type = 0;
            that.$wrapper.css('width','100%')
		})
        this.$open.on("click",function(){
            that.$type = 1;
            that.resize();
            $("header").addClass("bigShow");
            that.$open.hide();
            that.$close.show();

        })
	},
	play() {
		var that=this;
		var loading=GB.utils.loading();		
		  var timer = setInterval(function(){
            var currentTime = that.video.currentTime; // 检测当前的播放时间
            if( currentTime>0 ){
                loading.destroy();
                clearInterval(timer);
                that.$main.show();
            }
        }, 100)		
		//this.video.play();
	},
	exit(){
		//退出播放
		    this.video.pause();
			this.video.currentTime=0;
			this.$main.hide();
			location.reload();
	},
	end() {
		var that = this;
		this.$video.on("ended", function() {
			//播放结束 隐藏
			that.$main.hide();
		})
	},
	resize() {
		var that = this;

		function handleResize() {
			var sWidth = 16
			var sHeight = 9
			var width = window.innerWidth
			var height = window.innerHeight			
			/*var ra=parseInt((height/width)*100)-12;*/
            var ra=parseInt((height/width)*100)-12;
			that.$wrapper.css('width', ra + '%')
		}
		if(this.$type == 1){
            handleResize()
            window.addEventListener('resize', function() {
                handleResize()
            })
		}

	}
}

export {Video,isOpenBig}
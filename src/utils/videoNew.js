/**页面内播放视频***/
function Video(obj) {
	this.video = obj;
	this.$video = $(obj);
	this.$main = $(".video-main");
	this.$wrapper = $(".videobox");
	this.$close=this.$main.find(".close");
	this.init();
}
Video.prototype = {
	init() {
		this.resize();
		this.bindUI();
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
		that.$video.on('webkitbeginfullscreen', function() {
			that.play();
		}).on('webkitendfullscreen', function() {
			that.exit();
		});
		that.$video.on("click",function(){
			that.$close.show();
			setTimeout(function(){
			that.$close.hide();	
			},2000)
		})
		
		//android 下  全屏退出		
		this.$main.on("click",function(e){
			e.stopPropagation()
			if(e.target.className=='video-main'){
				that.exit();
			}						
		})
		this.$close.on("click",function(){
			that.exit();
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
		this.video.play();
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
			var ra=parseInt((height/width)*100)-12;
			that.$wrapper.css('width', ra + '%')
		}
		handleResize()
		window.addEventListener('resize', function() {
			handleResize()
		})
	}
}

export default Video;
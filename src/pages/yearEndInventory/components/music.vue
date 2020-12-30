<template>
    <div class="music">
        <audio :src='musicsrc' id="Jaudio" class="media-audio"  preload loop="loop" hidden="false"></audio>  
        <div class="icon"></div>
    </div>
</template>
<script>
/* eslint-disable */
    export default{
        data() {
            return {}
        },
        props: {
            musicsrc: {}
        },
        methods: {
             // 音乐背景 
            play() {
                this.audio.play()
                this.icon.classList.add('play');
                this.icon.classList.remove('stop');
            },
            stop() {
                this.audio.pause()
                this.icon.classList.add('stop');
                this.icon.classList.remove('play');
            },
            audioAutoPlay() {
                this.audio.play();
                var that=this;
                //控制小喇叭的播放状态
                this.audio.addEventListener("playing", function(){        
                    that.icon.classList.add('play');
                    that.icon.classList.remove('stop');
                });
                this.audio.addEventListener("pause", function(){
                    that.icon.classList.add('stop');
                    that.icon.classList.remove('play');
                });               
                document.addEventListener("WeixinJSBridgeReady", function () {  
                    that.audio.play();
                    this.icon.classList.add('play');
                    this.icon.classList.remove('stop');
                }, false);
                this.icon.addEventListener("click", () => {
                    if (this.audio.paused) {
                        this.play()
                    } else {
                        this.stop()
                    } 
                }, false);
                // 触发播放音乐效果，解决浏览器或者APP自动播放问题
                document.addEventListener("touchstart", () => {
                    if(!this.isPlay) {
                        this.play();
                        this.isPlay = true;
                    }
                }, false) 
            },
          
        },
        mounted() {
            this.audio = window.document.querySelector('.media-audio');
            this.icon = window.document.querySelector('.icon');        
            this.audioAutoPlay();
        }
    }
</script>
<style  lang="less">
    .music {
    position:fixed;
    z-index:1000;
    top:50px;
    right:20px;
    
    .icon{
        width:60px;
        height:50px;
        background:url('https://pic.51zhangdan.com/u51/storage/dd/df9e5296-1fa9-f3c4-6151-afeab9c2f34d.png') no-repeat;
        background-size: 100%;  
        &.play{
            animation: 4s linear 0s normal none infinite rotate;
            // animation-fill-mode:forwards;
            // animation-play-state: running;
        }
        &.stop{
            // animation: 4s linear 0s normal none infinite rotate;
            // animation-fill-mode:forwards;
            // animation-play-state: paused;
        }
    }
}

@keyframes rotate{
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
}
</style>
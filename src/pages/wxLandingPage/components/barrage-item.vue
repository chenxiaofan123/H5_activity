<template>
    <div :id="ID" class="barrage-item">

    </div>
</template>
<script>
const raf = require("raf");
export default {
  name: "barrage-item",
  props: {
    time: {
      type: Number
    },
    list: {
      type: Array
    },
    height: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      IDList: [],
      waitUseList: [],
      lastBox: null,
      ID: "barrage-item",
      count: 0,
      barrageItem: null,
      barrageItemWid: null
    };
  },
  methods: {
    addBox(val) {
      if (!!val) {
        if (!!this.lastBox) {
          if (parseInt(this.lastBox.style.right) < 0) {
            return;
          }
        }
        let parm = {},
          box = null;
        let speed = 1; //默认速度
        let quicklyshow = 0; //标记其后面的item是否需要快速展示
        //取随机概率是否快速展示
        // let number = this.rnd(1, 2);
        // if (number == 1) {
        //   quicklyshow = 1;
        // }
        if (!!this.lastBox) {
          let boxquicklyshow = this.lastBox.getAttribute("quicklyshow");
          if (boxquicklyshow == "1") {
            let boxfinish = this.lastBox.getAttribute("finish");
            if (boxfinish == "1") {
             // speed = 2;
              quicklyshow = 0;
            } else {
              return;
            }
          }
        }
        if (this.waitUseList.length > 0) {
          let ID = this.waitUseList[0].ID;
          parm = {
            ID: ID,
            speed: speed
          };
          this.waitUseList.shift();
          box = document.getElementById(ID);
          if (!!box) {
            // if (val.indexOf("我：") != -1) {
            //   box.innerHTML =
            //     "<span class='barrage-item-box-text2'>" + val + "</span>";
            // } else {
            //   box.innerHTML =
            //     "<span class='barrage-item-box-text'>" + val + "</span>";
            // }
            box.innerHTML =
              "<span class='barrage-item-box-text'>" + val + "</span>";
          }
        } else {
          let ID = "barrage-item-" + this.index + "-" + new Date().getTime();
          parm = {
            ID: ID,
            speed: speed
          };
          box = document.createElement("span");
          if (!box) {
            return;
          }
          box.setAttribute("ID", ID);
          box.setAttribute("class", "barrage-item-box");
          // if (val.indexOf("我：") != -1) {
          //   box.innerHTML =
          //     "<span class='barrage-item-box-text2'>" + val + "</span>";
          // } else {
          //   box.innerHTML =
          //     "<span class='barrage-item-box-text'>" + val + "</span>";
          // }
          box.innerHTML =
            "<span class='barrage-item-box-text'>" + val + "</span>";
          this.barrageItem.appendChild(box);
        }
        if (!box) {
          return;
        }
        box.setAttribute("quicklyshow", quicklyshow);
        box.setAttribute("finish", "0");

        let boxWid = box.clientWidth;
        box.style.right = "-" + (boxWid + 10) + "px";
        this.IDList.push(parm);
        this.lastBox = box;
      }
    },
    rnd(n, m) {
      var random = Math.floor(Math.random() * (m - n + 1) + n);
      return random;
    },
    loopInter() {
      //window.requestAnimationFrame(this.loopInter);
      raf(this.loopInter);
      this.count = this.count + 1;
      if (window.isInData) {
        //单线程控制
        return;
      }
      //判断频率
      if (this.count <= this.rnd(10, 150)) {
        //控制间隔
        return;
      }
      this.count = 0;
      window.isInData = true;
      if (typeof window.currentIndex == "undefined") {
        window.currentIndex = -1;
      }
      window.currentIndex = window.currentIndex + 1;
      if (window.currentIndex >= this.list.length) {
        window.currentIndex = 0;
      }
      let _text = this.list[window.currentIndex];
      this.addBox(_text);
      window.isInData = false;
    },
    loopRoll() {
      window.setInterval(() => {
        this.move();
      }, 10);
    },
    move() {
      if (window.isMove) {
        return;
      }
      window.isMove = true;
      let ele = null,
        item = null,
        _IDList = [];
      for (let i = 0; i < this.IDList.length; i++) {
        item = this.IDList[i];
        ele = document.getElementById(item.ID);
        if (ele) {
          let _cr = ele.style.right;
          let speed = item.speed;
          _cr = parseInt(_cr) + 1 * speed;
          ele.style.right = _cr + "px";
          if (_cr > this.barrageItemWid + 10) {
            //清除该盒子
            //ele.parentNode.removeChild(ele);
            ele.setAttribute("finish", "1");
            this.waitUseList.push(item);
          } else {
            _IDList.push(item);
          }
        }
      }
      this.IDList = _IDList;
      window.isMove = false;
    }
  },
  created: function() {
    this.ID = this.ID + this.index;
  },
  mounted: function() {
    this.barrageItem = document.getElementById(this.ID);
    this.$nextTick(() => {
      //  this.barrageItem.style.lineHeight = this.height+"px";
      this.barrageItemWid = parseInt(
        window.getComputedStyle(this.barrageItem, null)["width"]
      );
      //this.loopInter();
      //window.requestAnimationFrame(this.loopInter);
      raf(this.loopInter);
      this.loopRoll();
    });
  }
};
</script>
<style lang="less">
@import "../../../../statics/less/base/method.less";
@rem : 10rem;
.barrage-item {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.barrage-item-box {
  position: absolute;
  white-space: nowrap;
  top: 0;
  right: -100%;
  //height: 100%;
  display: block;
  // background-color: rgba(24, 108, 41, 0.3);
  padding: 5px 10px;
  // border-radius: 20 / @rem;
  box-sizing: border-box;
}
.barrage-item-box-text {
  font-size: 14px;
  box-sizing: border-box;
  color: #0056a0;
  display: block;
 background-image: linear-gradient(90deg, #FFB800 0%, #FF8700 100%);
  .px2rem(border-radius,54);
  display: block;
  // .px2rem(min-width,500);
  .px2rem(height,70);
  .px2rem(line-height,70);
  text-align: center;
  .px2px(font-size,24);
  .px2rem(padding-left,30);
  .px2rem(padding-right,30);
  color: #ffffff;
}
.barrage-item-box-text2 {
  background: #300068;
  border: 1px solid #f5a623;
  box-shadow: 0 0 4px 0 #f5a623;
  .px2rem(border-radius,100);
  display: block;
  .px2rem(min-width,400);
  .px2rem(height,50);
  .px2rem(line-height,50);
  text-align: center;
  .px2px(font-size,24);
  .px2rem(padding-left,20);
  .px2rem(padding-right,20);
  color: #ffd200;
}
</style>

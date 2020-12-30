
var Fontmin = require('fontmin');//引入插件，当第一步中，使用全局下载的插件，这里路径要注意匹配，否则后面运行时会报找不到模块的错误，所以建议使用第二种：下载到当前项目的依赖中，本文件（fontmin.js）也建在当前项目目录下
 
var srcPath = 'SetoFont-1.ttf'; // 字体源文件路径，需要保证该ttf文件存在
var destPath = './fontmin';    // 字体输出路径
var text = '一覺醒来，发现自己在一张玉床上，你会覺得…A.穿越了荊B.床硬了C.升仙了D.有点餓1/5你立刻爬起来走到一面鏡子前，你发现自己…A.美翻了B.丑哭了C.帅炸了突然門被打开了，走進来一个人，TA是…A.道骨仙風的男人B.丑陋的巫婆C.穿紅肚兜的小孩D.貌美如花的仙女告訴了你真实身份，你竟然是…A.女娲的后人B.到处漂泊的孤儿C.遺落民間的皇室子孙留給你了一样________，并轉身走出屋门你命中注定的另一半是再测一次告訴全世界我是男生我是女生A.写满銘文的卷书B.披襟斩棘的宝剑C.盛满神奇藥水的魔瓶234567890点击右上角分享哦生成中…启';//这里进行配置需要用到的字符，可以是中文或英文字母
 
// 初始化
var fontmin = new Fontmin()
    .src(srcPath)               // 输入配置
    .use(Fontmin.glyph({        // 字型提取插件
        text: text              // 所需文字
    }))
    .use(Fontmin.ttf2eot())     // eot 转换插件
    .use(Fontmin.ttf2woff())    // woff 转换插件     
    .use(Fontmin.ttf2svg())     // svg 转换插件
    .use(Fontmin.css())         // css 生成插件
    .dest(destPath);            // 输出配置
 
// 执行
fontmin.run(function (err, files, stream) {
 
    if (err) {                  // 异常捕捉
        console.error(err);
    }
 
    console.log('done');        // 成功
});
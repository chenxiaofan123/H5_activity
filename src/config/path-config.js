let pathConfig = {};
let ENV = process.env.NODE_ENV;
let path = require('path');

if(ENV === 'dev'){
    pathConfig.publicPath="/";
    pathConfig.pageConfig = path.resolve(__dirname, 'prjConfig.dev.js');
    pathConfig.routerConfig = path.resolve(__dirname, 'routerConfig-dev.js');
}

if(ENV === 'test'){
    pathConfig.publicPath = 'https://test-app-activity.g-banker.com/';
    pathConfig.pageConfig = path.resolve(__dirname, 'prjConfig.test.js');
    pathConfig.routerConfig = path.resolve(__dirname, 'routerConfig-test.js');
}
if(ENV === 'testfat'){
    pathConfig.publicPath = 'https://test-activity.g-banker.com/';
    pathConfig.pageConfig = path.resolve(__dirname, 'prjConfig.testfat.js');
    pathConfig.routerConfig = path.resolve(__dirname, 'routerConfig-testfat.js');
}
if(ENV === 'testuat'){
    pathConfig.publicPath = 'https://uat-activity.g-banker.com/';
    pathConfig.pageConfig = path.resolve(__dirname, 'prjConfig.testuat.js');
    pathConfig.routerConfig = path.resolve(__dirname, 'routerConfig-testuat.js');
}
if(ENV === 'online'){
    pathConfig.publicPath="https://static02.huangjinqianbao.com/GbankerAppActivity/";
    pathConfig.pageConfig = path.resolve(__dirname, 'prjConfig.online.js');
    pathConfig.routerConfig = path.resolve(__dirname, 'routerConfig-online.js');
}

module.exports=pathConfig
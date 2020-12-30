/**
 * Created by cr on 2016/8/25.
 */

 /*
 * 192.168.10.11:8086
 */
module.exports = {};
global.GLOBAL_HESSIAN = 'http://10.172.254.200:7201/crmServerHessian/';
global.GLOBAL_SERVERHOST = 'https://devapi.huangjinqianbao.com';
global.GLOBAL_SERVERHOST2 = 'https://devapi.huangjinqianbao.com';
global.GLOBAL_SERVERHOST3 = 'https://liveapi-test.b-banker.com';
global.GLOBAL_APOLLO = 'https://apollo-meta-dev.g-banker.com';
global.MYSQL_HOST = 'rdsjrneezjrneez.mysql.rds.aliyuncs.com';
global.MYSQL_DATABASE = 'gbanker_onlinetest';
global.MYSQL_USER = 'gbanker';
global.MYSQL_PASSWORD = 'gbanker';
if(process.env.env == 'online'){
    global.GLOBAL_HESSIAN = 'http://10.172.254.200:7201/crmServerHessian/';//测试
    global.GLOBAL_SERVERHOST = 'http://internal-api.huangjinqianbao.com';
    global.GLOBAL_SERVERHOST2 = 'http://internal-api.huangjinqianbao.com';
    global.GLOBAL_SERVERHOST3 = 'https://liveapi.b-banker.com';
    global.GLOBAL_APOLLO = 'http://apollo-meta-inner.g-banker.com';
    global.MYSQL_HOST = 'rdsd6bpsvk81879g426r.mysql.rds.aliyuncs.com';
    global.MYSQL_DATABASE = 'gbanker_v3';
    global.MYSQL_USER = 'gbanker_w';
    global.MYSQL_PASSWORD = 'asd123QWEasdczxc';
}else if(process.env.env == 'beta'){
    global.GLOBAL_HESSIAN = 'http://10.172.254.200:7201/crmServerHessian/';//测试
    global.GLOBAL_SERVERHOST = 'http://internal-api.huangjinqianbao.com';
    global.GLOBAL_SERVERHOST2 = 'http://internal-api.huangjinqianbao.com';
    global.GLOBAL_SERVERHOST3 = 'https://liveapi.b-banker.com';
    global.GLOBAL_APOLLO = 'http://apollo-meta-beta-inner.g-banker.com';
    global.MYSQL_HOST = 'rdsd6bpsvk81879g426r.mysql.rds.aliyuncs.com';
    global.MYSQL_DATABASE = 'gbanker_v3';
    global.MYSQL_USER = 'gbanker_w';
    global.MYSQL_PASSWORD = 'asd123QWEasdczxc';
}else if(process.env.env == 'test'){
    global.GLOBAL_HESSIAN = 'http://172.17.2.47:7201/crmServerHessian/';//测试
    global.GLOBAL_SERVERHOST = 'https://devapi.huangjinqianbao.com';
    global.GLOBAL_SERVERHOST2 = 'https://devapi.huangjinqianbao.com';
    global.GLOBAL_SERVERHOST3 = 'https://liveapi-test.b-banker.com';
    global.GLOBAL_APOLLO = 'https://apollo-meta-dev.g-banker.com';
    global.MYSQL_HOST = 'rdsjrneezjrneez105.mysql.rds.aliyuncs.com';
    global.MYSQL_DATABASE = 'gbanker_onlinetest';
    global.MYSQL_USER = 'gbanker';
    global.MYSQL_PASSWORD = 'gbanker';
}else if(process.env.env == 'testfat'){
    global.GLOBAL_HESSIAN = 'http://172.17.2.47:7201/crmServerHessian/';//测试
    global.GLOBAL_SERVERHOST = 'https://testapi.g-banker.com';
    global.GLOBAL_SERVERHOST2 = 'https://testapi.g-banker.com';
    global.GLOBAL_SERVERHOST3 = 'https://liveapi-test.b-banker.com';
    global.GLOBAL_APOLLO = 'https://apollo-meta-dev.g-banker.com';
    global.MYSQL_HOST = 'rdsjrneezjrneez.mysql.rds.aliyuncs.com';
    global.MYSQL_DATABASE = 'gbanker_onlinetest';
    global.MYSQL_USER = 'gbanker';
    global.MYSQL_PASSWORD = 'gbanker';
}else if(process.env.env == 'testuat'){
    global.GLOBAL_HESSIAN = 'http://172.17.2.47:7201/crmServerHessian/';//测试
    global.GLOBAL_SERVERHOST = 'https://uatapi.g-banker.com';
    global.GLOBAL_SERVERHOST2 = 'https://uatapi.g-banker.com';
    global.GLOBAL_SERVERHOST3 = 'https://liveapi-test.b-banker.com';
    global.GLOBAL_APOLLO = 'https://apollo-meta-dev.g-banker.com';
    global.MYSQL_HOST = 'rdsjrneezjrneez.mysql.rds.aliyuncs.com';
    global.MYSQL_DATABASE = 'gbanker_onlinetest';
    global.MYSQL_USER = 'gbanker';
    global.MYSQL_PASSWORD = 'gbanker';
}else{
    global.GLOBAL_HESSIAN = 'http://172.17.2.47:7201/crmServerHessian/';//测试
    global.GLOBAL_SERVERHOST = 'https://devapi.huangjinqianbao.com';
    //global.GLOBAL_SERVERHOST = 'http://10.172.254.200:8081';
    global.GLOBAL_SERVERHOST2 = 'https://devapi.huangjinqianbao.com';
    global.GLOBAL_SERVERHOST3 = 'https://liveapi-test.b-banker.com';
    global.GLOBAL_APOLLO = 'https://apollo-meta-dev.g-banker.com';
    global.MYSQL_HOST = 'rdsjrneezjrneez105.mysql.rds.aliyuncs.com';
    global.MYSQL_DATABASE = 'gbanker_onlinetest';
    global.MYSQL_USER = 'gbanker';
    global.MYSQL_PASSWORD = 'gbanker';
    global.GLOBAL_REDISHOST='462e2bd1f68542db521.redis.rds.aliyuncs.com';
}
global.GLOBAL_REDISHOST = process.env.env == 'online'?'727fd4bc071e436b.m.cnhzfb.kvstore.aliyuncs.com':'462e2bd1f68542db521.redis.rds.aliyuncs.com';
global.GLOBAL_REDISPASS = process.env.env == 'online'?'Ou2LRLK69ylh0zAt':'462e2bd1f68542db:23weSD06tgJOIRMJtewrk95r4';
if(process.env.env == 'testfat'){
    global.GLOBAL_REDISHOST = 'r-bp1c1e69794f5644.redis.rds.aliyuncs.com'
    global.GLOBAL_REDISPASS = 'Gkvb9861&!kd'
 }
if(process.env.env == 'testuat'){
    global.GLOBAL_REDISHOST = 'r-bp1aa41944ccb784.redis.rds.aliyuncs.com'
    global.GLOBAL_REDISPASS = 'Gkvb9861&!kdvb'
 }
global.GLOBAL_REDISPORT = '6379';
global.IS_TEST = true;
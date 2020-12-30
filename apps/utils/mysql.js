var wrapper = require('co-mysql');
var mysql = require('mysql');
var options={
    host:global.MYSQL_HOST,
    port : 3306 ,
    database : global.MYSQL_DATABASE,
    user: global.MYSQL_USER,
    password : global.MYSQL_PASSWORD
}
const pool = mysql.createPool(options);
const p = wrapper(pool);
const app = module.exports = {};

app.doSql = function* (sql){
    console.info(sql);
    var rows = yield p.query(sql);
    console.info(rows);
    return rows;
}
app.pool=pool;
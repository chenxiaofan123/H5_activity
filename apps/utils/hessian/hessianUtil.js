

//hession 相关功能函数


var utils={
        mapToObject(map){
                //map类型转换为 object
          var result={};
          map.forEach(function(value,key) {
                  if(key){
                   result[key]=value;
                  }
                
          });
          return result;
        }
}

module.exports=utils;



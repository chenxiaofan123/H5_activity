

/*****
 * 
 * 公共的vue filter 过滤器函数
 */

 export const formatMoney=(value)=>{
     if(!value) {
         return ;
     }
      return (Number(value)/100).toFixed(2);
 }
 export const numFormat=(num)=>{
    var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return c;
 }
 
 //球队份额初始化
 export const notesFormat=(num)=>{
    if(typeof num ==='number'){
        return num/10;
    } else{
        return '--';
    }

    
 }
 export const formateRate = (value)=>{
    if(!value) {
        return ;
    }
     return (Number(value)/100).toFixed(1);
 }
 //三位分割
 export const formateMoneySplit = (value)=>{
    if(!value) {
        return ;
    }
     return parseFloat((value/100).toFixed(2)).toLocaleString();
 }
 //空值‘--’替代
 export const formateNotData = (value)=>{
    if(!value&&value!=0) {
        return '--';
    }
    return value;
 }
 //不足兩位數自动补0
 export const formateTwoCell = (value,length=2)=>{
    var tbl = [];
    var len = length-value.toString().length;
    if (len <= 0) return value;
    if (!tbl[len]) tbl[len] = (new Array(len+1)).join('0');
    return tbl[len] + value;
 }
 //去掉年
 export const formateRemoveYear = (value)=>{
     if(!value){
        return '--'
     }
    return value.split('年')[1];
 }


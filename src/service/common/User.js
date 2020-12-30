export default class User {
    constructor() {
        this.hadTriedToGetTelephone = false;
        this.isLogin = false;
        this.telephone = '';
        this.sessionId='';
    }
    login() {
        return new Promise((resolve, reject) => {
            sessionProObj.getUserInfo((telephone,sessionId) => {
                if (telephone) {
                    this.isLogin = true;
                    this.telephone = telephone;
                    this.sessionId=sessionId;
                    resolve(this.telephone,this.sessionId);
                }  else{
                    resolve('','');
                }
            })
        })
    }
    callAppLogin() {
        GB.utils.send({
            'methodName': 'login',
            'data': {},
            'responseCallback': function (responseData) {}
        })
    }
}
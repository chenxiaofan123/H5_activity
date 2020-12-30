/**
 * Created by ckid_hjqb on 2016/12/14.
 */


var toastObj = (function (toastObj) {
    //绑定关闭按钮
    $('#button-close').bind('click', function (e) {
        e.preventDefault();
        $('#alert').hide();
        $('.x-mask').hide();
    });
    $('modal-wrapper').on('click', function(e){
        return false;
    })
    $('modal-wrapper').on('touchmove', function(e){
        return false;
    })
    return {
        showToast: function (msg) {
            $('#msg-text').html(msg);
            $('#alert').show();
            $('.x-mask').show();
        }
    }
}(toastObj||{}));
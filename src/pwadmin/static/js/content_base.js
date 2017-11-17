function getTotal(data) {
    var count = 0;
    if (data.hasOwnProperty('total')) {
        count = data.total;
    }
    return count;
}

leftVaigation();

var BaseUrl = window.location.href;
BaseUrl = BaseUrl.substring(0, BaseUrl.indexOf("?") - 1);
BaseUrl = decodeURI(BaseUrl);

var pic = $('.pic');
pic.mousemove(function () {
    var path = $(this).attr("data-src");
    $(".pic_big").attr('src', path);
    $('.amend_pic').css('display', 'block');
});
pic.mouseout(function () {
    $('.amend_pic').css('display', 'none');
});


function get_times(day) {
    var start_date = new Date();
    start_date.setDate(start_date.getDate() - day);
    var end_date = new Date();
    end_date.setDate(end_date.getDate() + 1);
    var start = start_date.Format("yyyy-MM-dd HH:mm:ss");
    var end = end_date.Format("yyyy-MM-dd HH:mm:ss");
    return [start, end]
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": '00', //小时
        "m+": '00', //分
        "s+": '00', //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
function patchwork_url(data) {
    var param_str = '';
    for (var key in data) {
        if (param_str.length > 0) {
            param_str = param_str + '&' + key + '=' + data[key];
        }
        else {
            param_str = param_str + key + '=' + data[key];
        }
    }
    if (param_str.length > 0) {
        window.location = BaseUrl + '?' + param_str;
    }
    else {
        window.location = BaseUrl;
    }
}

function query_func(data_extends, methodStr) {
    var data = {
        'version': 9999,
        'uid': 1,
        "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
        'csrfmiddlewaretoken': csrfmiddlewaretoken
    };
    for (var i in data_extends) {
        data[i] = data_extends[i];
    }
    $.ajax({
        type: methodStr,
        url: '',
        data: data,
        dataType: 'json',
        success: function (data) {
            window.location.reload();
        }
    });
}
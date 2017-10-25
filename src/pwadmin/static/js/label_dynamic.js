var BaseUrl = window.location.href;
BaseUrl = decodeURI(BaseUrl);
$(".pic").mousemove(function () {
    var path = $(this).attr("data-src");
    $(".pic_big").attr('src', path);
    $('.amend_pic').css('display', 'block');
});
$(".pic").mouseout(function () {
    $('.amend_pic').css('display', 'none');
});

var param = BaseUrl.substring(BaseUrl.lastIndexOf('/') + 1);

function clear_info() {
    $('.start').val('');
    $('.end').val('');
    $('.peiwo_id').val('');
}

function search_data() {
    var url = BaseUrl;
    var begin_origin = getUrlParam('begin_time');
    var begin_time = $('.start').val();
    url = change_url('begin_time', begin_origin, begin_time, url);
    var end_origin = getUrlParam('end_time');
    var end_time = $('.end').val();
    url = change_url('end_time', end_origin, end_time, url);
    var tuid_origin = getUrlParam('tuid');
    var tuid = $('.peiwo_id').val();
    url = change_url('tuid', tuid_origin, tuid, url);
    window.location = url;
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
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null; //返回参数值
}

function deal(action) {
    var state = action;
    var pub_ids = get_ids()[0];
    var tuids = get_ids()[1];
    if (state == 9) {
        alert(pub_ids);
    }
    else if (state == 3) {
        $('.comment').css('display', 'block');
    }
    else if (state == 10) {
        $('.to_top').css('display', 'block');
    }
    else {
        if (!confirm('Are you sure?')) {
            return;
        }
        else {
            data = {
                'query_method': 'POST',
                'api_request': '/admin/feed/topicpub/reset',
                'version': 9999,
                'uid': 1,
                "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
                'pub_ids': pub_ids,
                'state': state,
                'csrfmiddlewaretoken': csrfmiddlewaretoken
            };
            query_func(data, 'POST');
            if (state == 2) {
                if (tuids.length > 0) {
                    for (var i = 0; i < tuids.length; i++) {
                        var data_extends = {
                            'query_method': 'POST',
                            'api_request': '/admin/userinfo/updateinfo',
                            'version': 9999,
                            'uid': 1,
                            "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
                            'tuid': tuids[i],
                            'state': state,
                            'csrfmiddlewaretoken': csrfmiddlewaretoken
                        };
                        query_func(data_extends, 'POST');
                    }
                }
            }
            window.location.reload();
        }
    }
}

function to_top(action) {
    var pub_ids = get_ids()[0].split(',');
    if (action == 0) {
        $('.to_top').css('display', 'none');
    }
    else {
        if (pub_ids.length == 1) {
            data = {
                'query_method': 'POST',
                'api_request': '/admin/feed/topicpub/top',
                'version': 9999,
                'uid': 1,
                "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
                'pub_id': pub_ids[0],
                'cancel': 0,
                'csrfmiddlewaretoken': csrfmiddlewaretoken
            };
            query_func(data, 'POST');
            window.location.reload();
        }
        else {
            alert("每次只能置顶一个用户！");
        }
    }
}

function send_message(type) {
    var comment = get_message(type);
    var tuids = get_ids()[1];
    var pub_ids = get_ids()[0];
    var data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topicpub/reset',
        'version': 9999,
        'uid': 1,
        "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
        'pub_ids': pub_ids,
        'state': 2,
        'csrfmiddlewaretoken': csrfmiddlewaretoken
    };
    query_func(data, 'POST');
    if (tuids.length > 0) {
        for (var i = 0; i < tuids.length; i++) {
            var data_extends = {
                'query_method': 'POST',
                'api_request': '/message/send',
                'version': 9999,
                'uid': 1,
                "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
                'tuid': tuids[i],
                'content': comment,
                'normal': 0,
                'csrfmiddlewaretoken': csrfmiddlewaretoken
            };
            query_func(data_extends, 'POST');
        }
    }
    window.location.reload();
}

function get_ids() {
    var ids = '';
    var tuids = '';
    var r = document.getElementsByName("id");
    for (var i = 0; i < r.length; i++) {
        if (r[i].checked) {
            if (i == r.length - 1) {
                ids = ids + r[i].id;
                tuids = tuids + r[i].className;
            }
            else {
                ids = ids + r[i].id + ',';
                tuids = tuids + r[i].className + ',';
            }
        }
    }
    if (tuids.length > 0) {
        tuids = tuids.split(',');
    }
    return [ids, tuids];
}

var times = 0;
$(".checkall").click(function () {
    if (times % 2 == 0) {
        $("input[name='id']").attr("checked", "true");
    }
    else {
        $("input[name='id']").removeAttr("checked");
    }
    times = times + 1;
});

var comment = '';

function get_message(type) {
    if (type == 1) {
        comment = "经管理后台核实，你在信息流文字/图片中涉及其他三方的账号/二维码/链接等导流信息；已删除且警告一次；累计警告3次，立即封号处理。 更好的环境需要大家共同营造，请保持良好的社交习惯。"
    }
    else if (type == 2) {
        comment = "经管理后台核实，你在信息流文字/图片中涉及语言暴力诋毁他人，已删除且警告一次，累计警告3次，立即封号处理。更好的环境需要大家共同营造，请保持良好的社交习惯。"
    }
    else if (type == 3) {
        comment = "经管理后台核实，你在信息流中图片/文字中涉及转发、举报、刷屏等，已删除且警告一次，累计警告3次，立即封号处理。如有节目需要推荐， 可以在[侧边栏--设置--意见反馈--向我反馈--节目报名]里报名，会有工作人员根据内容时间安排的，多谢配合。"
    }
    else if (type == 4) {
        comment = "经管理后台核实，你在信息流文字/图片中涉及色情信息等； 已删除且警告一次；累计警告3次，立即封号处理。 更好的环境需要大家共同营造，请保持良好的社交习惯。"
    }
    else if (type == 5) {
        comment = "经管理后台核实，你在信息流文字/图片中涉及广告信息等；已删除且警告一次；累计警告3次，立即封号处理。 更好的环境需要大家共同营造，请保持良好的社交习惯。";
    }
    else if (type == 6) {
        comment = "经管理后台核实，你在信息流中涉及侵权/泄露隐私等，已删除且警告一次，累计警告3次，立即封号处理。更好的环境需要大家共同营造，请保持良好的社交习惯。";
    }
    else if (type == 7) {
        comment = "经管理后台核实，你在信息流中涉及网骗/欺诈等，已删除且警告一次，累计警告3次，立即封号处理。更好的环境需要大家共同营造，请保持良好的社交习惯。";
    }
    else {
        comment = '未知'
    }
    return comment;
}
var BaseUrl = window.location.href;
BaseUrl = BaseUrl.substring(0, BaseUrl.indexOf("?") - 1);
BaseUrl = decodeURI(BaseUrl);

//click pages to get data
function servlet_page(page) {
    var data = {
        'page': page
    };
    if (begin_time_param.length > 0) {
        data['begin_time'] = begin_time_param;
    }
    if (end_time_param.length > 0) {
        data['end_time'] = end_time_param;
    }
    if (state_param.length > 0) {
        data['state'] = state_param;
    }
    if (tuid_param.length > 0) {
        data['tuid'] = tuid_param;
    }
    patchwork_url(data);
}

//write time to get data
function servlet_time(day) {
    var times = get_times(day);
    var data = {
        'begin_time': times[0],
        'end_time': times[1]
    };
    if (state_param.length > 0) {
        data['state'] = state_param;
    }
    if (tuid_param.length > 0) {
        data['tuid'] = tuid_param;
    }
    patchwork_url(data);
}

//select state to get data
function servlet_state(state) {
    var begin_time = $('.start').val();
    var end_time = $('.end').val();
    var tuid = $('.peiwo_id').val();
    var data = {
        'state': state
    };
    if (begin_time.length > 0) {
        data['begin_time'] = begin_time;
    }
    if (end_time.length > 0) {
        data['end_time'] = end_time;
    }
    if (tuid.length > 0) {
        data['tuid'] = tuid;
    }
    patchwork_url(data);
}

//write info to get data
function search_data() {
    var begin_time = $('.start').val();
    var end_time = $('.end').val();
    var tuid = $('.peiwo_id').val();
    var data = {};
    if (begin_time.length > 0) {
        data['begin_time'] = begin_time;
    }
    if (end_time.length > 0) {
        data['end_time'] = end_time;
    }
    if (tuid.length > 0) {
        data['tuid'] = tuid;
    }
    if (state_param.length > 0) {
        data['state'] = state_param;
    }
    patchwork_url(data);
}

//clear infos
function clear_info() {
    $('.start').val('');
    $('.end').val('');
    $('.peiwo_id').val('');
}

//deal with the data
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
    else {
        if (!confirm('Are you sure?')) {
            return;
        }
        else {
            var data = {
                'query_method': 'POST',
                'api_request': '/admin/feed/userpub/reset',
                'pub_ids': pub_ids,
                'state': state
            };
            query_modify(data, 'POST');
            if (state == 2) {
                if (tuids.length > 0) {
                    for (var i = 0; i < tuids.length; i++) {
                        var data_extends = {
                            'query_method': 'POST',
                            'api_request': '/admin/userinfo/updateinfo',
                            'tuid': tuids[i],
                            'state': state
                        };
                        query_modify(data_extends, 'POST');
                    }
                }
            }
            window.location.reload();
        }
    }
}

//send message to warn users
function send_message(type) {
    var comment = get_message(type);
    var tuids = get_ids()[1];
    var pub_ids = get_ids()[0];
    var data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/userpub/reset',
        'pub_ids': pub_ids,
        'state': 2
    };
    query_modify(data, 'POST');
    if (tuids.length > 0) {
        for (var i = 0; i < tuids.length; i++) {
            var data_extends = {
                'query_method': 'POST',
                'api_request': '/message/send',
                'tuid': tuids[i],
                'content': comment,
                'normal': 0
            };
            query_modify(data_extends, 'POST');
        }
    }
    window.location.reload();
}

//get the infos which is checked
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

//to check all or check none
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
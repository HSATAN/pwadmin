var pageRequest = 1;
var commonFields = {
    'message_send': 0,
    'success_action': 0
};
var dataSource = {
    'api_request': '/admin/feed/userpub',
    'query_method': 'POST',
    'page_size': 10,
    'begin_index': 0,
    'state': 0
};
// 加载table部分
loadTablecontentSubmitdynamic({});
function loadTablecontentSubmitdynamic(data) {
    for (var i in data) {
        if (data[i] !== '') {
            dataSource[i] = data[i];
        }
        else {
            if (dataSource.hasOwnProperty(i)) {
                delete dataSource[i];
            }
        }
    }
    if (!dataSource.hasOwnProperty('state')) {
        dataSource['state'] = '';
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSource
    };
    $.ajaxFunc(source, fillTableSubmitdynamic, errorHandle);
}
function fillTableSubmitdynamic(data, status, xhr) {
    var strGet = getTableSubmitDynamic(data);
    var tableStr = strGet.tableStr;
    $('#data_table tbody').remove();
    $('#data_table').append("<tbody></tbody>");
    $('#data_table tbody').append(tableStr);
    var totalStr = strGet.totalStr;
    $('.total').empty();
    $('.total').append(totalStr);
    var pageStr = strGet.pageStr;
    $('.modalPage').empty();
    $('.modalPage').append(pageStr);
    $('.page').on('click', pageSearch);
}
function getTableSubmitDynamic(data) {
    var totalCount = getTotal(data);
    var state_dynamic = '';
    var str_main = "";
    str_main += "<tr><th>" + "陪我号" + "</th><th>" + "昵称" + "</th><th>" + "标签" + "</th><th>" + "图片" + "</th><th>" + "文案" + "</th><th>" + "更新时间" + "</th><th>" + "选中" + "</th>";
    if (data.hasOwnProperty('data')) {
        data = data.data;
        for (var dynamicIndex = 0; dynamicIndex < data.length; dynamicIndex++) {
            var dynamic = data[dynamicIndex];
            state_dynamic = dynamic.state;
            str_main += "<tr>" +
                "<td class='data_id'>" + dynamic.user.uid + "</td>" +
                "<td class='data_nick'>" + dynamic.user.name + "</td>" +
                "<td class='data_sign'>" + dynamic.topic.content + "</td>" +
                "<td class='data_pics'>";
            var images = dynamic.extra.images;
            var imgStr = "";
            if (dynamic.extra) {
                if (dynamic.extra.images) {
                    if (images.length > 0) {
                        for (var imgIndex = 0; imgIndex < images.length; imgIndex++) {
                            var img = images[imgIndex];
                            imgStr += "<img class='pic' src='" + img.thumbnail_url + "' data-src='" + img.image_url + "' alt='None' onclick=\"window.open('" + img.image_url + "');\" onmousemove=\"show_pic('" + img.image_url + "');\" onmouseout=\"hide_pic();\" />";
                        }
                    }
                }
            }
            if (imgStr === "") {
                imgStr += "没有图片";
            }
            str_main += imgStr + "</td>" +
                "<td class='data_copywriting' id='data_copywriting'>" + dynamic.content + "</td>" +
                "<td class='data_date'>" + dateToString(new Date(parseInt(dynamic.update_time) * 1000)) + "</td>" +
                "<td class='data_select'>" +
                "<input id='" + dynamic.id + "' name='id' class='" + dynamic.user.uid + "' type='checkbox'>" +
                "</td>" + "</tr>"
        }
    }
    var totalStr = "查询结束。总记录数:" + totalCount;
    var pageInfo = {
        'total': totalCount,
        'pageSize': 10,
        'pageShow': 10,
        'pageRequest': pageRequest
    };
    var pageStr = fillPage(pageInfo);
    if (state_dynamic === 0) {
        $('.recover').css('display', 'none');
        $('.ignore').css('display', 'inline-block');
        $('.ban').css('display', 'inline-block');
        $('.alert').css('display', 'inline-block');
    }
    else {
        $('.recover').css('display', 'inline-block');
        $('.ignore').css('display', 'none');
        $('.ban').css('display', 'none');
        $('.alert').css('display', 'none');
    }
    return {'tableStr': str_main, 'totalStr': totalStr, 'pageStr': pageStr};
}

// 页码搜索
function pageSearch() {
    pageRequest = parseInt($(this).attr('data-page'));
    var data = {'begin_index': (parseInt(pageRequest) - 1) * 10};
    loadTablecontentSubmitdynamic(data);
}

// 状态搜索
$('.mode').on('click', function () {
    var modes = $('.mode');
    var thisMode = $(this);
    modes.removeClass('status_select');
    modes.addClass('status_none');
    thisMode.removeClass('status_none');
    thisMode.addClass('status_select');
    var data_send = {
        'state': $(this).attr('data-state')
    };
    loadTablecontentSubmitdynamic(data_send);
});

// 时间那一排搜索
$('.search_days').on('click', function () {
    var days = $('.search_days');
    var thisMode = $(this);
    days.removeClass('operate');
    days.addClass('operate_white');
    thisMode.removeClass('operate_white');
    thisMode.addClass('operate');
    var action = parseInt($(this).attr('data-action'));
    var data_send;
    if (action >= 0) {
        var times = get_times(action);
        var begin_time = times[0];
        var end_time = times[1];
        data_send = {
            'beign_time': begin_time,
            'end_time': end_time
        };
        $('.start').val(begin_time);
        $('.end').val(end_time);
    }
    else if (action === -1) {
        pageRequest = 1;
        data_send = {
            'begin_index': 0,
            'tuid': $('.peiwo_id').val(),
            'beign_time': $('.start').val(),
            'end_time': $('.end').val()
        };
    }
    else {
        pageRequest = 1;
        $('.data_search input').val('');
        data_send = {
            'begin_index': 0,
            'tuid': $('.peiwo_id').val(),
            'beign_time': $('.start').val(),
            'end_time': $('.end').val()
        };
    }
    loadTablecontentSubmitdynamic(data_send);
});

// 全选和全不选
var times = 0;
$(".checkall").click(function () {
    if (times % 2 === 0) {
        $("input[name='id']").attr("checked", "true");
    }
    else {
        $("input[name='id']").removeAttr("checked");
    }
    times = times + 1;
});

// 操作数据
var option_tuids = [];
var option_action = 0;
var option_ids = '';
$('.option').on('click', function () {
    var option = parseInt($(this).attr('data-option'));
    option_action = option;
    option_ids = get_ids()[0];
    option_tuids = get_ids()[1];
    if (option === 9) {
        alert(option_ids);
    }
    else if (option === 3) {
        $('.comment').css('display', 'block');
    }
    else {
        if (!confirm('Are you sure?')) {
            return;
        }
        else {
            var sourceOption = {
                'methodStr': 'POST',
                'url': '',
                'data': {
                    'query_method': 'POST',
                    'api_request': '/admin/feed/userpub/reset',
                    'pub_ids': option_ids,
                    'state': option
                }
            };
            $.ajaxFunc(sourceOption, successDeal, errorHandle);
            window.location.reload();
        }
    }
});
function successDeal(data, status, xhr) {
    if (data.code === 0) {
        if (option_action === 2) {
            if (option_tuids.length > 0) {
                for (var i = 0; i < option_tuids.length; i++) {
                    var source_ban = {
                        'methodStr': 'POST',
                        'url': '',
                        'data': {
                            'query_method': 'POST',
                            'api_request': '/admin/userinfo/updateinfo',
                            'pub_ids': option_tuids[i],
                            'state': option_action
                        }
                    };
                    $.ajaxFunc(source_ban, successAction, errorHandle);
                }
                if (commonFields['success_action'] === 1) {
                    alert('success');
                    loadTablecontentSubmitdynamic({});
                }
            }
        }
    }
    else {
        alert('ajax error');
    }
}
function successAction(data, status, xhr) {
    if (data.code === 0) {
        commonFields['success_action'] = 1;
    }
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

//警告用户
var comment;
function send_message(type) {
    comment = get_message(type);
    var sourceAlert = {
        'methodStr': 'POST',
        'url': '',
        'data': {
            'query_method': 'POST',
            'api_request': '/admin/feed/userpub/reset',
            'pub_ids': option_ids,
            'state': 2
        }
    };
    $.ajaxFunc(sourceAlert, successAlert, errorHandle);
}
function successAlert(data, status, xhr) {
    if (data.code === 0) {
        if (option_tuids.length > 0) {
            for (var i = 0; i < option_tuids.length; i++) {
                var data_message = {
                    'tuid': option_tuids[i],
                    'normal': 0,
                    'content': comment
                };
                $.ajaxSendMessage(data_message, successToAlert, errorHandle)
            }
            if (commonFields['message_send'] === 1) {
                alert('发送成功');
                $('.comment').css('display', 'none');
                loadTablecontentSubmitdynamic({});
            }
        }
    }
    else {
        alert('ajax error');
    }
}
function successToAlert(data, status, xhr) {
    if (data.code === 0) {
        commonFields['message_send'] = 1;
    }
}
function get_message(type) {
    var comment = '';
    if (type === 1) {
        comment = "经管理后台核实，你在信息流文字/图片中涉及其他三方的账号/二维码/链接等导流信息；已删除且警告一次；累计警告3次，立即封号处理。 更好的环境需要大家共同营造，请保持良好的社交习惯。"
    }
    else if (type === 2) {
        comment = "经管理后台核实，你在信息流文字/图片中涉及语言暴力诋毁他人，已删除且警告一次，累计警告3次，立即封号处理。更好的环境需要大家共同营造，请保持良好的社交习惯。"
    }
    else if (type === 3) {
        comment = "经管理后台核实，你在信息流中图片/文字中涉及转发、举报、刷屏等，已删除且警告一次，累计警告3次，立即封号处理。如有节目需要推荐， 可以在[侧边栏--设置--意见反馈--向我反馈--节目报名]里报名，会有工作人员根据内容时间安排的，多谢配合。"
    }
    else if (type === 4) {
        comment = "经管理后台核实，你在信息流文字/图片中涉及色情信息等； 已删除且警告一次；累计警告3次，立即封号处理。 更好的环境需要大家共同营造，请保持良好的社交习惯。"
    }
    else if (type === 5) {
        comment = "经管理后台核实，你在信息流文字/图片中涉及广告信息等；已删除且警告一次；累计警告3次，立即封号处理。 更好的环境需要大家共同营造，请保持良好的社交习惯。";
    }
    else if (type === 6) {
        comment = "经管理后台核实，你在信息流中涉及侵权/泄露隐私等，已删除且警告一次，累计警告3次，立即封号处理。更好的环境需要大家共同营造，请保持良好的社交习惯。";
    }
    else if (type === 7) {
        comment = "经管理后台核实，你在信息流中涉及网骗/欺诈等，已删除且警告一次，累计警告3次，立即封号处理。更好的环境需要大家共同营造，请保持良好的社交习惯。";
    }
    else {
        comment = '未知'
    }
    return comment;
}

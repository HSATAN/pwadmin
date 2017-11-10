var commonFields = {
    'pageRequest': 1, // 当前请求的第几页
    'pageSize': 10, // 每页显示多少条数据
    'pageShow': 10 // 最多显示多少页
};

// 加载table数据
loadTablelabelDynamic({});

// 获取table数据
function loadTablelabelDynamic(query) {
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': {
            'api_request': '/admin/feed/topicpub',
            'query_method': 'POST',
            'uid': userId,
            'page_size': 10,
            'begin_index': 0,
            'state': 0
        }
    };
    if (!query.hasOwnProperty('begin_index')) {
        commonFields.pageRequest = 1;
        source['data']['begin_index'] = 0;
    }
    for (var index in query) {
        source['data'][index] = query[index];
    }
    $.ajaxFunc(source, fillTablelabelDynamic, errorHandle);
}

// 填table数据
function fillTablelabelDynamic(data, status, xhr) {
    var strGet = getTablelabelDynamicstr(data);
    fillSections(strGet);
    $('.page').on('click', pageSearch);
}

// 页码查询
pageSearch = function () {
    commonFields.pageRequest = parseInt($(this).attr('data-page'));
    var query = {'begin_index': (commonFields.pageRequest - 1) * commonFields.pageSize};
    loadTablelabelDynamic(query);
};
// 状态查询
$('.mode').on('click', function () {
    changeState($('.mode'), $(this));
    var query = {
        'state': $(this).attr('data-state')
    };
    loadTablelabelDynamic(query);
});
// 日期一排查询
$('.days').on('click', function () {
    changeDay($('.days'), $(this));
    var action = $(this).attr('data-action');
    if (action === 0)
    {
        var query = {
            'tuid': $('.peiwo_id').attr(),
            'begin_time': $('.start').attr(),
            'end_time': $('.end').attr(),
        };
    }
    else if (action === -1) {
        $('.data_search input').attr('');
        var query = {'state': 0};
    }
    else {

    }
    loadTablelabelDynamic(query);
});

// 拼table string
function getTablelabelDynamicstr(data) {
    var totalCount = data.total;
    var str_label = "<tr><th>" + "陪我号" + "</th><th>" + "昵称" + "</th><th>" + "标签" + "</th><th>" + "图片" + "</th><th>" + "文案" + "</th><th>" + "更新时间" + "</th><th>" + "选中" + "</th></tr>";
    if (data.hasOwnProperty('data')) {
        var labels = data.data;
        if (labels.length > 0) {
            for (var labelIndex = 0; labelIndex < labels.length; labelIndex++) {
                var label = labels[labelIndex];
                str_label += "<tr>" +
                    "<td class='data_id'>" + label.user.uid + "</td>" +
                    "<td class='data_nick'>" + label.user.name + "</td>" +
                    "<td class='data_sign'>" + label.topic.content + "</td>" +
                    "<td class='data_pics'><div class='pics'>";
                var imgs = label.extra.images;
                if (imgs) {
                    if (imgs.length > 0) {
                        for (var imgIndex = 0; imgIndex < imgs.length; imgIndex++) {
                            var img = imgs[imgIndex];
                            str_label += "<img class='pic' src='" + img.thumbnail_url + "' data-src='" + img.image_url + "' alt='None' onclick=\"window.open('" + img.image_url + "');\" onmousemove=\"show_pic('" + img.image_url + "');\" onmouseout=\"hide_pic();\" />";
                        }
                    }
                }
                str_label += "</div></td>" +
                    "<td class='data_copywriting'>" + label.content + "</td>" +
                    "<td class='data_date'>" + label.update_time + "</td>" +
                    "<td class='data_select'>" +
                    "<input id='" + label.id + "' name='id' class='" + label.user.uid + "' type='checkbox'>" +
                    "</td></tr>";
            }
        }
    }
    var totalStr = "查询结束。总记录数:" + totalCount;
    var pageInfo = {
        'total': totalCount,
        'pageSize': commonFields.pageSize,
        'pageShow': commonFields.pageShow,
        'pageRequest': commonFields.pageRequest
    };
    var pageStr = fillPage(pageInfo);
    return {'tableStr': str_label, 'totalStr': totalStr, 'pageStr': pageStr};
}
// change状态查询的css
function changeState(modes, thisMode) {
    modes.removeClass('stateSelect');
    modes.addClass('statusNull');
    thisMode.removeClass('statusNull');
    thisMode.addClass('stateSelect');
}
// change日期查询一排的css
function changeDay(days, thisDay) {
    days.removeClass('operateSelect');
    days.addClass('operateNull');
    thisDay.removeClass('operateNull');
    thisDay.addClass('operateSelect');
}
// 状态查询
// $('.mode').on('click', function () {
//     state = $(this).attr('data-state');
//     source['data']['state'] = state;
//     loadTablelabelDynamic(source);
// });
// top查询
// $('.days').on('click', function () {
//     var action = parseInt($(this).attr('data-action'));
//     if (action === -1) {
//         $('.data_search input').val('');
//         state = 0;
//         begin_index = 0;
//         commonFields['pageShow'] = 1;
//         $('.peiwo_id').val('');
//         $('.start').val('');
//         $('.end').val('');
//         tuid = $('.peiwo_id').val();
//         begin_time = $('.begin_time').val();
//         end_time = $('.end_time').val();
//     }
//     else if (action === 0) {
//         begin_index = 0;
//         commonFields['pageShow'] = 1;
//     }
//     else {
//         var end = dateToString(new Date());
//         var start = new Date();
//         start.setDate(start.getDate() - action);
//         start = dateToString(start);
//         $('.start').attr('value', start);
//         $('.end').attr('value', end);
//         begin_index = 0;
//         commonFields['pageShow'] = 1;
//     }
//     dealParams();
//     loadTablelabelDynamic(source);
// });

// function dealParams() {
//     begin_time = $('.start').val();
//     end_time = $('.end').val();
//     tuid = $('.peiwo_id').val();
//     var params = {'begin_time': begin_time, 'end_time': end_time, 'tuid': tuid};
//     for (var i in params) {
//         if (params[i].length > 0) {
//             source['data'][i] = params[i];
//         }
//         else {
//             delete source['data'].i
//         }
//     }
// }


// var BaseUrl = window.location.href;
// BaseUrl = BaseUrl.substring(0, BaseUrl.indexOf("?") - 1);
// BaseUrl = decodeURI(BaseUrl);
//
// function servlet_page(page) {
//     var data = {
//         'page': page
//     };
//     if (begin_time_param.length > 0) {
//         data['begin_time'] = begin_time_param;
//     }
//     if (end_time_param.length > 0) {
//         data['end_time'] = end_time_param;
//     }
//     if (state_param.length > 0) {
//         data['state'] = state_param;
//     }
//     if (tuid_param.length > 0) {
//         data['tuid'] = tuid_param;
//     }
//     patchwork_url(data);
// }
//
// function servlet_time(day) {
//     var times = get_times(day);
//     var data = {
//         'begin_time': times[0],
//         'end_time': times[1]
//     };
//     if (state_param.length > 0) {
//         data['state'] = state_param;
//     }
//     if (tuid_param.length > 0) {
//         data['tuid'] = tuid_param;
//     }
//     patchwork_url(data);
// }
//
// function servlet_state(state) {
//     var begin_time = $('.start').val();
//     var end_time = $('.end').val();
//     var tuid = $('.peiwo_id').val();
//     var data = {
//         'state': state
//     };
//     if (begin_time.length > 0) {
//         data['begin_time'] = begin_time;
//     }
//     if (end_time.length > 0) {
//         data['end_time'] = end_time;
//     }
//     if (tuid.length > 0) {
//         data['tuid'] = tuid;
//     }
//     patchwork_url(data);
// }
//
// function search_data() {
//     var begin_time = $('.start').val();
//     var end_time = $('.end').val();
//     var tuid = $('.peiwo_id').val();
//     var data = {};
//     if (begin_time.length > 0) {
//         data['begin_time'] = begin_time;
//     }
//     if (end_time.length > 0) {
//         data['end_time'] = end_time;
//     }
//     if (tuid.length > 0) {
//         data['tuid'] = tuid;
//     }
//     if (state_param.length > 0) {
//         data['state'] = state_param;
//     }
//     patchwork_url(data);
// }
//
// function clear_info() {
//     $('.start').val('');
//     $('.end').val('');
//     $('.peiwo_id').val('');
//     window.location = BaseUrl;
// }
//
// function deal(action) {
//     var state = action;
//     var pub_ids = get_ids()[0];
//     var tuids = get_ids()[1];
//     if (state == 9) {
//         alert(pub_ids);
//     }
//     else if (state == 3) {
//         $('.comment').css('display', 'block');
//     }
//     else if (state == 10) {
//         $('.to_top').css('display', 'block');
//     }
//     else {
//         if (!confirm('Are you sure?')) {
//             return;
//         }
//         else {
//             var data = {
//                 'query_method': 'POST',
//                 'api_request': '/admin/feed/topicpub/reset',
//                 'pub_ids': pub_ids,
//                 'state': state
//             };
//             query_func(data, 'POST');
//             if (state == 2) {
//                 if (tuids.length > 0) {
//                     for (var i = 0; i < tuids.length; i++) {
//                         var data_extends = {
//                             'query_method': 'POST',
//                             'api_request': '/admin/userinfo/updateinfo',
//                             'tuid': tuids[i],
//                             'state': state
//                         };
//                         query_func(data_extends, 'POST');
//                     }
//                 }
//             }
//             window.location.reload();
//         }
//     }
// }


//sticky
// function to_top(action) {
//     var pub_ids = get_ids()[0].split(',');
//     if (action == 0) {
//         $('.to_top').css('display', 'none');
//     }
//     else {
//         if (pub_ids.length == 1) {
//             var data = {
//                 'query_method': 'POST',
//                 'api_request': '/admin/feed/topicpub/top',
//                 'pub_id': pub_ids[0],
//                 'cancel': 0
//             };
//             query_func(data, 'POST');
//             window.location.reload();
//         }
//         else {
//             alert("每次只能置顶一个用户！");
//         }
//     }
// }


//send message to warn users
// function send_message(type) {
//     var comment = get_message(type);
//     var tuids = get_ids()[1];
//     var pub_ids = get_ids()[0];
//     var data = {
//         'query_method': 'POST',
//         'api_request': '/admin/feed/topicpub/reset',
//         'pub_ids': pub_ids,
//         'state': 2
//     };
//     query_func(data, 'POST');
//     if (tuids.length > 0) {
//         for (var i = 0; i < tuids.length; i++) {
//             var data_extends = {
//                 'query_method': 'POST',
//                 'api_request': '/message/send',
//                 'tuid': tuids[i],
//                 'content': comment,
//                 'normal': 0
//             };
//             query_func(data_extends, 'POST');
//         }
//     }
//     window.location.reload();
// }


//to get the user_id and _id for tag which is checked to edit
// function get_ids() {
//     var ids = '';
//     var tuids = '';
//     var r = document.getElementsByName("id");
//     for (var i = 0; i < r.length; i++) {
//         if (r[i].checked) {
//             if (i == r.length - 1) {
//                 ids = ids + r[i].id;
//                 tuids = tuids + r[i].className;
//             }
//             else {
//                 ids = ids + r[i].id + ',';
//                 tuids = tuids + r[i].className + ',';
//             }
//         }
//     }
//     if (tuids.length > 0) {
//         tuids = tuids.split(',');
//     }
//     return [ids, tuids];
// }


//checkbox to select all or none
// var times = 0;
// $(".checkall").click(function () {
//     if (times % 2 == 0) {
//         $("input[name='id']").attr("checked", "true");
//     }
//     else {
//         $("input[name='id']").removeAttr("checked");
//     }
//     times = times + 1;
// });


//get the detail to warn user
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
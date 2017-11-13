// 加载标签分类
loadLabelclassification();
// 加载主类别子类别
loadCategories();
// 加载table部分
loadTableliveSpecial({});

var pageRequest = 1;
// 获取table数据
function loadTableliveSpecial(data) {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live/special_list',
        'uid': userId,
        'state': 0,
        'page_size': 10,
        'page_index': 1,
        'type': 2,
        'order': 'weight',
        'desc': 1
    };
    for (var i in data) {
        dataSend[i] = data[i];
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillTableliveSpecial, errorHandle);
}

function fillTableliveSpecial(data, status, xhr) {
    var strGet = getTableliveSpecial(data);
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
}

// 拼table string
function getTableliveSpecial(data) {
    var totalCount = getTotal(data);
    var str_main = "";
    str_main += "<tr><th>" + "主播陪我号" + "</th><th>" + "主播昵称" + "</th><th>" + "直播主题" + "</th><th>" + "投票标签" + "</th><th>" + "主类别" + "</th><th>" + "子类别" + "</th><th>" + "主播头像" + "</th><th>" + "封面图" + "</th><th>" + "背景图" + "</th><th>" + "收听人数/真实/累计" + "</th><th>" + "礼物个数/价值/最近" + "</th><th>" + "点亮次数/最近" + "</th><th>" + "开始时间" + "</th><th>" + "结束时间" + "</th><th>" + "状态" + "</th><th>" + "操作" + "</th></tr>";
    if (data.hasOwnProperty('data')) {
        data = data.data;
        if (data.hasOwnProperty('lives')) {
            var lives = data.lives;
            if (lives.length > 0) {
                for (var liveIndex = 0; liveIndex < lives.length; liveIndex++) {
                    var live = lives[liveIndex];
                    var state_now = getStateDesc(live.state);
                    str_main += "<tr>" +
                        "<td>" + live.owner_uid + "</td><td>" + live.name + "</td><td>" + live.topic + "</td><td>" + live.label_name + "</td><td>" + live.main_label_name + "</td><td>" + live.sub_label_name + "</td>" +
                        "<td><img src='" + live.owner_avatar + "' class='pic' onclick=\"window.open('" + live.owner_avatar + "');\" onmousemove=\"show_pic('" + live.owner_avatar + "');\" onmouseout=\"hide_pic();\" /></td>" +
                        "<td><img src='" + live.cover_url + "' class='pic' onclick=\"window.open('" + live.cover_url + "');\" onmousemove=\"show_pic('" + live.cover_url + "');\" onmouseout=\"hide_pic();\" /></td>" +
                        "<td><img src='" + live.background + "' class='pic' onclick=\"window.open('" + live.background + "');\" onmousemove=\"show_pic('" + live.background + "');\" onmouseout=\"hide_pic();\" />" + "</td>" +
                        "<td>" + live.guest_number + "/" + live.actual_guest_number + "/" + live.actual_unique_guest_number + "</td><td>" + live.gift_number + "/" + live.gift_value + "/" + live.gift_value_diff + "</td>" +
                        "<td>" + live.light_number + "/" + live.light_number_diff + "</td><td>" + live.create_time + "</td>";
                    if (live.close_time === 0) {
                        str_main += "<td>" + "无" + "</td>";
                    }
                    else {
                        str_main += "<td>" + live.close_time + "</td>";
                    }
                    str_main +=
                        "<td>" + state_now + "</td><td style='width: 10%;'>" +
                        "<button class='operate'>" + "置顶" + "</button>" +
                        "<button class='operate'>" + "屏蔽" + "</button>" +
                        "<button class='operate'>" + "查看CP榜" + "</button>" +
                        "<button class='operate'>" + "投票" + "</button>" +
                        "<button class='operate'>" + "删除背景图" + "</button>" +
                        "<button class='operate'>" + "修改权限值系数" + "</button>" +
                        "<button class='operate'>" + "修改机器人系数" + "</button>" +
                        "<button class='operate'>" + "禁播一小时" + "</button>" +
                        "<button class='operate'>" + "查看可以用户" + "</button>" +
                        "<button class='operate'>" + "普通声优" + "</button>" +
                        "<button class='operate'>" + "修改标签类别" + "</button>" +
                        "<button class='operate'>" + "删除直播主题" + "</button>" +
                        "</td></tr>";
                }
            }
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
    return {'tableStr': str_main, 'totalStr': totalStr, 'pageStr': pageStr};
}

// 搜索按钮
// $('.search').on('click', function () {
//     var desc = 0;
//     if ($('.desc').is(':checked')) {
//         desc = 1;
//     }
//     var params = {
//         'owner_uid': $('.owner_uid').val(),
//         'owner_name': $('.owner_name').val(),
//         'gift_value': $('.gift_value').val(),
//         'live_id': $('.live_id').val(),
//         'state': $('#type').val(),
//         'label_id': $('#label_type').val(),
//         'order': $('#sort').val(),
//         'desc': desc,
//         'main_label_id': $('#main_label').val(),
//         'sub_label_id': $('#sub_label').val(),
//         'begin_time': $('.begin_time').val(),
//         'end_time': $('.end_time').val(),
//     };
//     var data_find = {
//         'desc': desc,
//         'page_size': 10,
//         'page_index': 1
//     };
//     for (var index in params) {
//         if (params[index] && (params[index] !== '')) {
//             data_find[index] = params[index];
//         }
//     }
//     loadTable(data_find);
// });



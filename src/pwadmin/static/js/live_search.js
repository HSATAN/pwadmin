// 加载标签分类
loadLabelclassification();

// 加载主类别子类别
loadCategories();

// loadTable({});

// 加载table部分的代码
function loadTable(data) {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live/list',
        'uid': userId,
        'state': 0,
        'page_size': 10,
        'page_index': 1,
        'type': 2,
        'order': 'weight',
        'desc': 1,
        'csrfmiddlewaretoken': csrfmiddlewaretoken
    };
    for (var i in data) {
        dataSend[i] = data[i];
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillTable, errorHandle);
}

//获取tbody的string值
function dataTable(data) {
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
                        "<td>" + state_now + "</td><td>" +
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
    return str_main;
}

//函数处理ajax获取到的数据，填入toby
function fillTable(data, status, xhr) {
    var tableStr = dataTable(data);
    $('.data_table tbody').remove();
    $('.data_table').append("<tbody></tbody>");
    $('.data_table tbody').append(tableStr);
}

// 获取状态
function getStateDesc(state) {
    if (state === 0) {
        return "正常";
    } else if (state === 1) {
        return "暂停";
    } else if (state === 2) {
        return "停止";
    }
    return "未知";
}


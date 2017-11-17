// 加载房间标签分类
function loadLabelclassification() {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live_label/label_query',
        'uid': userId,
        'page_index': 1,
        'kind': 0,
        'page_size': 100
    };
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillLabelclassification, errorHandle);
}

function fillLabelclassification(data, status, xhr) {
    var label_str = "<option value='0'>" + "全部" + "</option>";
    if (data.hasOwnProperty('data')) {
        data = data.data;
        if (data.hasOwnProperty('list')) {
            data = data.list;
            if (data.length > 0) {
                for (var labelIndex = 0; labelIndex < data.length; labelIndex++) {
                    label_str += "<option value='" + data[labelIndex].label_id + "'>" + data[labelIndex].content + "</option>";
                }
            }
        }
    }
    $('#label_type').append(label_str);
}

//加载主类别id为main_label部分的代码
function loadCategories(data) {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live_label_new/brief_label_query',
        'uid': userId
    };
    for (var i in data) {
        dataSend[i] = data[i];
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillCategory, errorHandle);
}

function fillCategory(data, status, xhr) {
    var strMaincategory = "<option value>" + "全部" + "</option>";
    var majors = data.data;
    for (var indexLabel = 0; indexLabel < majors.length; indexLabel++) {
        var major = majors[indexLabel];
        strMaincategory += "<option value='" + major.id + "'>" + major.name + "</option>";
    }
    $("#main_label").append(strMaincategory);
    $("#main_label").change(function () {
        var main_val = $(this).val();
        if (main_val === '') {
            fill_subs('');
        }
        else {
            for (var indexLabel = 0; indexLabel < majors.length; indexLabel++) {
                if (Number(majors[indexLabel].id) === Number(main_val)) {
                    fill_subs(majors[indexLabel].sub_labels);
                }
            }
        }
    });
}

function fill_subs(subs) {
    var sub_str = "";
    for (var indexSub = 0; indexSub < subs.length; indexSub++) {
        sub_str += "<option value='" + subs[indexSub].id + "'>" + subs[indexSub].name + "</option>";
    }
    $("#sub_label").empty();
    $("#sub_label").append(sub_str);
}

// load直播数据处理函数
function fillTableLives(data, status, xhr) {
    var strGet = getTableliveOnline(data);
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

function getTableliveOnline(data) {
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
                        "<button class='operate' onclick=\"live_top('" + live.live_id + "')\">" + "置顶" + "</button>" +
                        "<button class='operate' onclick=\"live_conceal('" + live.live_id + "')\">" + "屏蔽" + "</button>" +
                        "<button class='operate'>" + "查看CP榜" + "</button>" +
                        "<button class='operate' onclick=\"live_poll('" + live.owner_uid + "', '" + live.label_name + "')\">" + "投票" + "</button>" +
                        "<button class='operate' onclick=\"live_del_background('" + live.owner_uid + "', '" + live.live_id + "')\">" + "删除背景图" + "</button>" +
                        "<button class='operate' onclick=\"live_del_cover('" + live.owner_uid + "', '" + live.live_id + "')\">" + "删除封面图" + "</button>" +
                        "<button class='operate' onclick=\"live_permission('" + live.owner_uid + "', '" + live.live_id + "', '" + live.weight_ratio + "')\">" + "修改权限值系数" + "</button>" +
                        "<button class='operate' onclick=\"live_robots('" + live.owner_uid + "', '" + live.live_id + "', '" + live.robot_ratio + "')\">" + "修改机器人系数" + "</button>" +
                        "<button class='operate' onclick=\"live_block('" + live.owner_uid + "', '" + live.live_id + "')\">" + "禁播一小时" + "</button>" +
                        "<button class='operate'>" + "查看可疑用户" + "</button>";

                    if (live.special === 0 || live.special === '0') {
                        str_main += "<button class='operate' onclick=\"live_special('" + live.owner_uid + "', '" + live.live_id + "', 1)\">" + "普通声优" + "</button>";
                    }
                    else {
                        str_main += "<button class='operate special' onclick=\"live_special('" + live.owner_uid + "', '" + live.live_id + "', 0)\">" + "特殊声优" + "</button>";
                    }
                    str_main += "<button class='operate' onclick=\"live_edit_topic('" + live.owner_uid + "', '" + live.live_id + "');\">" + "修改标签类别" + "</button>" +
                        "<button class='operate' onclick=\"live_del_topic('" + live.owner_uid + "', '" + live.live_id + "');\">" + "删除直播主题" + "</button>" +
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

// 置顶；操作成功的大致处理方法；消除弹框
function live_top(liveId) {
    var source = {
        'methodStr': 'POST',
        'url': ACTION_URL,
        'data': {
            'cancel': 0,
            'live_id': liveId,
            'operate_type': 'live_top'
        }
    };
    $.ajaxFunc(source, successLiveactions, errorHandle);
}

function successLiveactions(data, status, xhr) {
    hide_fixes();
    if (data.code === 0) {
        alert('success');
    }
    else {
        alert('fail');
    }
}

function hide_fixes() {
    $('.amend').css('display', 'none');
    $('.amend_robot').css('display', 'none');
    $('.amend_poll').css('display', 'none');
    $('.amend_label').css('display', 'none');
}

// 屏蔽
function live_conceal(liveId) {
    if (!confirm('确定屏蔽该房间吗？')) {
        return false;
    }
    else {
        var source = {
            'methodStr': 'POST',
            'url': ACTION_URL,
            'data': {
                'cancel': 0,
                'live_id': liveId,
                'uid': userId,
                'operate_type': 'live_conceal'
            }
        };
        $.ajaxFunc(source, successLiveactions, errorHandle);
    }
}

// 投票
function live_poll(tuid, label_name) {
    $('.amend_poll').css('display', 'block');
    commonFields['tuid'] = tuid;
    $('.amend_str').html('投票:' + tuid);
    $('.poll_label').val(label_name);
    loadLabelclassificationnew();
}

function loadLabelclassificationnew() {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live_label/label_query',
        'uid': userId,
        'page_index': 1,
        'kind': 0,
        'page_size': 100
    };
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillLabelclassificationnew, errorHandle);
}

function fillLabelclassificationnew(data, status, xhr) {
    var first_id = null;
    var str_label = '';
    if (data.hasOwnProperty('data')) {
        data = data.data;
        if (data.hasOwnProperty('list')) {
            data = data.list;
            if (data.length > 0) {
                for (var labelIndex = 0; labelIndex < data.length; labelIndex++) {
                    var label = data[labelIndex];
                    var id = label.label_id;
                    var kind = label.kind;
                    var kind_name = "";
                    if (kind === 1) {
                        kind_name = '（优良）';
                    }
                    else if (kind === 2) {
                        kind_name = '（垃圾）';
                    }
                    else {
                        continue
                    }
                    var name = label.content;
                    if (labelIndex === 0) {
                        first_id = id;
                    }
                    str_label += "<option value='" + id + "'>" + name + kind_name + "</option>";
                }
                $('#label_id').append(str_label);
            }
        }
    }
}

$('.poll_sure').on('click', function () {
    var vote = $('.polls').val();
    if (!vote) {
        vote = 1;
    }
    var source = {
        'methodStr': 'POST',
        'url': ACTION_URL,
        'data': {
            'label_id': $('#label_id').val(),
            'uid': userId,
            'tuid': commonFields['tuid'],
            'value': vote,
            'operate_type': 'live_poll'
        }
    };
    $.ajaxFunc(source, successLiveactions, errorHandle);
});
$('.space_out').on('click', function () {
    $('.amend').css('display', 'none');
    $('.amend_poll').css('display', 'none');
});
$('.poll_out').on('click', function () {
    $('.amend_poll').css('display', 'none');
});

// 删除背景图
function live_del_background(tuid, liveId) {
    if (!confirm('确定删除背景图吗？')) {
        return false;
    }
    else {
        commonFields['tuid'] = tuid;
        commonFields['liveId'] = liveId;
        var source = {
            'methodStr': 'POST',
            'url': ACTION_URL,
            'data': {
                'live_id': liveId,
                'uid': userId,
                'tuid': tuid,
                'operate_type': 'live_del_background'
            }
        };
        $.ajaxFunc(source, successLivedelBackground, errorHandle);
    }
}

function successLivedelBackground(data, status, xhr) {
    var data_message = {
        'tuid': commonFields['tuid'],
        'normal': 1,
        'content': '陪我管理中心提醒你：经审核你的直播背景图判定为违规图片，已删除违规图片并处以一次警告。累计警告3次，立即封号。请自觉遵守陪我用户协议，文明使用陪我。'
    };
    if (data.code === 0) {
        $.ajaxSendMessage(data_message, successDelBackground, errorHandle)
    }
    else {
        alert('error');
    }
}

function successDelBackground(data, status, xhr) {
    if (data.code === 0) {
        alert('背景图操作：删除成功，同时：已发送系统消息告知');
    }
    else {
        alert('消息未发送');
    }
}

// 删除封面图
function live_del_cover(tuid, liveId) {
    if (!confirm('确定删除封面图吗？')) {
        return false;
    }
    else {
        commonFields['tuid'] = tuid;
        commonFields['liveId'] = liveId;
        var source = {
            'methodStr': 'POST',
            'url': ACTION_URL,
            'data': {
                'live_id': liveId,
                'uid': userId,
                'tuid': tuid,
                'operate_type': 'live_del_cover'
            }
        };
        $.ajaxFunc(source, successLivedelCover, errorHandle);
    }
}

function successLivedelCover(data, status, xhr) {
    var data_message = {
        'tuid': commonFields['tuid'],
        'normal': 1,
        'content': '你的封面不符合相关规范，请勿上传与主题无关、过度暴露或模糊的图片。'
    };
    if (data.code === 0) {
        $.ajaxSendMessage(data_message, successDelCover, errorHandle)
    }
    else {
        alert(data.msg);
    }
}

function successDelCover(data, status, xhr) {
    if (data.code === 0) {
        alert('封面图操作：删除成功，同时：已发送系统消息告知');
    }
    else {
        alert('消息未发送');
    }
}

// 修改权限值
function live_permission(tuid, liveId, weight_ratio) {
    $('.amend').css('display', 'block');
    commonFields['liveId'] = liveId;
    commonFields['tuid'] = tuid;
    commonFields['weight_ratio'] = weight_ratio;
    $('.ratio').val(weight_ratio);
}

$('.amend_out').on('click', function () {
    $('.amend').css('display', 'none');
});
$('.amend_sub').on('click', function () {
    var source = {
        'methodStr': 'POST',
        'url': ACTION_URL,
        'data': {
            'live_id': commonFields['liveId'],
            'uid': userId,
            'tuid': commonFields['tuid'],
            'ratio': $('.ratio').val(),
            'operate_type': 'live_amend_permission'
        }
    };
    $.ajaxFunc(source, successLiveamendPermission, errorHandle);
});

function successLiveamendPermission(data, status, xhr) {
    if (data.code === 0) {
        alert('success');
        $('.amend').css('display', 'none');
    }
    else {
        alert(data.msg);
    }
}

// 修改机器人系数
function live_robots(tuid, liveId, robot_ratio) {
    $('.amend_robot').css('display', 'block');
    commonFields['liveId'] = liveId;
    commonFields['tuid'] = tuid;
    $('.ratio_robot').val(robot_ratio);
}

$('.space_out_robot').on('click', function () {
    $('.amend_robot').css('display', 'none');
});
$('.amend_out_robot').on('click', function () {
    $('.amend_robot').css('display', 'none');
});
$('.amend_sub_robot').on('click', function () {
    var source = {
        'methodStr': 'POST',
        'url': ACTION_URL,
        'data': {
            'live_id': commonFields['liveId'],
            'uid': userId,
            'tuid': commonFields['tuid'],
            'robot_ratio': $('.ratio_robot').val(),
            'operate_type': 'live_amend_permission'
        }
    };
    $.ajaxFunc(source, successLiveamendRobots, errorHandle);
});

function successLiveamendRobots(data, status, xhr) {
    if (data.code === 0) {
        alert('success');
        $('.amend_robot').css('display', 'none');
    }
    else {
        alert(data.msg);
    }
}

// 禁播一小时
function live_block(tuid, liveId) {
    if (!confirm('确定禁播一小时吗？')) {
        return false;
    }
    else {
        commonFields['tuid'] = tuid;
        commonFields['liveId'] = liveId;
        var source = {
            'methodStr': 'POST',
            'url': ACTION_URL,
            'data': {
                'live_id': liveId,
                'uid': userId,
                'tuid': tuid,
                'operate_type': 'live_block'
            }
        };
        $.ajaxFunc(source, successLiveblock, errorHandle);
    }
}

function successLiveblock(data, status, xhr) {
    if (data.code === 0) {
        alert('success');
    }
    else {
        alert(data.msg);
    }
}

// 特殊声优、普通声优切换
function live_special(tuid, liveId, is_special) {
    var conformStr = "";
    if (is_special === '0' || is_special === 0) {
        conformStr = '确定要改为普通声优吗？';
    }
    else {
        conformStr = '确定要改为特殊声优吗？';
    }
    if (!confirm(conformStr)) {
        return false;
    }
    else {
        commonFields['tuid'] = tuid;
        commonFields['liveId'] = liveId;
        var source = {
            'methodStr': 'POST',
            'url': ACTION_URL,
            'data': {
                'uid': userId,
                'tuid': tuid,
                'is_special': is_special,
                'operate_type': 'live_special'
            }
        };
        $.ajaxFunc(source, successLivespecial, errorHandle);
    }
}

function successLivespecial(data, status, xhr) {
    if (data.code === 0) {
        alert('success');
        window.location.reload();
    }
    else {
        alert(data.msg);
    }
}

// 修改标签类别，主类别子类别
function live_edit_topic(tuid, liveId) {
    commonFields['liveId'] = liveId;
    commonFields['tuid'] = tuid;
    $('.amend_label').css('display', 'block');
    loadCategoriesNew({});
}

function loadCategoriesNew(data) {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live_label_new/brief_label_query',
        'uid': userId
    };
    for (var i in data) {
        dataSend[i] = data[i];
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillCategoryNew, errorHandle);
}

function fillCategoryNew(data, status, xhr) {
    var strMaincategory = "<option value>" + "全部" + "</option>";
    var majors = data.data;
    for (var indexLabel = 0; indexLabel < majors.length; indexLabel++) {
        var major = majors[indexLabel];
        strMaincategory += "<option value='" + major.id + "'>" + major.name + "</option>";
    }
    $(".label_main").append(strMaincategory);
    $(".label_main").change(function () {
        var main_val = $(this).val();
        for (var indexLabel = 0; indexLabel < majors.length; indexLabel++) {
            if (Number(majors[indexLabel].id) === Number(main_val)) {
                fill_subs_new(majors[indexLabel].sub_labels);
            }
        }
    });
}

function fill_subs_new(subs) {
    var sub_str = "";
    for (var indexSub = 0; indexSub < subs.length; indexSub++) {
        sub_str += "<option value='" + subs[indexSub].id + "'>" + subs[indexSub].name + "</option>";
    }
    $(".label_sub").empty();
    $(".label_sub").append(sub_str);
}

function successLiveeditCategory(data, status, xhr) {
    $('.amend_label').css('display', 'none');
    loadTableliveOnline({});
    if (data.code === 0) {
        alert('success');
    }
    else {
        alert(data.msg);
    }
}

$('.label_sure').on('click', function () {
    var source = {
        'methodStr': 'POST',
        'url': ACTION_URL,
        'data': {
            'live_id': commonFields['liveId'],
            'uid': userId,
            'main_label_id': $('.label_main').val(),
            'sub_label_id': $('.label_sub').val(),
            'operate_type': 'live_edit_category'
        }
    };
    $.ajaxFunc(source, successLiveeditCategory, errorHandle);
});
$('.label_out').on('click', function () {
    $('.amend_label').css('display', 'none');
});
$('.amend_label_out').on('click', function () {
    $('.amend_label').css('display', 'none');
});

// 删除直播间主题
function live_del_topic(tuid, liveId) {
    if (!confirm('确定删除直播主题吗？')) {
        return false;
    }
    else {
        commonFields['liveId'] = liveId;
        commonFields['tuid'] = tuid;
        var source = {
            'methodStr': 'POST',
            'url': ACTION_URL,
            'data': {
                'live_id': liveId,
                'uid': userId,
                'operate_type': 'live_del_topic'
            }
        };
        $.ajaxFunc(source, successLivedelTopic, errorHandle);
    }
}

function successLivedelTopic(data, status, xhr) {
    var data_message = {
        'tuid': commonFields['tuid'],
        'normal': 1,
        'content': '陪我管理中心提醒你：你的直播主题违规已被删除并进行一次警告，直播主题请不要使用色情、涉政、语言暴力词汇。累计警告3次，立即封号。请自觉遵守陪我用户协议，文明使用陪我。'
    };
    if (data.code === 0) {
        $.ajaxSendMessage(data_message, successDelTopic, errorHandle)
    }
    else {
        alert(data.msg);
    }
}

function successDelTopic(data, status, xhr) {
    if (data.code === 0) {
        alert('直播主题操作：删除成功，同时：已发送系统消息告知');
    }
    else {
        alert('消息未发送');
    }
}

// 获取状态，房间填数据时
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

// 获取总数据条数
function getTotal(data) {
    var count = 0;
    if (data.hasOwnProperty('page_info')) {
        var page_info = data.page_info;
        if (page_info.hasOwnProperty('row_count')) {
            count = page_info.row_count;
        }
    } else {
        if (data.hasOwnProperty('data')) {
            data = data.data;
            if (data.hasOwnProperty('page_info')) {
                var page_info = data.page_info;
                if (page_info.hasOwnProperty('row_count')) {
                    count = page_info.row_count;
                }
            }
        }
    }
    return count;
}

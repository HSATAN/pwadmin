//加载页面，dom
loadTableliveSpecial({});

var pageRequest = 1;
function loadTableliveSpecial(data) {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live/cover/list',
        'uid': userId,
        'state': 0,
        'page_size': 10,
        'page_index': 0
    };
    for (var i in data) {
        dataSend[i] = data[i];
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillTablecoverVerify, errorHandle);
}

function fillTablecoverVerify(data, status, xhr) {
    var strGet = getTablecoverVerify(data);
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

function getTablecoverVerify(data) {
    var totalCount = getTotal(data);
    var tbody_str = "";
    tbody_str += "<tr>" +
        "<th>主播陪我号</th>" +
        "<th>昵称</th>" +
        "<th>封面图</th>" +
        "<th>申请时间</th>" +
        "<th>操作</th>" +
        "</tr>";
    if (data.hasOwnProperty('data')) {
        data = data.data;
        if (data.hasOwnProperty('list')) {
            data = data.list;
            if (data.length > 0) {
                for (var coverIndex = 0; coverIndex < data.length; coverIndex++) {
                    tbody_str += "<tr>" +
                        "<td>" + data[coverIndex]['uid'] + "</td>" +
                        "<td>" + data[coverIndex]['name'] + "</td>" +
                        "<td>" +
                        "<img src='" + data[coverIndex]['cover_url'] + "' " +
                        "onmousemove=\"show_pic('" + data[coverIndex]['cover_url'] + "');\" " +
                        "onmouseout=\"hide_pic();\" " +
                        "class='pic' alt=''>" + "</td>" +
                        "<td>" + data[coverIndex]['create_time'] + "</td>" +
                        "<td>" +
                        "<button class='operate' onclick=\"deal(1, '" + data[coverIndex]['id'] + "', '" + data[coverIndex]['uid'] + "');\">" + '通过' + "</button>" +
                        "<button class='operate' onclick=\"deal(2, '" + data[coverIndex]['id'] + "', '" + data[coverIndex]['uid'] + "');\">" + '拒绝' + "</button></td>" +
                        "</tr>";
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
    return {'tableStr': tbody_str, 'totalStr': totalStr, 'pageStr': pageStr}
}

function clear_table() {
    $("#data_table tbody").remove();
    $(".total").remove();
    $("#data_table").append('<tbody></tbody>');
    $(".modalPage").empty();
    $(".bottom").empty();
}

function fill_state() {
    var state_str = "";
    var state_now = $('.right_content').attr('data-state');
    if (!state_now) {
        $('.right_content').attr('data-state', 0);
        state_now = $('.right_content').attr('data-state');
    }
    if (state_now === 0 || state_now === '0') {
        state_str += "<button data-id='0' onclick=\"state_search(0);\" class='status_select search_left'>" + '未处理' + "</button>"
        state_str += "<button data-id='1' onclick=\"state_search(1);\" class='status_none'>" + '已处理' + "</button>"
    }
    else {
        state_str += "<button data-id='0' onclick=\"state_search(0);\" class='status_none search_left'>" + '未处理' + "</button>"
        state_str += "<button data-id='1' onclick=\"state_search(1);\" class='status_select'>" + '已处理' + "</button>"
    }
    return state_str;
}

//"清除"按钮
$('.clear').on('click', function () {
    $('.tuid').empty();
    $('.begin_time').empty();
    $('.end_time').empty();
});

//状态查询按钮，"已处理"、"未处理"
function state_search(state_flag) {
    var data_status = {'state': state_flag};
    var tuid = $('.tuid').val();
    if (tuid.length > 0) {
        data_status['tuid'] = tuid;
    }
    var begin_time = $('.begin_time').val();
    if (begin_time.length > 0) {
        data_status['begin_time'] = begin_time;
    }
    var end_time = $('.end_time').val();
    if (end_time.length > 0) {
        data_status['end_time'] = end_time;
    }
    $('.right_content').attr('data-state', state_flag);
    ShowMessage(data_status);
}


//"搜索"按钮
function flashData() {
    var data_deliver = {};
    var tuid = $('.tuid').val();
    if (tuid.length > 0) {
        data_deliver['tuid'] = tuid;
    }
    var begin_time = $('.begin_time').val();
    if (begin_time.length > 0) {
        data_deliver['begin_time'] = begin_time;
    }
    var end_time = $('.end_time').val();
    if (end_time.length > 0) {
        data_deliver['end_time'] = end_time;
    }
    data_deliver['state'] = state_page;
    ShowMessage(data_deliver);
}

//"通过"按钮，封面通过审核
function deal(action, cover_id, tuid) {
    console.log(action);
    console.log(cover_id);
    console.log(tuid);
    if (!confirm('确定吗?')) {
        return false;
    }
    else {
        var content;
        if (action === 1) {
            content = '您提交的电台封面已通过审核';
        }
        else {
            content = '您提交的电台封面不符合陪我管理条例，未通过审核，请自查是否涉及色情挑逗，血腥暴力恐怖，违法信息（邪教、政治、赌博等），图片不清晰，图片低俗，第三方导流信息，不雅词汇。修改后重新提交。';
        }
        var data = {
            'query_method': 'POST',
            'api_request': '/admin/live/cover/audit2',
            "cover_id": cover_id,
            'state': action,
            'tuid': tuid
        };
        sneaky(data);
        console.log(data_response);
        if (data_response.code === 0) {
            var data_message = {
                'query_method': 'POST',
                'api_request': '/admin/message/send',
                'tuid': tuid,
                'content': content,
                'normal': 1
            };
            sneaky(data_message);
            console.log(data_response);
            if (data_response.code === 0) {
                alert('封面审核操作：操作成功，同时：已发送系统消息告知');
                window.location.reload();
            }
        }
        else {
            alert('操作失败');
        }
    }
}

//页码查询
function servlet_page(page) {
    var state_now = $('.right_content').attr('data-state');
    var data_page = {'page_index': page};
    var tuid = $('.tuid').val();
    if (tuid.length > 0) {
        data_page['tuid'] = tuid;
    }
    var begin_time = $('.begin_time').val();
    if (begin_time.length > 0) {
        data_page['begin_time'] = begin_time;
    }
    var end_time = $('.end_time').val();
    if (end_time.length > 0) {
        data_page['end_time'] = end_time;
    }
    data_page['state'] = state_now;
    ShowMessage(data_page);
}



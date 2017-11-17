var pageRequest = 1;
var content;
var commonFields = {};
var dataSource = {
    'query_method': 'GET',
    'api_request': '/admin/live/cover/list',
    'uid': userId,
    'state': 0,
    'page_size': 10,
    'page_index': 0
};

//加载页面，dom
loadTableliveCover({});
function loadTableliveCover(data) {
    for (var i in data) {
        if (data[i] !== '') {
            dataSource[i] = data[i];
        }
        else {
            if (dataSource.hasOwnProperty(i)) {
                delete dataSource.i
            }
        }
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSource
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
    $('.page').on('click', pageSearch);
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
                        "<td>" + data[coverIndex]['create_time'] + "</td><td>";
                    if (data[coverIndex]['state'] === 0) {
                        tbody_str +=
                            "<button class='operate' onclick=\"deal(1, '" + data[coverIndex]['id'] + "', '" + data[coverIndex]['uid'] + "');\">" + '通过' + "</button>" +
                            "<button class='operate' onclick=\"deal(2, '" + data[coverIndex]['id'] + "', '" + data[coverIndex]['uid'] + "');\">" + '拒绝' + "</button>";
                    }
                    else if (data[coverIndex]['state'] === 1) {
                        tbody_str += '已通过';
                    }
                    else {
                        tbody_str += '已拒绝';
                    }
                    tbody_str += "</td></tr>";
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

//页码查询
function pageSearch() {
    pageRequest = parseInt($(this).attr('data-page'));
    var data = {'page_index': pageRequest};
    loadTableliveCover(data);
}

//"搜索"按钮
function flashData() {
    var tuid = $('.tuid').val();
    var begin_time = $('.begin_time').val();
    var end_time = $('.end_time').val();
    var data_send = {
        'tuid': tuid,
        'begin_time': begin_time,
        'end_time': end_time
    };
    loadTableliveCover(data_send);
}

//状态查询按钮，"已处理"、"未处理"
$('.search_state').on('click', function () {
    var states = $('.search_state');
    var thisMode = $(this);
    states.removeClass('search_after');
    states.addClass('search_before');
    thisMode.removeClass('search_before');
    thisMode.addClass('search_after');
    var data_send = {
        'state': $(this).attr('data-state')
    };
    loadTableliveCover(data_send);
});

//"通过"按钮，封面通过审核
function deal(action, cover_id, tuid) {
    commonFields['tuid'] = tuid;
    if (!confirm('确定吗?')) {
        return false;
    }
    else {
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
        var source = {
            'methodStr': 'POST',
            'url': '',
            'data': data
        };
        $.ajaxFunc(source, successCoverHandler, errorHandle);
    }
}
function successCoverHandler(data, status, xhr) {
    if (data.code === 0) {
        var data_message = {
            'tuid': commonFields['tuid'],
            'normal': 1,
            'content': content
        };
        $.ajaxSendMessage(data_message, successPasscover, errorHandle)
    }
}
function successPasscover(data, status, xhr) {
    if (data.code === 0) {
        alert('封面审核操作：操作成功，同时：已发送系统消息告知');
        window.location.reload();
    }
    else {
        alert('error');
    }
}




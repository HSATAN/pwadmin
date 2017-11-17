var pageRequest = 1;
var commonFields = {};
var dataSource = {
    'query_method': 'GET',
    'api_request': '/admin/feed/pub/whitelist',
};
loadTableWhiteList({});

// 获取页面table数据
function loadTableWhiteList(data) {
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
    $.ajaxFunc(source, fillTableWhiteList, errorHandle);
}
function fillTableWhiteList(data, status, xhr) {
    var strGet = getTableWhiteList(data);
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
function getTableWhiteList(data) {
    var totalCount = 0;
    if (data.data.length > 0) {
        totalCount = data.data.length;
    }
    var str_main = "";
    str_main += "<tr><th>" + "陪我号" + "</th><th>" + "昵称" + "</th><th>" + "操作" + "</th>";
    if (data.hasOwnProperty('data')) {
        data = data.data;
        if (data.length > 0) {
            for (var indexWhite = 0; indexWhite < data.length; indexWhite++) {
                var white = data[indexWhite];
                str_main += "<tr>" +
                    "<td class='td_uid'>" + white.uid + "</td>" +
                    "<td class='td_name'>" + white.name + "</td>" +
                    "<td class='td_del'><button type='button' class='button_del' onclick=\"deleteWhite('" + white.uid + "');\">" + "删除" + "</button></td>" +
                    "</tr>"
            }
        }
    }
    var totalStr = "查询结束。总记录数:" + totalCount;
    var pageStr = '';
    return {'tableStr': str_main, 'totalStr': totalStr, 'pageStr': pageStr};
}

// 添加白名单
$('.button_add').on('click', function () {
    var tuid = $('.peiwo_id').val();
    if (tuid === '') {
        return;
    }
    else {
        var source = {
            'methodStr': 'POST',
            'url': '',
            'data': {
                'query_method': 'POST',
                'api_request': '/admin/feed/pub/whitelist',
                'tuid': tuid
            }
        };
        $.ajaxFunc(source, successAddwhite, errorHandle);
    }
});
function successAddwhite(data, status, xhr) {
    if (data.code === 0) {
        alert('success');
    }
    else {
        alert('error');
    }
    loadTableWhiteList({});
}

// 删除白名单
function deleteWhite(tuid) {
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': {
            'query_method': 'POST',
            'api_request': '/admin/feed/pub/whitelist/delete',
            'tuid': tuid
        }
    };
    $.ajaxFunc(source, successDeletewhite, errorHandle);
}
function successDeletewhite(data, status, xhr) {
    if (data.code === 0) {
        alert('success');
    }
    else {
        alert('error');
    }
    loadTableWhiteList({});
}
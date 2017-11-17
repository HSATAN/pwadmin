var pageRequest = 1;
var dataSource = {
    'query_method': 'GET',
    'api_request': '/admin/group/query',
    'page_size': 10,
    'page_index': 1,
    'uid': userId,
    'is_recruiting': 1
};
// table数据填充
loadTableGroupManage({});
function loadTableGroupManage(data) {
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
    $.ajaxFunc(source, fillTableGroupManage, errorHandle);
}
function fillTableGroupManage(data, status, xhr) {
    var strGet = getTableGroupManage(data);
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
function getTableGroupManage(data) {
    var totalCount = getTotal(data);
    var tbody_str = "";
    tbody_str += "<tr>" +
        "<th>群组名</th>" +
        "<th>" + "群头像" + "</th>" +
        "<th>" + "群主头像" + "</th>" +
        "<th>" + "群组陪我号" + "</th>" +
        "<th>" + "当前声望/总声望" + "</th>" +
        "<th>" + "成员数/游客数" + "</th>" +
        "<th>" + "门票" + "</th>" +
        "<th>" + "招新" + "</th>" +
        "<th width='18%'>" + "操作" + "</th>" +
        "</tr>";
    if (data.hasOwnProperty('data')) {
        data = data.data;
        if (data.length > 0) {
            for (var coverIndex = 0; coverIndex < data.length; coverIndex++) {
                var group = data[coverIndex];
                tbody_str += "<tr>" +
                    "<td>" + group['group_name'] + "</td>" +
                    "<td><img src='" + group.avatar + "' onmousemove=\"show_pic('" + group.avatar + "');\" onmouseout=\"hide_pic();\" class='pic' /></td>" +
                    "<td><img src='" + group.admin.avatar + "' onmousemove=\"show_pic('" + group.admin.avatar + "');\" onmouseout=\"hide_pic();\" class='pic' alt=''></td>" +
                    "<td>" + group.admin_id + "</td>" +
                    "<td>" + group.balance + "/" + group.total + "</td>" +
                    "<td>" + group.count_member + "/" + group.count_newbie + "</td>" +
                    "<td>" + group.ticket_price + "</td><td>";
                if (group.is_recruiting === 1) {
                    tbody_str += '开启';
                }
                else {
                    tbody_str += '关闭';
                }
                tbody_str += "</td><td>" +
                    "<button class='operate'>关闭招新</button>" +
                    "<button class='operate'>设置收费</button>" +
                    "<button class='operate'>置顶</button>" +
                    "</td></tr>";
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

function pageSearch() {
    pageRequest = parseInt($(this).attr('data-page'));
    var data = {'page_index': pageRequest};
    loadTableGroupManage(data);
};
leftVaigation();

var pageRequest = 1;
var pageSize = 10;
var source = {
    'methodStr': 'POST',
    'url': '',
    'data': {
        'query_method': 'GET',
        'api_request': '/admin/feed/topic',
        'uid': userId,
        'page_size': 10,
        'begin_index': 0
    }
};
var creator_id = "";
var id = "";

// 加载table数据
loadTablelabelManage(source);

// 获取table数据
function loadTablelabelManage(source) {
    $.ajaxFunc(source, fillTablelabelManage, errorHandle);
}

// 获取table数据
function editLabelmanage(source) {
    $.ajaxFunc(source, successEditlabelManage, errorHandle);
}

// 修改数据功能
function successEditlabelManage(data, status, xhr) {
    $('.amend').css('display', 'none');
    if (data.code === 0) {
        loadTablelabelManage(source);
    }
    else {
        alert("error");
    }
}

// 填table数据
function fillTablelabelManage(data, status, xhr) {
    var strGet = getTablelabelManageStr(data);
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
    $('.modify').on('click', modifyData);
    $('.sure').on('click', editData);
    $('.release').on('click', releaseData);
    $('.back').on('click', backData);
}

// 拼table string
function getTablelabelManageStr(data) {
    var totalCount = data.total;
    var str_label = "<tr><th>" + "标签" + "</th><th>" + "说明" + "</th><th>" + "更新时间" + "</th><th>" + "操作" + "</th></tr>";
    if (data.hasOwnProperty('data')) {
        var labels = data.data;
        for (var labelIndex = 0; labelIndex < labels.length; labelIndex++) {
            var label = labels[labelIndex];
            str_label += "<tr id='" + label.id + "'>" +
                "<td class='td_sign' id='content_" + label.id + "'>" + label.content + "</td>" +
                "<td class='td_str' id='subtitle_" + label.id + "'>" + label.subtitle + "</td>" +
                "<td class='td_date'>" + label.create_time + "</td>" +
                "<td class='td_opera'><button type='button' class='operate modify' data-id='" + label.id + "' data-creator='" + label.creator_id + "'>" + "修改" + "</button>";
            if (data.have_release === 1) {
                if (label.state === 2) {
                    str_label += "<button type='button' class='operate back' data-id='" + label.id + "' data-creator='" + label.creator_id + "'>" + "撤回";
                }
                else {
                    str_label += "<button type='button' disabled='disabled' data-id='" + label.id + "' data-creator='" + label.creator_id + "'>" + "发布";
                }
            }
            else {
                str_label += "<button type='button' class='operate release' data-id='" + label.id + "' data-creator='" + label.creator_id + "'>" + "发布";
            }
            str_label += "</button></td></tr>";
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
    return {'tableStr': str_label, 'totalStr': totalStr, 'pageStr': pageStr};
}

// 页码查询
pageSearch = function () {
    pageRequest = parseInt($(this).attr('data-page'));
    source['data']['begin_index'] = (pageRequest - 1) * pageSize;
    loadTablelabelManage(source);
};
// 修改事件
modifyData = function () {
    $('.amend').css('display', 'block');
    id = $(this).attr('data-id');    //标签id
    creator_id = $(this).attr('data-creator');
    $('.sign_content').val($('#content_' + id).text()); //标签内容
    $('.sign_title').val($('#subtitle_' + id).text()); //标题
};
// 修改提交
editData = function () {
    var sourceEdit = {
        'methodStr': 'POST',
        'url': '',
        'data': {
            'query_method': 'POST',
            'api_request': '/admin/feed/topic',
            'tid': id,
            'creator_id': creator_id,
            'content': $('.sign_content').val(),
            'subtitle': $('.sign_title').val()
        }
    };
    editLabelmanage(sourceEdit);
};
// 发布
releaseData = function () {
    var sourceRelease = {
        'methodStr': 'POST',
        'url': '',
        'data': {
            'query_method': 'POST',
            'api_request': '/admin/feed/topic/release',
            'tid': $(this).attr('data-id')
        }
    };
    editLabelmanage(sourceRelease);
};
// 撤回
backData = function () {
    var sourceBack = {
        'methodStr': 'POST',
        'url': '',
        'data': {
            'query_method': 'POST',
            'api_request': '/admin/feed/topic/withdraw',
            'tid': $(this).attr('data-id')
        }
    };
    editLabelmanage(sourceBack);
};
// 添加
$('.span_add').on('click', function () {
    var sourceInsert = {
        'methodStr': 'POST',
        'url': '',
        'data': {
            'query_method': 'POST',
            'api_request': '/admin/feed/topic',
            'creator_id': 1,
            'content': $('.right_sign').val(),  //标题
            'subtitle': $('#msgcontent').val(),     //内容
            'uid': userId
        }
    };
    editLabelmanage(sourceInsert);
});
// 取消编辑
$('.space_out').on('click', function () {
    $('.amend').css('display', 'none');
});
// 关闭编辑
$('.cancel').on('click', function () {
    $('.amend').css('display', 'none');
});
// 清空
$('.span_clear').on('click', function () {
    $('.right_sign').val("");
    $('#msgcontent').val("");
});
leftVaigation();

var pageIndex = 1;
var pageSize = 10;

// 加载table数据
loadTablelabelManage({});

// 获取table数据
function loadTablelabelManage(data) {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/feed/topic',
        'uid': userId,
        'page_size': 10,
        'begin_index': 0
    };
    for (var i in data) {
        dataSend[i] = data[i];
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillTablelabelManage, errorHandle);
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
}

pageSearch = function () {
    pageIndex = $(this).attr('data-page');
    var dataPage = {'begin_index': (pageIndex - 1) * pageSize};
    loadTablelabelManage(dataPage);
};

// 拼table string
function getTablelabelManageStr(data) {
    var totalCount = data.total;
    var str_label = "<tr><th>" + "标签" + "</th><th>" + "说明" + "</th><th>" + "更新时间" + "</th><th>" + "操作" + "</th></tr>";
    if (data.hasOwnProperty('data')) {
        var labels = data.data;
        for (var labelIndex = 0; labelIndex < labels.length; labelIndex++) {
            var label = labels[labelIndex];
            str_label += "<tr>" +
                "<td class='td_sign' id='content_" + label.id + "'>" + label.content + "</td>" +
                "<td class='td_str' id='subtitle_" + label.id + "'>" + label.subtitle + "</td>" +
                "<td class='td_date'>" + label.create_time + "</td>" +
                "<td class='td_opera'><button type='button' class='operate modify' data-id='" + label.id + "'>" + "修改" + "</button>";
            if (data.have_release === 1) {
                if (label.state === 1) {
                    str_label += "<button type='button' class='operate back' data-id='" + label.id + "'>" + "撤回";
                }
                else {
                    str_label += "<button type='button' disabled='disabled' data-id='" + label.id + "'>" + "发布";
                }
            }
            else {
                str_label += "<button type='button' class='operate release' data-id='" + label.id + "'>" + "发布";
            }
            str_label += "</button></td></tr>";
        }
    }
    var totalStr = "查询结束。总记录数:" + totalCount;
    var pageStr = fillPage({'total': totalCount, 'pageSize': pageSize});
    return {'tableStr': str_label, 'totalStr': totalStr, 'pageStr': pageStr};
}

// 拼页码string
function fillPage(pageInfo) {
    var total = pageInfo.total; // 总共多少条数据
    var pageSize = pageInfo.pageSize; // 每页显示多少条数据
    var pageCount = Math.ceil(total / pageSize); // 总共有多少页

    var pageGets = get_pages(pageCount, pageIndex, 10); // 获取页码数组，pageIndex当前是第几页，从1开始
    var pages = pageGets.pages;
    var pageLeft = pageGets.pageLeft;
    var pageRight = pageGets.pageRight;
    var pageStr = "";
    if (pages.length > 0) {
        pageStr += "<button class='pageNum page' data-page='" + pageLeft + "'>" + "上一页" + "</button>";
        for (var indexPage = 0; indexPage < pages.length; indexPage++) {
            var pageNow = pages[indexPage];
            console.log(pageNow+","+pageIndex);
            if (pageNow === pageIndex) {
                pageStr += "<button class='pageUnique page' data-page='" + pageNow + "'>" + pageNow + "</button>";
            }
            else {
                pageStr += "<button class='pageNum page' data-page='" + pageNow + "'>" + pageNow + "</button>";
            }
        }
        pageStr += "<button class='pageNum page' data-page='" + pageRight + "'>" + "下一页" + "</button>";
    }
    return pageStr;
    // for (var pageIndex = pages[0][0]; pageIndex < pages[0][0] + pages[0].length; pageIndex++) {
    //     if (pageIndex === page_index) {
    //         page_str += "<button class='pageUnique' onclick=\"servlet_page('" + pageIndex + "');\">" + pageIndex + "</button>";
    //     }
    //     else {
    //         page_str += "<button class='pageNum' onclick=\"servlet_page('" + pageIndex + "');\">" + pageIndex + "</button>";
    //     }
    // }
    // page_str += "<button class='pageNum' onclick=\"servlet_page('" + pages[2] + "');\">" + '下一页' + "</button>";
}

var BaseUrl = window.location.href;
BaseUrl = BaseUrl.substring(0, BaseUrl.indexOf("?") - 1);
BaseUrl = decodeURI(BaseUrl);

function servlet_page(page) {
    var data = {
        'page': page
    };
    patchwork_url(data);
}

var id;
var sign_title;
var sign_content;
$('.modify').on('click', function () {
    $('.amend').css('display', 'block');
    id = $(this).attr('data-id');    //标签id
    sign_title = $('#subtitle_' + id).text();      //标题
    sign_content = $('#content_' + id).text();      //标签内容
    $('.sign_content').val(sign_content);
    $('.sign_title').val(sign_title);
});

$('.space_out').on('click', function () {
    $('.amend').css('display', 'none');
});

$('.cancel').on('click', function () {
    $('.amend').css('display', 'none');
});

$('.sure').on('click', function () {
    var data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topic',
        'creator_id': 1,
        'tid': id,
        'content': $('.sign_content').val(),
        'subtitle': $('.sign_title').val()
    };
    query_func(data, 'POST');
});

$('.span_clear').on('click', function () {
    $('.right_sign').val("");
    $('#msgcontent').val("");
});

$('.span_add').on('click', function () {
    var data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topic',
        'creator_id': 1,
        'content': $('.right_sign').val(),  //标题
        'subtitle': $('#msgcontent').val()     //内容
    };
    query_func(data, 'POST');
    window.location.reload();
});


$('.release').on('click', function () {
    var id = $(this).attr('data-id');
    var data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topic/release',
        'tid': id
    };
    query_func(data, 'POST');
    window.location.reload();
});


$('.back').on('click', function () {
    var id = $(this).attr('data-id');
    var data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topic/withdraw',
        'tid': id
    };
    query_func(data, 'POST');
    window.location.reload();
});
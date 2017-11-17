leftVaigation();
//ajax封装
$.ajaxFunc = function (source, successHandle, errorHandle) {
    var url = source.url;
    var methodStr = source.methodStr;
    var data = source.data;
    var headers = {'X-CSRFToken': csrfmiddlewaretoken};
    $.ajax({
        url: url,
        type: methodStr,
        data: data,
        dataType: "json",
        headers: headers,
        async: true
    }).done(successHandle).fail(errorHandle);
};

function fillSections(strGet) {
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

function fillPage(pageInfo) {
    var total = pageInfo.total; // 总共多少条数据
    var pageSize = pageInfo.pageSize; // 每页显示多少条数据
    var pageShow = pageInfo.pageShow; // 最多显示多少页
    if (!pageSize) {
        pageSize = 10;
    }
    if (!pageShow) {
        pageShow = 10;
    }
    var pageCount = Math.ceil(total / pageSize); // 总共有多少页
    var pageRequest = pageInfo.pageRequest; // 当前第几页，从1开始
    var pageGets = get_pages(pageCount, pageRequest, pageShow); // 获取页码数组，pageIndex当前是第几页，从1开始
    var pages = pageGets.pages;
    var pageLeft = pageGets.pageLeft;
    var pageRight = pageGets.pageRight;
    var pageStr = "";
    if (pages.length > 0) {
        pageStr += "<button class='pageNum page' data-page='" + pageLeft + "'>" + "上一页" + "</button>";
        for (var indexPage = 0; indexPage < pages.length; indexPage++) {
            var pageNow = pages[indexPage];
            if (pageNow === pageRequest) {
                pageStr += "<button class='pageUnique page' data-page='" + pageNow + "'>" + pageNow + "</button>";
            }
            else {
                pageStr += "<button class='pageNum page' data-page='" + pageNow + "'>" + pageNow + "</button>";
            }
        }
        pageStr += "<button class='pageNum page' data-page='" + pageRight + "'>" + "下一页" + "</button>";
    }
    pageStr += "<span class='totalPage'>共" + pageCount + "页</span>";
    return pageStr;
}

//获取页码、上一页、下一页
function get_pages(pageCount, pageRequest, pageShow) {
    // page_count总共多少页，pageRequest当前第几页, pageShow最多显示多少个
    var midPages = Math.ceil(pageShow / 2);
    var pageFrom = 1;
    if (pageRequest <= midPages) {
        pageFrom = 1;
    }
    else {
        if (pageRequest >= pageCount - midPages + 1) {
            pageFrom = pageCount - pageShow + 1;
        }
        else {
            pageFrom = pageRequest - midPages + 1;
        }
    }
    var pages = [];
    for (var indexPage = pageFrom; indexPage < pageFrom + pageShow; indexPage++) {
        if (indexPage <= pageCount) {
            pages.push(indexPage);
        }
    }
    var pageLeft = pageRequest - 1;
    var pageRight = pageRequest + 1;
    if (pageLeft <= 0) {
        pageLeft = pageRequest;
    }
    if (pageRight > pageCount) {
        pageRight = pageRequest;
    }
    return {'pages': pages, 'pageLeft': pageLeft, 'pageRight': pageRight};
}

//pic，图片放大显示
function show_pic(url) {
    $(".pic_big").attr('src', url);
    $('.amend_pic').css('display', 'block');
}

function hide_pic() {
    $('.amend_pic').css('display', 'none');
}

// 函数，处理ajax失败的情况
function errorHandle() {
    alert('ajax error');
}

function leftVaigation() {
    var url = window.location.href;
    var bases = url.split('/');
    var index = $.inArray('pwadmin', bases);
    var base = bases[index + 1];
    var aes = $("#list-group").find('a');
    var targets = [];
    for (var dex = 0; dex < aes.length; dex++) {
        if (aes[dex].href.indexOf(base) !== -1) {
            targets.push(aes[dex]);
        }
    }
    var len = targets.length;
    var target_a = targets[len - 1];
    var target_li = $(target_a).parent('li');
    target_a.style.color = 'white';
    target_li.css('background-color', '#02a1c9');
}

function dateToString(now) {
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    if (day.length === 1) {
        day = "0" + day;
    }
    if (hour.length === 1) {
        hour = "0" + hour;
    }
    if (minute.length === 1) {
        minute = "0" + minute;
    }
    if (second.length === 1) {
        second = "0" + second;
    }
    var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return dateTime;
}

$('.clear').on('click', function () {
    $('.data_search input').val('');
});

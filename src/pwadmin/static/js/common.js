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

//获取页码、上一页、下一页
function get_pages(pageCount, pageIndex, pageShow) {
    // page_count总共多少页，page_index当前第几页, pageShow最多显示多少个
    var midPages = Math.ceil(pageShow);
    var pageFrom = 1;
    if (pageIndex <= midPages) {
        pageFrom = 1;
    }
    else {
        if (pageIndex >= pageCount - midPages + 1) {
            pageFrom = pageCount - pageShow + 1;
        }
        else {
            pageFrom = pageIndex - midPages + 1;
        }
    }
    var pages = [];
    for (var indexPage = pageFrom; indexPage < pageFrom + pageShow; indexPage++) {
        if (indexPage <= pageCount) {
            pages.push(indexPage);
        }
    }
    var pageLeft = pageIndex - 1;
    var pageRight = pageIndex + 1;
    if (pageLeft <= 0) {
        pageLeft = pageIndex;
    }
    if (pageRight > pageCount) {
        pageRight = pageIndex;
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

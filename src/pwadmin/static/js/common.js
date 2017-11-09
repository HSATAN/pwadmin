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
function get_pages(page_count, page_index) {
    var page_show = 10;
    var mid = 5;
    if (page_index <= mid) {
        var page_from = 1;
    }
    else if (page_index >= page_count - page_show + 1) {
        page_from = page_count - page_show + 1;
    }
    else {
        page_from = page_index - mid + 1;
    }
    var pages = [];
    for (var page = page_from; page <= page_from + 9; page++) {
        if (page <= page_count) {
            pages.push(page);
        }
    }
    var page_left = 1;
    var page_right = page_count;
    if (page_index === 1) {
        page_left = 1;
    }
    else {
        page_left = page_index - 1;
    }
    if (page_index === page_count) {
        page_right = page_count;
    }
    else {
        page_right = page_index + 1;
    }
    return [pages, page_left, page_right];
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

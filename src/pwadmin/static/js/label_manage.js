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
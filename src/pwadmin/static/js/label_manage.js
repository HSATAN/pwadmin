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
    data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topic',
        'creator_id': 1,
        'version': 9999,
        'uid': 1,
        "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
        'tid': id,
        'content': $('.sign_content').val(),
        'subtitle': $('.sign_title').val(),
        'csrfmiddlewaretoken': csrfmiddlewaretoken,
    };
    $.ajax({
        type: 'POST',
        url: '',
        data: data,
        dataType: 'json',
        success: function (data) {
            if (data.code==0)
            {
                alert("success");
                window.location.reload();
            }
            else
            {
                alert("error");
            }
        }
    });
});

$('.span_clear').on('click', function () {
    $('.right_sign').val("");
    $('#msgcontent').val("");
});

$('.span_add').on('click', function () {
    data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topic',
        'creator_id': 1,
        'version': 9999,
        'uid': 1,
        "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
        'content': $('.right_sign').val(),  //标题
        'subtitle': $('#msgcontent').val(),     //内容
        'csrfmiddlewaretoken': csrfmiddlewaretoken
    };
    $.ajax({
        type: 'POST',
        url: '',
        data: data,
        dataType: 'json',
        success: function (data) {
            if (data.code==0)
            {
                alert("success");
                window.location.reload();
            }
            else
            {
                alert("error");
            }
        }
    });
});


$('.release').on('click', function () {
    var id = $(this).attr('data-id');
    data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topic/release',
        'version': 9999,
        'uid': 1,
        "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
        'tid': id,
        'csrfmiddlewaretoken': csrfmiddlewaretoken
    };
    $.ajax({
        type: 'POST',
        url: '',
        data: data,
        dataType: 'json',
        success: function (data) {
            if (data.code==0)
            {
                alert("success");
                window.location.reload();
            }
            else
            {
                alert("error");
            }
        }
    });
});


$('.back').on('click', function () {
    var id = $(this).attr('data-id');
    data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/topic/withdraw',
        'version': 9999,
        'uid': 1,
        "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
        'tid': id,
        'csrfmiddlewaretoken': csrfmiddlewaretoken
    };
    $.ajax({
        type: 'POST',
        url: '',
        data: data,
        dataType: 'json',
        success: function (data) {
            if (data.code==0)
            {
                alert("success");
                window.location.reload();
            }
            else
            {
                alert("error");
            }
        }
    });
});
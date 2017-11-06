var pic = $('.cover_pic');
pic.mousemove(function () {
    var path = $(this).attr("src");
    $(".pic_big").attr('src', path);
    $('.amend_pic').css('display', 'block');
});
pic.mouseout(function () {
    $('.amend_pic').css('display', 'none');
});

function ShowMessage(datas) {
    var data = {
        'query_method': 'GET',
        'api_request': '/admin/live/cover/list',
        'state': 0,
        'page_size': 10,
        'page_index': 0,
        'csrfmiddlewaretoken': csrfmiddlewaretoken
    };
    for (var one in datas) {
        data[one] = datas[one];
    }
    $.ajax({
        type: 'POST',
        url: '',
        data: data,
        dataType: 'json',
        success: function (data) {
            var data_list = data.data.list;
            var count = data.data.page_info.row_count;
            var tbody_str = fill_table(data_list);
            clear_table();
            $('<span class="total">查询结束，总记录' + count + '</span>').insertBefore($('.data_table'));
            $('.data_table tbody').append(tbody_str);
        }
    });
}

function fill_table(data) {
    var tbody_str = "";
    if (data.length > 0) {
        for (var coverIndex = 0; coverIndex < data.length; coverIndex++) {
            tbody_str += "<tr>" +
                "<td>" + data[coverIndex]['uid'] + "</td>" +
                "<td>" + data[coverIndex]['name'] + "</td>" +
                "<td>" + "<img src='" + data[coverIndex]['cover_url'] + "' class='cover_pic' alt=''>" + "</td>" +
                "<td>" + data[coverIndex]['create_time'] + "</td>" +
                "<td>" + data[coverIndex]['uid'] + "</td>" +
                "</tr>"
        }
    }
    return tbody_str
}

function clear_table() {
    $(".data_table tbody").remove();
    $(".total").remove();
    $(".data_table").append('<tbody></tbody>');
}

function flashData() {
    var data_deliver = {};
    var tuid = $('.tuid').val();
    if (tuid.length > 0) {
        data_deliver['tuid'] = tuid;
    }
    var begin_time = $('.begin_time').val();
    if (begin_time.length > 0) {
        data_deliver['begin_time'] = begin_time;
    }
    var end_time = $('.end_time').val();
    if (end_time.length > 0) {
        data_deliver['end_time'] = end_time;
    }
    ShowMessage(data_deliver);
}

$('.clear').on('click', function () {
    $('.tuid').empty();
    $('.begin_time').empty();
    $('.end_time').empty();
});

function deal(action, cover_id, tuid) {
    if (!confirm('确定吗?')) {
        return false;
    }
    else {
        var data = {
            'query_method': 'POST',
            'api_request': '/admin/live/cover/audit',
            "cover_id": cover_id,
            'state': action,
            'uid': 1,
            'tuid': tuid,
            'csrfmiddlewaretoken': csrfmiddlewaretoken
        };
        $.ajax({
            type: 'POST',
            url: '',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.code === 0) {
                    alert('已操作成功');
                }
                else {
                    alert('请重试');
                }
            }
        });
    }
}
window.onload = function () {
    var data = {
        'query_method': 'GET',
        'api_request': '/admin/live/cover/list',
        'state': 0,
        'page_size': 10,
        'page_index': 0,
        'csrfmiddlewaretoken': csrfmiddlewaretoken
    };
    $.ajax({
        type: 'POST',
        url: '',
        data: data,
        dataType: 'json',
        success: function (data) {
            var data_list = data.data.list;
            var count = data.data.row_count;
            var tbody_str = fill_table(data_list);
            $('<span>查询结束，总记录 +count+ </span>').insertBefore($('.data_table'));
            $('.data_table tbody').append(tbody_str);
        }
    });
};

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

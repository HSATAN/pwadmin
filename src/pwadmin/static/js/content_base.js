function change_date(day) {
    var start_date = new Date();
    start_date.setDate(start_date.getDate() - day);
    var end_date = new Date();
    end_date.setDate(end_date.getDate() + 1);
    var start = start_date.Format("yyyy-MM-dd HH:mm:ss");
    var end = end_date.Format("yyyy-MM-dd HH:mm:ss");
    $('.start').val(start);
    $('.end').val(end);
}

function query_func(data, methodStr) {
    $.ajax({
        type: methodStr,
        url: '',
        data: data,
        dataType: 'json',
        success: function (data) {
        }
    });
}

function change_url(param, from, to, url) {
    var replace_from = param + '=' + from;
    var replace_to = param + '=' + to;
    if (from == null) {
        if (to != '') {
            var url_last = url.substr(url.length - 1, 1);
            if (url_last == '/') {
                url = url + '?' + replace_to;
            }
            else {
                url = url + '&' + replace_to;
            }
        }
    }
    else {
        if (to == '') {
            var index_from = url.indexOf(replace_from);
            var index_to = index_from + replace_from.length - 1;
            if (index_to < url.length - 1) {
                replace_from = replace_from + url.substr(index_to + 1, 1);
                replace_to = '';
            }
            else {
                replace_from = url.substr(index_from - 1, 1) + replace_from;
                replace_to = '';
            }
        }
        url = url.replace(replace_from, replace_to);
    }
    return url;
}
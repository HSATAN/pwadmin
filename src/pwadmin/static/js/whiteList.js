$('.button_add').on('click', function () {
    var tuid = $('.peiwo_id').val();
    data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/pub/whitelist',
        'version': 9999,
        'uid': 1,
        'tuid': tuid,
        "session_data": "81ded44dbc365b7f8e05be22c7ceee32",
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
                window.location.reload();
            }
            else
            {
                alert("error");
            }
        }
    });
});

function edit(tuid) {
    data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/pub/whitelist/delete',
        'version': 9999,
        'uid': 1,
        'tuid': tuid,
        'session_data': '81ded44dbc365b7f8e05be22c7ceee32',
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
                window.location.reload();
            }
            else
            {
                alert("error");
            }
        }
    });
}
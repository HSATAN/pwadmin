$('.button_add').on('click', function () {
    var tuid = $('.peiwo_id').val();
    var data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/pub/whitelist',
        'tuid': tuid
    };
    query_func(data, 'POST');
});

function edit(tuid) {
    var data = {
        'query_method': 'POST',
        'api_request': '/admin/feed/pub/whitelist/delete',
        'tuid': tuid
    };
    query_func(data, 'POST');
}
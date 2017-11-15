// 加载标签分类
loadLabelclassification();
// 加载主类别子类别
loadCategories();

var pageRequest = 1;
var pageSize = 10;
var commonFields = {
    'liveId': '',
    'tuid': ''
};
var dataSource = {
    'query_method': 'GET',
    'api_request': '/admin/live/list',
    'uid': userId,
    'state': 0,
    'page_size': 10,
    'page_index': 1,
    'type': 0,
    'order': 'weight',
    'desc': 1
};

// 加载table部分
loadTableliveOnline({});
// 获取页面table数据
function loadTableliveOnline(data) {
    for (var i in data) {
        if (data[i] !== '') {
            dataSource[i] = data[i];
        }
        else {
            if (dataSource.hasOwnProperty(i)) {
                delete dataSource.i
            }
        }
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSource
    };
    $.ajaxFunc(source, fillTableLives, errorHandle);
}

// 搜索；页面搜索
$('.search').on('click', function () {
    var owner_uid = $('.owner_uid').val(); // 主播陪我号
    var owner_name = $('.owner_name').val(); // 主播昵称
    var live_id = $('.live_id').val(); // 直播id
    var label_id = $('#label_type').val(); // 标签分类
    if (label_id !== '') {
        label_id = parseInt(label_id);
    }
    var order = $('#order').val(); // 排序字段
    var desc = 0; // 是否逆序
    if ($('.desc').is(':checked')) {
        desc = 1;
    }
    var main_label_id = $('#main_label').val(); // 主类别
    var sub_label_id = $('#sub_label').val(); // 子类别
    if (main_label_id === '') {
        sub_label_id = ''
    }
    var data_send = {
        'owner_uid': owner_uid,
        'owner_name': owner_name,
        'live_id': live_id,
        'label_id': label_id,
        'order': order,
        'desc': desc,
        'main_label_id': main_label_id,
        'sub_label_id': sub_label_id
    };
    loadTableliveOnline(data_send);
});
function pageSearch() {
    pageRequest = parseInt($(this).attr('data-page'));
    var data = {'page_index': pageRequest};
    loadTablelabelManage(data);
}

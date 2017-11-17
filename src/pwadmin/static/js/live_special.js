// 加载标签分类
loadLabelclassification();
// 加载主类别子类别
loadCategories();

var pageRequest = 1;
var pageSize = 10;
var commonFields = {
};
var dataSource = {
    'query_method': 'GET',
    'api_request': '/admin/live/special_list',
    'uid': userId,
    'state': 0,
    'page_size': 10,
    'page_index': 1,
    'type': 2,
    'order': 'weight',
    'desc': 1
};
// 加载table部分
loadTableliveSpecial({});
// 获取页面table数据
function loadTableliveSpecial(data) {
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
// 搜索
$('.search').on('click', function () {
    var owner_uid = $('.owner_uid').val(); // 主播陪我号
    var owner_name = $('.owner_name').val(); // 主播昵称
    var gift_value = $('.gift_value').val(); // 礼物价值
    var live_id = $('.live_id').val(); // 直播id
    var state = $('#type').val(); // 状态
    if (state === '') {
        state = -1
    }
    var label_id = $('#label_type').val(); // 标签分类
    var order = $('#order').val(); // 排序字段
    var desc = 0; // 是否逆序
    if ($('.desc').is(':checked')) {
        desc = 1;
    }
    var main_label_id = $('#main_label').val(); // 主类别
    var sub_label_id = $('#sub_label').val(); // 主类别
    var begin_time = $('.begin_time').val(); // 开始时间
    var end_time = $('.end_time').val(); // 结束时间
    var data_send = {
        'owner_uid': owner_uid,
        'owner_name': owner_name,
        'gift_value': gift_value,
        'live_id': live_id,
        'state': state,
        'label_id': label_id,
        'order': order,
        'desc': desc,
        'main_label_id': main_label_id,
        'sub_label_id': sub_label_id,
        'begin_time': begin_time,
        'end_time': end_time
    };
    if (data_send.hasOwnProperty('main_label_id')) {
        if (data_send['main_label_id'] === '') {
            if (data_send.hasOwnProperty('sub_label_id')) {
                delete data_send.sub_label_id
            }
        }
    }
    loadTableliveSpecial(data_send);
});
// 页面搜索
function pageSearch() {
    pageRequest = parseInt($(this).attr('data-page'));
    var data = {'page_index': pageRequest};
    loadTableliveSpecial(data);
}



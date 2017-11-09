leftVaigation();
//设置左侧导航栏颜色

//加载主类别id为main_label部分的代码
function loadCategories(data) {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live_label_new/brief_label_query',
        'uid': userId
    };
    for (var i in data) {
        dataSend[i] = data[i];
    }
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillCategory, errorHandle);
}

//加载标签分类
function loadLabelclassification() {
    var dataSend = {
        'query_method': 'GET',
        'api_request': '/admin/live_label/label_query',
        'uid': userId,
        'page_index': 1,
        'kind': 0,
        'page_size': 100
    };
    var source = {
        'methodStr': 'POST',
        'url': '',
        'data': dataSend
    };
    $.ajaxFunc(source, fillLabelclassification, errorHandle);
}

// 填主类别和子类别
function fillCategory(data, status, xhr) {
    var strMaincategory = "<option value>" + "全部" + "</option>";
    var majors = data.data;
    for (var indexLabel = 0; indexLabel < majors.length; indexLabel++) {
        var major = majors[indexLabel];
        strMaincategory += "<option value='" + major.id + "'>" + major.name + "</option>";
    }
    $("#main_label").append(strMaincategory);
    $("#main_label").change(function () {
        var main_val = $(this).val();
        for (var indexLabel = 0; indexLabel < majors.length; indexLabel++) {
            if (Number(majors[indexLabel].id) === Number(main_val)) {
                fill_subs(majors[indexLabel].sub_labels);
            }
        }
    });
}

function ShowMessageLives(datas) {
    var order = $("#order").val();
    var data = {
        'query_method': 'GET',
        'api_request': '/admin/live/list',
        'uid': userId,
        'page_size': 10,
        'page_index': 1,
        'type': 0,
        'order': order,
        'desc': 1
    };
    for (var one in datas) {
        data[one] = datas[one];
    }
    $.ajax({
        type: 'POST',
        url: '',
        data: data,
        dataType: 'json'
        // success: function (data) {
        // clear();
        // var data_response = data.data;
        // $('.total').append("<span class='total'>" + "查询结束，总记录" + data_response.page_info.row_count + "</span>");
        // var tbody_str = fill_data(data_response);
        // $('#data_table tbody').append(tbody_str);
        // }
    }).done(function (data) {
        data_dable = data;
        data_back();//调用回调函数。
    });
}

// 标签分类填数据
function fillLabelclassification(data, status, xhr) {
    var label_str = "<option value='0'>" + "全部" + "</option>";
    if (data.hasOwnProperty('data')) {
        data = data.data;
        if (data.hasOwnProperty('list')) {
            data = data.list;
            if (data.length > 0) {
                for (var labelIndex = 0; labelIndex < data.length; labelIndex++) {
                    label_str += "<option value='" + data[labelIndex].label_id + "'>" + data[labelIndex].content + "</option>";
                }
            }
        }
    }
    $('#label_type').append(label_str);
}

// 子类别填数据
function fill_subs(subs) {
    var sub_str = "";
    for (var indexSub = 0; indexSub < subs.length; indexSub++) {
        sub_str += "<option value='" + subs[indexSub].id + "'>" + subs[indexSub].name + "</option>";
    }
    $("#sub_label").empty();
    $("#sub_label").append(sub_str);
}

//清除数据
function clear_search() {
    $('.owner_uid').val("");
    $('.owner_name').val("");
    $('.gift_value').val("");
    $('.live_id').val("");
    $('.begin_time').val("");
    $('.end_time').val("");
    $('.desc').attr("checked", false);
}

function find_data() {
    var owner_uid = $('.owner_uid').val();
    var owner_name = $('.owner_name').val();
    var gift_value = $('.gift_value').val();
    var live_id = $('.live_id').val();
    var state = $('#type').val();
    var label_id = $('#label_type').val();
    var order = $('#order').val();
    var main_label_id = $('#main_label').val();
    var sub_label_id = $('#sub_label').val();
    var begin_time = $('.begin_time').val();
    var end_time = $('.end_time').val();
    var desc = 0;
    if ($('.desc').is(':checked')) {
        desc = 1;
    }
    var data_find = {
        'order': order,
        'desc': desc,
        'page_size': 10,
        'page_index': 1
    };
    if (owner_uid.length > 0) {
        data_find['owner_uid'] = owner_uid;
    }
    if (owner_name.length > 0) {
        data_find['owner_name'] = owner_name;
    }
    if (gift_value.length > 0) {
        data_find['gift_value'] = gift_value;
    }
    if (live_id.length > 0) {
        data_find['live_id'] = live_id;
    }
    if (state.length > 0) {
        data_find['state'] = state;
    }
    if (begin_time.length > 0) {
        data_find['begin_time'] = begin_time;
    }
    if (end_time.length > 0) {
        data_find['end_time'] = end_time;
    }
    if (main_label_id !== "") {
        data_find['main_label_id'] = main_label_id;
        data_find['sub_label_id'] = sub_label_id;
    }
    if (label_id !== "") {
        data_find['label_id'] = label_id;
    }
    ShowMessageLives(data_find);
}

// 获取状态，房间填数据时
function getStateDesc(state) {
    if (state === 0) {
        return "正常";
    } else if (state === 1) {
        return "暂停";
    } else if (state === 2) {
        return "停止";
    }
    return "未知";
}

// 获取总数据条数
function getTotal(data) {
    var count = 0;
    if (data.hasOwnProperty('data')) {
        data = data.data;
        if (data.hasOwnProperty('page_info')) {
            var page_info = data.page_info;
            if (page_info.hasOwnProperty('row_count')) {
                count = page_info.row_count;
            }
        }
    }
    return count;
}

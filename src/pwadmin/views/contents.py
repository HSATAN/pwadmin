# -*- coding: utf-8 -*-
import math
import json
import time
from copy import deepcopy
from django.shortcuts import render, HttpResponse
from django.views.generic import View
from utils.sdk import sneakSDK
from admin_interface.strings import PAGE_SIZE
from admin_interface.common import BaseHandler
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.serializers import serialize
from admin_interface.strings import METHOD_GET, METHOD_POST


class LabelManage(View, BaseHandler):
    template = 'pwadmin/contents/label_manage.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        page_size = int(queries.get('page_size', PAGE_SIZE))
        page_index = int(request.GET.get('page', 1)) - 1
        additional = {
            'api_request': '/admin/feed/topic',
            'query_method': METHOD_GET,
            'page_size': page_size,
            'begin_index': page_index * page_size

        }
        for key, value in additional.items():
            if key not in queries.keys():
                queries[key] = value
        data = sneakSDK.common.query_sneaky(**queries)
        page_list, page_count = self.get_page_list(page_index, page_size, len(data.get('data', {})))
        # data['page_count'] = page_count
        data['total_list'] = page_list
        # data['page'] = page_now
        # data['page_left'] = page_now - 1
        # data['page_right'] = page_now + 1
        # if page_now == 1:
        #     data['page_left'] = 1
        # if page_now == page_count:
        #     data['page_right'] = page_count
        print 'data:', data
        return render(request, self.template, {'data': data})

    def post(self, request, *args, **kwargs):
        params = self.request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        data = sneakSDK.label_manage.feed_topic_post(**params)
        return HttpResponse(json.dumps(data))


class LabelDynamic(View, BaseHandler):
    template = 'pwadmin/contents/label_dynamic.html'

    def get(self, request, *args, **kwargs):
        api_request = '/admin/feed/topicpub'
        fields = request.GET.dict()
        page_now = int(fields.get('page', PAGE_SIZE))
        if 'page_size' not in fields.keys():
            fields['page_size'] = PAGE_SIZE
        if 'state' not in fields.keys():
            fields['state'] = 0
        page_index = page_now - 1
        begin_index = page_index * int(fields.get('page_size'))
        if 'begin_index' not in fields.keys():
            fields['begin_index'] = begin_index
        fields_new = deepcopy(fields)
        data = sneakSDK.label_dynamic.get_topic_pub(api_request, **fields)
        print 'data:', data
        page_list, page_count = self.get_page_list(begin_index, fields_new.get('page_size', PAGE_SIZE), data.get('total', 0))
        data['total_list'] = page_list
        data['page'] = page_now
        data['page_left'] = page_now - 1
        data['page_right'] = page_now + 1
        data['page_count'] = page_count
        data['state'] = int(fields_new.get('state', 0))
        data['begin_time'] = fields_new.get('begin_time', '')
        data['end_time'] = fields_new.get('end_time', '')
        data['tuid'] = fields_new.get('tuid', '')
        if page_now == 1:
            data['page_left'] = 1
        if page_now == page_count:
            data['page_right'] = page_count
        if data.has_key('data'):
            for i in data.get('data'):
                i['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(i.get('update_time', 0) + 3600 * 8))
        return render(request, self.template, {'data': data})

    def post(self, request, *args, **kwargs):
        params = self.request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        data = sneakSDK.label_dynamic.topic_pub_post(**params)
        return HttpResponse(json.dumps(data))


class ReportDynamic(View, BaseHandler):
    template = 'pwadmin/contents/report_dynamic.html'

    def get(self, request, *args, **kwargs):
        api_request = '/admin/feed/report'
        page_now = int(request.GET.get('page', '1'))
        state = int(request.GET.get('state', 0))
        begin_time = request.GET.get('begin_time', '')
        end_time = request.GET.get('end_time', '')
        tuid = request.GET.get('tuid', '')
        page_index = page_now - 1
        page_size = PAGE_SIZE
        begin_index = page_index * page_size
        query = {'begin_index': begin_index,
                 'page_size': page_size,
                 'state': state}
        if begin_time != '':
            query['begin_time'] = begin_time
        if end_time != '':
            query['end_time'] = end_time
        if tuid != '':
            query['tuid'] = tuid
        data = sneakSDK.report_dynamic.get_feed_report(api_request, **query)
        page_list, page_count = self.get_page_list(begin_index, page_size, data.get('total', 0))
        data['total_list'] = page_list
        data['page'] = page_now
        data['page_left'] = page_now - 1
        data['page_right'] = page_now + 1
        data['page_count'] = page_count
        data['state'] = state
        data['begin_time'] = begin_time
        data['end_time'] = end_time
        data['tuid'] = tuid
        if page_now == 1:
            data['page_left'] = 1
        if page_now == page_count:
            data['page_right'] = page_count
        if data.has_key('data'):
            for i in data.get('data'):
                i['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(i.get('update_time', 0) + 3600 * 8))
        return render(request, self.template, {'data': data})

    def post(self, request, *args, **kwargs):
        params = self.request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        data = sneakSDK.report_dynamic.report_dynamic_post(**params)
        return HttpResponse(json.dumps(data))


class SubmitDynamic(View, BaseHandler):
    template = 'pwadmin/contents/submit_dynamic.html'

    def get(self, request, *args, **kwargs):
        api_request = '/admin/feed/userpub'
        page_now = int(request.GET.get('page', '1'))
        state = int(request.GET.get('state', 0))
        begin_time = request.GET.get('begin_time', '')
        end_time = request.GET.get('end_time', '')
        tuid = request.GET.get('tuid', '')
        page_index = page_now - 1
        page_size = PAGE_SIZE
        begin_index = page_index * page_size
        if state == 5:
            state = ''
        query = {'begin_index': begin_index,
                 'page_size': page_size,
                 'state': state}
        if begin_time != '':
            query['begin_time'] = begin_time
        if end_time != '':
            query['end_time'] = end_time
        if tuid != '':
            query['tuid'] = tuid
        data = sneakSDK.submit_dynamic.get_user_pub(api_request, **query)
        page_list, page_count = self.get_page_list(begin_index, page_size, data.get('total', 0))
        data['total_list'] = page_list
        data['page'] = page_now
        data['page_left'] = page_now - 1
        data['page_right'] = page_now + 1
        data['page_count'] = page_count
        if state == '':
            state = 5
        data['state'] = state
        data['begin_time'] = begin_time
        data['end_time'] = end_time
        data['tuid'] = tuid
        if page_now == 1:
            data['page_left'] = 1
        if page_now == page_count:
            data['page_right'] = page_count
        if data.has_key('data'):
            for i in data.get('data'):
                i['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(i.get('update_time', 0) + 3600 * 8))
        return render(request, self.template, {'data': data})

    def post(self, request, *args, **kwargs):
        params = self.request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        data = sneakSDK.submit_dynamic.submit_dynamic_post(**params)
        return HttpResponse(json.dumps(data))


class WhiteList(View, BaseHandler):
    template = 'pwadmin/contents/whiteList.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        additional = {
            'api_request': '/admin/feed/pub/whitelist',
            'query_method': METHOD_GET
        }
        for key, value in additional.items():
            if key not in queries.keys():
                queries[key] = value
        data = sneakSDK.common.query_sneaky(**queries)
        return render(request, self.template, {'data': data})

    def post(self, request, *args, **kwargs):
        params = self.request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        data = sneakSDK.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))

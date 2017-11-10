# -*- coding: utf-8 -*-
import json
import time
from copy import deepcopy
from django.shortcuts import render, HttpResponse
from django.views.generic import View
from admin_interface.strings import PAGE_SIZE
from admin_interface.common import BaseHandler
from admin_interface.strings import METHOD_GET, METHOD_POST
from contrib.views import BaseGroupsView


class LabelManage(BaseGroupsView):
    template = 'pwadmin/contents/label_manage.html'


class LabelDynamic(View, BaseHandler):
    template = 'pwadmin/contents/label_dynamic.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        page_size = int(queries.get('page_size', PAGE_SIZE))
        page_now = int(queries.get('page', 1))
        page_index = page_now - 1
        state = int(queries.get('state', 0))
        if state == 4:
            state = '2,3'
        additional = {
            'api_request': '/admin/feed/topicpub',
            'query_method': METHOD_POST,
            'page_size': page_size,
            'begin_index': page_index * page_size,
            'state': state
        }
        queries = dict(queries.items() + additional.items())
        user = request.user
        data, extends = user.sdk.common.data_get(queries)
        extends = dict(extends.items() + backups.items())
        if len(data.get('data')) > 0:
            for i in data.get('data'):
                i['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S",
                                                 time.localtime(i.get('update_time', 0) + 3600 * 8))
        return render(request, self.template, {'data': data, 'extends': extends})

    def post(self, request, *args, **kwargs):
        params = request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class SubmitDynamic(View, BaseHandler):
    template = 'pwadmin/contents/submit_dynamic.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        page_size = int(queries.get('page_size', PAGE_SIZE))
        page_now = int(queries.get('page', 1))
        page_index = page_now - 1
        state = int(queries.get('state', 0))
        if state == 4:
            state = '2,3'
        additional = {
            'api_request': '/admin/feed/userpub',
            'query_method': METHOD_POST,
            'page_size': page_size,
            'begin_index': page_index * page_size,
            'state': state
        }
        queries = dict(queries.items() + additional.items())
        user = request.user
        data, extends = user.sdk.common.data_get(queries)
        extends = dict(extends.items() + backups.items())
        if len(data.get('data')) > 0:
            for i in data.get('data'):
                i['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S",
                                                 time.localtime(i.get('update_time', 0) + 3600 * 8))
        return render(request, self.template, {'data': data, 'extends': extends})

    def post(self, request, *args, **kwargs):
        params = request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class ReportDynamic(View, BaseHandler):
    template = 'pwadmin/contents/report_dynamic.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        page_size = int(queries.get('page_size', PAGE_SIZE))
        page_now = int(queries.get('page', 1))
        page_index = page_now - 1
        state = int(queries.get('state', 0))
        if state == 4:
            state = '2,3'
        additional = {
            'api_request': '/admin/feed/report',
            'query_method': METHOD_POST,
            'page_size': page_size,
            'begin_index': page_index * page_size,
            'state': state
        }
        queries = dict(queries.items() + additional.items())
        user = request.user
        data, extends = user.sdk.common.data_get(queries)
        extends = dict(extends.items() + backups.items())
        if len(data.get('data')) > 0:
            for i in data.get('data'):
                i['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S",
                                                 time.localtime(i.get('update_time', 0) + 3600 * 8))
        return render(request, self.template, {'data': data, 'extends': extends})

    def post(self, request, *args, **kwargs):
        params = request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class WhiteList(View, BaseHandler):
    template = 'pwadmin/contents/whiteList.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        additional = {
            'api_request': '/admin/feed/pub/whitelist',
            'query_method': METHOD_GET
        }
        queries = dict(queries.items() + additional.items())
        user = request.user
        data, extends = user.sdk.common.data_get(queries)
        extends = dict(extends.items() + backups.items())
        return render(request, self.template, {'data': data, 'extends': extends})

    def post(self, request, *args, **kwargs):
        params = request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))

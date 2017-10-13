# -*- coding: utf-8 -*-
import math
import json
from django.shortcuts import render, HttpResponse
from django.views.generic import View
from utils.sdk import sneakSDK
from admin_interface.strings import PAGE_SIZE
from admin_interface.common import BaseHandler
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.serializers import serialize


class LabelManage(View, BaseHandler):
    template = 'pwadmin/contents/label_manage.html'

    def get(self, request, *args, **kwargs):
        api_request = '/admin/feed/topic'
        page_index = int(args[0]) - 1
        page_now = int(args[0])
        page_size = PAGE_SIZE
        begin_index = page_index * page_size
        data = sneakSDK.label_manage.get_feed_topic(api_request, begin_index, page_size)
        page_list, page_count = self.get_page_list(page_index, page_size, data.get('total', 0))
        data['total_list'] = page_list
        data['page'] = page_now
        data['page_left'] = page_now - 1
        data['page_right'] = page_now + 1
        if page_now == 1:
            data['page_left'] = 1
        if page_now == page_count:
            data['page_right'] = page_count
        return render(request, self.template, {'data': data})

    def post(self, request, *args, **kwargs):
        """

        Args:
            uid:    默认参数1
            tid:    标签id
            content:    标签内容
            subtitle:   标题
            creator_id:     创建者，默认为1

        Returns:

        """
        params = self.request.POST
        params = params.dict()
        params.pop('csrfmiddlewaretoken')
        data = sneakSDK.label_manage.feed_topic_post(**params)
        return HttpResponse(json.dumps(data))


class LabelDynamic(View, BaseHandler):
    template = 'pwadmin/contents/label_dynamic.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class ReportDynamic(View):
    template = 'pwadmin/contents/report_dynamic.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class SubmitDynamic(View):
    template = 'pwadmin/contents/submit_dynamic.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class WhiteList(View):
    template = 'pwadmin/contents/whiteList.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class Feed(View):
    template = 'pwadmin/contents/feed.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template)

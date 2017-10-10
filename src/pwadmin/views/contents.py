# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.generic import View
from . import sneak_sdk


class Contents(View):
    template = 'pwadmin/contents/label_manage.html'

    # /admin/feed/topic
    def get(self, request, *args, **kwargs):
        path = request.path
        if path.startswith('/'):
            path = path[1:]
        data = sneak_sdk.get_feed_topic(1, 1, 10, path)
        print "data:", data
        return render(request, self.template)


class LabelDynamic(View):
    template = 'pwadmin/contents/label_dynamic.html'

    # /admin/feed/topicpub
    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class ReportDynamic(View):
    template = 'pwadmin/contents/report_dynamic.html'

    # /admin/feed/report
    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class SubmitDynamic(View):
    template = 'pwadmin/contents/submit_dynamic.html'

    # /admin/feed/userpub
    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class WhiteList(View):
    template = 'pwadmin/contents/whiteList.html'

    # /admin/feed/pub/whitelist
    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class Feed(View):
    template = 'pwadmin/contents/feed.html'

    # /admin/feed/pub/query
    def get(self, request, *args, **kwargs):
        return render(request, self.template)

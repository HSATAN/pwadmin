# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.generic import View
from utils.sdk import sneakSDK


class Contents(View):
    template = 'pwadmin/contents/label_manage.html'
    label_manage = sneakSDK.label_manage

    def get(self, request, *args, **kwargs):
        path = request.path
        if path.startswith('/'):
            path = path[1:]
        data = self.label_manage.get_feed_topic(1, 1, 10, path)
        return render(request, self.template)


class LabelDynamic(View):
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

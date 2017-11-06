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


class GroupManage(View, BaseHandler):
    template = 'pwadmin/groups/group_manage.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LiveOnline(View, BaseHandler):
    template = 'pwadmin/groups/live_online.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LiveHide(View, BaseHandler):
    template = 'pwadmin/groups/live_hide.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LiveSearch(View, BaseHandler):
    template = 'pwadmin/groups/live_search.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LiveSpecial(View, BaseHandler):
    template = 'pwadmin/groups/live_special.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class CoverVerify(View, BaseHandler):
    template = 'pwadmin/groups/cover_verify.html'

    def get(self, request, *args, **kwargs):
        query = {
            'query_method': 'GET',
            'api_request': '/admin/live/cover/list',
            'state': 0,
            'page_size': 10,
            'page_index': 0
        }
        user = request.user
        data = user.sdk.common.query_sneaky(**query)
        return render(request, self.template, {'data': data, 'uid': user.uid})

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        params.pop('csrfmiddlewaretoken')
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveProduct(View, BaseHandler):
    template = 'pwadmin/groups/live_product.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LiveRoomReport(View, BaseHandler):
    template = 'pwadmin/groups/live_room_report.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LiveGiftReport(View, BaseHandler):
    template = 'pwadmin/groups/live_gift_report.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LiveDramaReport(View, BaseHandler):
    template = 'pwadmin/groups/live_drama_report.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LiveGiftIncome(View, BaseHandler):
    template = 'pwadmin/groups/live_gift_income.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class LabelRankList(View, BaseHandler):
    template = 'pwadmin/groups/label_rank_list.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class SociatyList(View, BaseHandler):
    template = 'pwadmin/groups/sociaty_list.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)


class SociatyLeaguerList(View, BaseHandler):
    template = 'pwadmin/groups/sociaty_leaguer_list.html'

    def get(self, request, *args, **kwargs):
        queries = request.GET.dict()
        backups = deepcopy(queries)
        return render(request, self.template)
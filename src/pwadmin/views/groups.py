# -*- coding: utf-8 -*-
import json
from django.shortcuts import render, HttpResponse
from contrib.views import LoginRequiredBaseView


class GroupManage(LoginRequiredBaseView):
    template = 'pwadmin/groups/group_manage.html'


class LiveOnline(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_online.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveHide(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_hide.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveSearch(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_search.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveSpecial(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_special.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class CoverVerify(LoginRequiredBaseView):
    template = 'pwadmin/groups/cover_verify.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveProduct(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_product.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveRoomReport(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_room_report.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveGiftReport(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_gift_report.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveDramaReport(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_drama_report.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LiveGiftIncome(LoginRequiredBaseView):
    template = 'pwadmin/groups/live_gift_income.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class LabelRankList(LoginRequiredBaseView):
    template = 'pwadmin/groups/label_rank_list.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class SociatyList(LoginRequiredBaseView):
    template = 'pwadmin/groups/sociaty_list.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))


class SociatyLeaguerList(LoginRequiredBaseView):
    template = 'pwadmin/groups/sociaty_leaguer_list.html'

    def post(self, request, *args, **kwargs):
        params = request.POST.dict()
        user = request.user
        data = user.sdk.common.query_sneaky(**params)
        return HttpResponse(json.dumps(data))

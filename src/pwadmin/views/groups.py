# -*- coding: utf-8 -*-
"""群组相关功能的开发.

"""
from __future__ import unicode_literals, absolute_import
from django.http import JsonResponse
from contrib.views import LoginRequiredBaseView


class IndexView(LoginRequiredBaseView):
    template = 'pwadmin/groups/index.html'


class LiveView(LoginRequiredBaseView):
    template = 'pwadmin/groups/live-index.html'

    def get_ajax(self, request, *args, **kwargs):
        """获取直播间列表.
        openapi: "3.0.0"

        """
        GET = request.GET
        params = dict(
            query=GET.get('query', '') or None,
            type=GET.get('type', '') or None,
            page_index=GET.get('page', 1),
            page_size=GET.get('size', 20),
            begin_time=GET.get('begin_time', '') or None,
            end_time=GET.get('end_time', '') or None,
            state=GET.get('state', '') or None,
            gift_value=GET.get('gift_value', '') or None,
            label_id=GET.get('label_id', '') or None,
            main_label_id=GET.get('main_label_id', '') or None,
            sub_label_id=GET.get('sub_label_id', '') or None,
            order=GET.get('order', 'weight') or 'weight',
            desc=GET.get('desc', '') or 1

        )
        resp = request.user.sdk.groups.live(params)
        return JsonResponse(resp)




class BaseGroupsView(LoginRequiredBaseView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = user.sdk.common.query_sneaky(**request.POST.dict())
        return JsonResponse(data)


class GroupManage(BaseGroupsView):
    template = 'pwadmin/groups/group_manage.html'


class LiveOnline(BaseGroupsView):
    template = 'pwadmin/groups/live_online.html'


class LiveHide(BaseGroupsView):
    template = 'pwadmin/groups/live_hide.html'


class LiveSearch(BaseGroupsView):
    template = 'pwadmin/groups/live_search.html'


class LiveSpecial(BaseGroupsView):
    template = 'pwadmin/groups/live_special.html'


class CoverVerify(BaseGroupsView):
    template = 'pwadmin/groups/cover_verify.html'


class LiveProduct(BaseGroupsView):
    template = 'pwadmin/groups/live_product.html'


class LiveRoomReport(BaseGroupsView):
    template = 'pwadmin/groups/live_room_report.html'


class LiveGiftReport(BaseGroupsView):
    template = 'pwadmin/groups/live_gift_report.html'


class LiveDramaReport(BaseGroupsView):
    template = 'pwadmin/groups/live_drama_report.html'


class LiveGiftIncome(BaseGroupsView):
    template = 'pwadmin/groups/live_gift_income.html'


class LabelRankList(BaseGroupsView):
    template = 'pwadmin/groups/label_rank_list.html'


class SociatyList(BaseGroupsView):
    template = 'pwadmin/groups/sociaty_list.html'


class SociatyLeaguerList(BaseGroupsView):
    template = 'pwadmin/groups/sociaty_leaguer_list.html'

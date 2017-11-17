# -*- coding: utf-8 -*-
"""群组相关功能的开发.

"""
from __future__ import unicode_literals, absolute_import
from contrib.views import BaseView
from contrib.views import LoginRequiredBaseView
from django.http import JsonResponse
from admin_interface.groups import Groups
from pwadmin.views.generic import BaseGroupsView


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


class OperateLiveRooms(BaseView):
    template = 'pwadmin/groups/sociaty_leaguer_list.html'

    def post_ajax(self, request, *args, **kwargs):
        sdk = request.user.sdk
        params = request.POST.dict()
        operate_type = params.get('operate_type', None)
        if operate_type is not None:
            operate_type = params.pop('operate_type')
        if operate_type == 'live_top':
            data = sdk.groups.live_top(params)
        elif operate_type == 'live_conceal':
            data = sdk.groups.live_set_conceal(params)
        elif operate_type == 'live_del_background':
            data = sdk.groups.live_del_background_img(params)
        elif operate_type == 'send_message':
            data = sdk.groups.send_message(params)
        elif operate_type == 'live_del_cover':
            data = sdk.groups.live_del_cover(params)
        elif operate_type == 'live_amend_permission':
            data = sdk.groups.live_set_ratio(params)
        elif operate_type == 'live_block':
            data = sdk.groups.live_block(params)
        elif operate_type == 'live_special':
            data = sdk.groups.live_special_actor(params)
        elif operate_type == 'live_poll':
            data = sdk.groups.live_vote(params)
        elif operate_type == 'live_del_topic':
            data = sdk.groups.live_del_topic(params)
        elif operate_type == 'live_edit_category':
            data = sdk.groups.live_update_label(params)
        else:
            pass
        return JsonResponse(data)

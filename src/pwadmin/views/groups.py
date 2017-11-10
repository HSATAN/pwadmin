# -*- coding: utf-8 -*-
"""群组相关功能的开发.

"""
from __future__ import unicode_literals, absolute_import
from contrib.views import BaseGroupsView


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

# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from django.conf import settings
from .views import (
    pwmanager, index, task, accounts, statistic, permissions, contents, groups
)

urlpatterns = [
    url(r'^$', index.Index.as_view(), name='home'),
    url(r'^sign-in/$', pwmanager.SignIn.as_view(), name='sign-in'),
    url(r'^logout/$', pwmanager.LogoutView.as_view(), name='logout'),
    url(r'^task/$', task.Task.as_view(), name='task'),
    url(r'^accounts/$', accounts.Accounts.as_view(), name='accounts'),
    url(r'^statistic/$', statistic.Statistic.as_view(), name='statistic'),
    url(r'^permissions/$', permissions.MenuList.as_view(), name='perm_menu'),
    url(r'^permissions/manager/$', permissions.ManagerList.as_view(), name='perm_manager'),
    url(r'^permissions/groups/$', permissions.GroupList.as_view(), name='perm_group'),
    url(r'^permissions/menu-tree/$', login_required(permissions.MenuTree.as_view()), name='perm_menu_tree'),
    url(r'^label_manage/$', contents.LabelManage.as_view(), name='label_manage'),
    url(r'^label_dynamic/$', contents.LabelDynamic.as_view(), name='label_dynamic'),
    url(r'^report_dynamic/$', contents.ReportDynamic.as_view(), name='report_dynamic'),
    url(r'^submit_dynamic/$', contents.SubmitDynamic.as_view(), name='submit_dynamic'),
    url(r'^white_list/$', contents.WhiteList.as_view(), name='white_list'),
    url(r'^group_manage/$', groups.GroupManage.as_view(), name='group_manage'),
    url(r'^live_online/$', groups.LiveOnline.as_view(), name='live_online'),
    url(r'^live_hide/$', groups.LiveHide.as_view(), name='live_hide'),
    url(r'^live_search/$', groups.LiveSearch.as_view(), name='live_search'),
    url(r'^live_special/$', groups.LiveSpecial.as_view(), name='live_special'),
    url(r'^cover_verify/$', groups.CoverVerify.as_view(), name='cover_verify'),
    url(r'^live_product/$', groups.LiveProduct.as_view(), name='live_product'),
    url(r'^live_room_report/$', groups.LiveRoomReport.as_view(), name='live_room_report'),
    url(r'^live_gift_report/$', groups.LiveGiftReport.as_view(), name='live_gift_report'),
    url(r'^live_drama_report/$', groups.LiveDramaReport.as_view(), name='live_drama_report'),
    url(r'^live_gift_income/$', groups.LiveGiftIncome.as_view(), name='live_gift_income'),
    url(r'^label_rank_list/$', groups.LabelRankList.as_view(), name='label_rank_list'),
    url(r'^sociaty_list/$', groups.SociatyList.as_view(), name='sociaty_list'),
    url(r'^sociaty_leaguer_list/$', groups.SociatyLeaguerList.as_view(), name='sociaty_leaguer_list'),
]


# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from .views import (
    pwmanager, index, task, accounts, statistic, permissions, contents, config,
    fund, groups

)

urlpatterns = [
    url(r'^$', index.Index.as_view(), name='home'),
    url(r'^sign-in/$', pwmanager.SignIn.as_view(), name='sign-in'),
    url(r'^logout/$', pwmanager.LogoutView.as_view(), name='logout'),
    url(r'^task/$', task.Task.as_view(), name='task'),
    # 用户.
    url(r'^accounts/$', login_required(accounts.Accounts.as_view()), name='accounts'),
    url(r'^account/list/$', accounts.AccountList.as_view(), name='account-list'),
    url(r'^account/reported/$', accounts.ReportedUser.as_view(), name='account-reported'),
    url(r'^account/password/$', accounts.ResetPassword.as_view(), name='account-password'),
    url(r'^account/messages/$', accounts.MessageManagement.as_view(), name='account-messages'),
    url(r'^account/captcha/$', accounts.CaptchaList.as_view(), name='account-captcha'),
    url(r'^account/record/$', accounts.RecordList.as_view(), name='account-record'),
    url(r'^account/payment/$', accounts.PaymentList.as_view(), name='account-payment'),
    url(r'^account/score/$', accounts.ScoreList.as_view(), name='account-score'),
    # 配置.
    url(r'^config/$', config.Index.as_view(), name='config-list'),
    url(r'^config/ad/$', config.AD.as_view(), name='config-ad'),
    url(r'^config/gift/$', config.Gift.as_view(), name='config-gift'),
    # 提现
    url(r'^fund/$', fund.FUND.as_view(), name='fund-wait-audit'),
    url(r'^fund/$', fund.FUND.as_view(), name='fund-pay-failed'),
    # 统计
    url(r'^statistic/$', statistic.Statistic.as_view(), name='statistic'),
    url(r'^statistic/wildcat/$', statistic.Wildcat.as_view(), name='statistic-wildcat'),
    # 群组.
    url(r'^groups/$', groups.IndexView.as_view(), name="groups"),
    url(r'^groups/live/$', groups.LiveView.as_view(), name="groups-live"),
    # 权限.
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

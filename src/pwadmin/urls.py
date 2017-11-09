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
    url(r'^accounts/$', login_required(accounts.Accounts.as_view()), name='accounts'),
    url(r'^account/list/$', accounts.AccountList.as_view(), name='account-list'),
    url(r'^account/reported/$', accounts.ReportedUser.as_view(), name='account-reported'),
    url(r'^account/password/$', accounts.ResetPassword.as_view(), name='account-password'),
    url(r'^account/messages/$', accounts.MessageManagement.as_view(), name='account-messages'),
    url(r'^account/captcha/$', accounts.CaptchaList.as_view(), name='account-captcha'),
    url(r'^account/record/$', accounts.RecordList.as_view(), name='account-record'),
    url(r'^account/payment/$', accounts.PaymentList.as_view(), name='account-payment'),
    url(r'^account/score/$', accounts.ScoreList.as_view(), name='account-score'),
    url(r'^config/$', config.Index.as_view(), name='config-list'),
    url(r'^config/ad/$', config.AD.as_view(), name='config-ad'),
    url(r'^config/Gift/$', config.Gift.as_view(), name='config-gift'),
    url(r'^fund/$', fund.FUND.as_view(), name='fund-wait-audit'),
    url(r'^fund/$', fund.FUND.as_view(), name='fund-pay-failed'),
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
]

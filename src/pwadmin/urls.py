# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from .views import (
    pwmanager, index, task, accounts, statistic, permissions, contents
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
]


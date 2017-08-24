# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from .views import (
    pwmanager, index, task, accounts, statistic, permissions
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
]

# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
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
    url(r'^permissions/$', permissions.Menu.as_view(), name='perm_menu'),
]

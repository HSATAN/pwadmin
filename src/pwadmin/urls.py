# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
from .views import pwmanager, index

urlpatterns = [
    url(r'^$', index.Index.as_view(), name='home'),
    url(r'^sign-in/$', pwmanager.SignIn.as_view(), name='sign-in'),
    url(r'^logout/$', pwmanager.LogoutView.as_view(), name='logout'),
]

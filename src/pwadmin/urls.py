# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
from .views import pwmanager

urlpatterns = [
    url(r'^sign-in/$', pwmanager.SignIn.as_view(), name='sign-in'),
]
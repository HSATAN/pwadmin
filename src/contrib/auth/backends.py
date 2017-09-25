# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf import settings
from pwadmin.models.pwmanager import PwManager
from admin_interface.account import Account

class SneakyBackend(object):
    def authenticate(self, request, **credentials):
        if not 'uid' in credentials:
            return None
        uid = credentials['uid']
        password = credentials['password']
        pwmanager = PwManager.objects.filter(uid=uid)
        if not pwmanager.exists():
            return None
        acc = Account(settings.API_HOST)
        r = acc.verify_user(uid, password)
        if r['code'] == 0:
            return pwmanager.first()

    def get_user(self, user_id):
        try:
            return PwManager.objects.get(pk=user_id)
        except PwManager.DoesNotExist:
            return None

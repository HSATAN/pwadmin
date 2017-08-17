# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from pwadmin.models.pwmanager import PwManager


class SneakyBackend(object):
    def authenticate(self, request, **credentials):
        if not 'uid' in credentials:
            return None
        pwmanager = PwManager.objects.filter(uid=credentials['uid'])
        if not pwmanager.exists():
            return None
        return pwmanager.first()

    def get_user(self, user_id):
        try:
            return PwManager.objects.get(pk=user_id)
        except PwManager.DoesNotExist:
            return None

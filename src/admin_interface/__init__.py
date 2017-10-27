# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from .account import Account
from .content import CommonInterface


class SneakSDK(object):
    def __init__(self, host, user=None):
        self.host = host

        self.account = Account(host, user=user)
        self.common = CommonInterface(host)


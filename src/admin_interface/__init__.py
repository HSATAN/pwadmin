# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from .account import Account
from .setting import Setting
from .content import CommonInterface
from .fund import Fund


class SneakSDK(object):
    def __init__(self, host, user=None, token=None):
        self.host = host

        self.account = Account(host, user=user, token=token)
        self.common = CommonInterface(host)
        self.config = Setting(host, user=user, token=token)
        self.fund = Fund(host, user=user, token=token)

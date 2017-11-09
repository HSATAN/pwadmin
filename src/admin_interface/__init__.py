# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from .account import Account
from .setting import Setting
from .content import CommonInterface
from .fund import Fund
from .statistic import Statistic
from .groups import Groups


class SneakSDK(object):
    def __init__(self, host, user=None, token=None):
        self.host = host

        self.account = Account(host, user=user, token=token)
        self.common = CommonInterface(host, user=user, token=token)
        self.config = Setting(host, user=user, token=token)
        self.fund = Fund(host, user=user, token=token)
        self.statistic = Statistic(host, user=user, token=token)
        self.groups = Groups(host, user=user, token=token)

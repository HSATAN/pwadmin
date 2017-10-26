# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from .account import Account
from .content import CommonInterface


class SneakSDK(object):
    def __init__(self, host):
        self.host = host
        self.account = Account(host)
        self.common = CommonInterface(host)

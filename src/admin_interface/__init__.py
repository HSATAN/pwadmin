# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from .account import Account
from .content import LabelManageInterface, LabelDynamicInterface, ReportDynamicInterface, \
    WhiteListInterface, FeedInterface


class SneakSDK(object):
    def __init__(self, host, user=None):
        self.host = host
        self.account = Account(host, user=user)
        self.label_manage = LabelManageInterface(host)
        self.label_dynamic = LabelDynamicInterface(host)
        self.report_dynamic = ReportDynamicInterface(host)
        self.feed = FeedInterface(host)


# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from .account import Account
from .content import LabelManageInterface, LabelDynamicInterface, ReportDynamicInterface, \
    WhiteListInterface, SubmitDynamicInterface, CommonInterface


class SneakSDK(object):
    def __init__(self, host):
        self.host = host
        self.account = Account(host)
        self.label_manage = LabelManageInterface(host)
        self.label_dynamic = LabelDynamicInterface(host)
        self.submit_dynamic = SubmitDynamicInterface(host)
        self.report_dynamic = ReportDynamicInterface(host)
        self.white_list = WhiteListInterface(host)
        self.common = CommonInterface(host)

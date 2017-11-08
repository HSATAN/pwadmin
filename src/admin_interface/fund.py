# -*- coding: utf-8 -*-
"""
sneaky 提现 SDK
"""
from __future__ import unicode_literals, absolute_import

from .common import BaseHandler


class Fund(BaseHandler):
    FUND_URL = '/admin/withdraw'

    def query(self, params):
        return self.request(self.FUND_URL, 'get', params=params).json()

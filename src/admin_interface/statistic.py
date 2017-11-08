# -*- coding: utf-8 -*-
"""
sneaky 统计 SDK
"""
from __future__ import unicode_literals, absolute_import

from .common import BaseHandler


class Statistic(BaseHandler):
    WILDCAT_URL = '/admin/wildcat/pooldata'

    def wildcat(self, params=None):
        return self.request(self.WILDCAT_URL, 'get', params=params).json()

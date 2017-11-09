# -*- coding: utf-8 -*-
"""
sneaky 群组 SDK
"""
from __future__ import unicode_literals, absolute_import

from .common import BaseHandler


class Groups(BaseHandler):
    TOP_URl = '/admin/live/top'
    LIVE_URL = '/admin/live'

    def make_top(self, params):
        return self.request(self.TOP_URl, 'get', params=params).json()

    def live(self, params):
        return self.request(self.LIVE_URL, 'get', params=params).json()

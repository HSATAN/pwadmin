# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

"""
sneaky 配置文件sdk
"""
from .common import BaseHandler


class Setting(BaseHandler):
    QUERY = '/admin/setting/query'
    AD_QUERY = '/admin/ads/query'

    def list(self, key, desc, page, size):
        """配置列表.

        Args:
            key:
            desc:
            page:
            size:

        Returns:

        """
        params = {'key': key,
                  'desc': desc,
                  'page': page,
                  'size': size}
        return self.query(self.QUERY, 'get', params=params)

    def ad_query(self, type=-1, page=1, size=25):
        """广告图片.

        Returns:

        """
        params = {
            'type': type,
            'page_index': page,
            'page_size': size
        }
        return self.query(self.AD_QUERY, 'get', params=params)
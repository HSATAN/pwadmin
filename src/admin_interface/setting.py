# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

"""
sneaky 配置文件sdk
"""
from .common import BaseHandler


class Setting(BaseHandler):
    CONFIG_URL = '/admin/setting'
    AD_URL = '/admin/ads'
    GIFT_URL = '/admin/gift'

    def list(self, desc=None, page=1, size=25):
        """配置列表.

        Args:
            key:
            desc:
            page:
            size:

        Returns:

        """
        params = {'desc': desc,
                  'page': page,
                  'size': size}
        return self.request(self.CONFIG_URL, 'get', params=params).json()

    def update(self, key, value=None, desc=None):
        """更新配置.

        Args:
            key:
            value:
            desc:

        Returns:

        """
        data = {
            'key': key,
            'value': value,
            'description': desc
        }
        return self.request(
            self.CONFIG_URL, 'post', data=data).json()

    def gift_query(self, query=None, page=1, size=25, style=0, state=-1, special=0):
        """礼物查询.

        Returns:

        """
        params = {
            'page_index': page,
            'page_size': size,
            'style': style,
            'state': state,
            'is_special': special,
            'query': query
        }
        return self.request(self.GIFT_URL, 'get', params=params).json()

    def gift_update(self, data):
        """礼物更新.

        Args:
            data:

        Returns:

        """
        return self.request(self.GIFT_URL, method='post', data=data).json()

    def gift_delete(self, data):
        """礼物删除.

        Args:
            data:

        Returns:

        """
        return self.request(self.GIFT_URL, method='delete', json=data).json()

    def ad_query(self, type=-1, page=1, size=25, query=''):
        """广告图片.

        Returns:

        """
        params = {
            'query': query,
            'type': type,
            'page_index': page,
            'page_size': size
        }
        return self.request(self.AD_URL, 'get', params=params).json()

    def ad_update(self, data):
        """广告更新.

        Returns:

        """
        return self.request(self.AD_URL, method='post', data=data).json()

    def ad_delete(self, data):
        """广告删除.

        Args:
            data:

        Returns:

        """
        return self.request(self.AD_URL, method='delete', json=data).json()

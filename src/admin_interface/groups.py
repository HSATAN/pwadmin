# -*- coding: utf-8 -*-
"""
sneaky 群组 SDK
"""
from __future__ import unicode_literals, absolute_import

from .common import BaseHandler


class Groups(BaseHandler):
    TOP_URL = '/admin/live/top2'
    LIVE_URL = '/admin/live/list'
    LIVE_CONCEAL_URL = '/admin/live/conceal2'
    LIVE_DEL_BACKGROUND_URL = '/admin/live/del_background2'
    LIVE_VOTE_URL = '/admin/live/vote2'
    LIVE_DEL_COVER_URL = '/admin/live/cover2'
    LIVE_SET_RATIO_URL = '/admin/live/set_ratio'
    LIVE_BLOCK_URL = '/admin/live/block2'
    LIVE_QUERY_INVALID_URL = '/admin/live/query_invalid2'
    LIVE_SPECIAL_ACTOR_URL = '/admin/account/special_actor'
    LIVE_UPDATE_LABEL = '/admin/live/update_live_label'
    LIVE_DELETE_TOPIC = '/admin/live/update_live_topic'

    def live_top(self, params):
        """ 直播置顶

        Args:
            params(dict):
              - live_id(str): 直播ID
              - cancel(int): 置顶状态 0 置顶 1 撤回

        Returns:

        """
        return self.request(self.TOP_URL, 'post', params=params).json()

    def live(self, params):
        return self.request(self.LIVE_URL, 'get', params=params).json()

    def live_set_conceal(self, params):
        """ 直播间屏蔽

        Args:
            params(dict):
                - live_id: 直播ID
                - cancel: 屏蔽状态 0 屏蔽 1 解除屏蔽

        Returns:

        """

        return self.request(self.LIVE_CONCEAL_URL, 'post', params=params).json()

    def live_del_background_img(self, params):
        """直播间删除背景图

        Args:
            params(dict):
                - tuid: 用户陪我号
                - live_id: 直播ID

        Returns:

        """
        return self.request(self.LIVE_DEL_BACKGROUND_URL, 'post', params=params).json()

    def live_vote(self, params):
        """直播间投票

        Args:
            params(dict):
                - tuid: 用户陪我号
                - label_id: 标签ID
                - value: 票数

        Returns:

        """
        return self.request(self.LIVE_VOTE_URL, 'post', params=params).json()

    def live_del_cover(self, params):
        """直播间删除封面图

        Args:
            params(dict):
                - tuid: 用户陪我号
                - live_id: 直播ID

        Returns:

        """
        return self.request(self.LIVE_DEL_COVER_URL, 'delete', json=params).json()

    def live_set_ratio(self, params):
        """修改权限系数/修改机器人系数

        Args:
            params(dict):
                - tuid: 用户陪我号
                - live_id: 直播ID
                - ratio: 权限值系数
                - robot_ratio: 机器人系数

        Returns:

        """
        return self.request(self.LIVE_SET_RATIO_URL, 'post', params=params).json()

    def live_block(self, params):
        """直播间禁播1小时

        Args(dict):
            params:
                - tuid: 用户陪我号
                - live_id: 直播ID

        Returns:

        """
        return self.request(self.LIVE_BLOCK_URL, 'post', params=params).json()

    def live_query_invalid(self, params):
        """直播间查看可以用户

        Args:
            params(dict):
                - live_id: 直播ID

        Returns:

        """
        return self.request(self.LIVE_QUERY_INVALID_URL, 'get', params=params).json()

    def live_special_actor(self, params):
        """直播间声优切换

        Args:
            params(dict):
                - tuid: 用户陪我号
                - is_special: 是否为特殊声优 0 普通声优 1 特殊声优

        Returns:

        """
        return self.request(self.LIVE_SPECIAL_ACTOR_URL, 'post', params=params).json()

    def live_update_label(self, params):
        """直播间修改标签

        Args:
            params(dict):
                - live_id: 直播ID
                - main_label_id: 主标签ID
                - sub_label_id:  子标签ID

        Returns:

        """
        return self.request(self.LIVE_UPDATE_LABEL, 'post', params=params).json()

    def live_del_topic(self, params):
        """删除直播间主题

        Args:
            params(dict):
                - live_id: 直播ID

        Returns:

        """
        return self.request(self.LIVE_DELETE_TOPIC, 'post', params=params).json()

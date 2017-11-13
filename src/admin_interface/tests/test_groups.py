# -*- coding: utf-8 -*-

from unittest import TestCase
from ..groups import Groups
from ..account import Account


class GroupsTestCase(TestCase):
    def test_live_top(self):
        # 直播置顶
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_top(params={'live_id': '511_1510223669_live', 'cancel': 1})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_set_conceal(self):
        # 屏蔽直播间
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_set_conceal(params={'live_id': '511_1510223669_live', 'cancel': 0})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_del_background(self):
        # 直播间删除背景图
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_del_background_img(params={'tuid': 511, 'live_id': '511_1510223669_live'})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_vote(self):
        # 投票
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_vote(params={'tuid': 511, 'label_id': 11, 'value': 1})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_del_cover(self):
        # 直播间删除封面图
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_del_cover(params={'tuid': 511, 'live_id': '511_1510223669_live'})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_set_ratio(self):
        # 修改直播间权限系数/修改直播间机器人系数
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_set_ratio(params={'tuid': 511, 'live_id': '511_1510278872_live', 'ratio': 4,
                                               'robot_ratio': 2})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_block(self):
        # 直播间禁播1小时
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_block(params={'tuid': 511, 'live_id': '511_1510223669_live'})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_query_invalid(self):
        # 直播间查看可疑用户
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_query_invalid(params={'live_id': '511_1510278872_live'})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_special_actor(self):
        # 直播间声优切换
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_special_actor(params={'tuid': 511, 'is_special': 1})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_update_label(self):
        # 直播间修改标签
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_update_label(params={'live_id': '511_1510278469_live',
                                                  'main_label_id': 14, 'sub_label_id': 31})
        self.assertDictContainsSubset({'code': 0}, result)

    def test_live_delete_topic(self):
        # 删除直播标签
        host = 'http://172.16.10.134:9090'
        resp = Account.login('991', '222222', host)
        token = resp['token']
        groups = Groups(host=host, user=None, token=token)
        result = groups.live_del_topic(params={'live_id': '511_1510278872_live'})
        self.assertDictContainsSubset({'code': 0}, result)

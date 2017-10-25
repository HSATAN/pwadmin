# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
import requests


class Account(object):
    VERIFY_USER = '/admin/account/verifyuser'
    QUERY_USER = '/admin/userinfo/user_query'

    def __init__(self, host='http://172.16.10.134:9090'):
        self.host = host

    def generate_url(self, url):
        return "{}{}".format(self.host, url)

    def verify_user(self, uid, password):
        url = self.generate_url(self.VERIFY_USER)
        resp = requests.post(url, data={"uid": uid, 'password': password})
        return resp.json()

    def query(self, **kwargs):
        """

        Args:
            tuid(int): 	用户uid.
            uids(str): 字符串分隔的多个uid
            page_index(int): 页数
            page_size(int): 每页记录数，默认10
            begin_time(str): 开始时间（注册时间)
            end_time(str): 结束时间（注册时间)
            order(int): 排序方式 1:注册时间，2:登录时间，3:喜欢数，4:被喜欢数，5:投喂，6:收获
            gender(int): 性别 1:男 2:女 -1:全部（默认值）
            name(str): 用户名称（模糊匹配）
            phone(str): 手机号
            stat_priority(int): 统计优先 0：否，1：是
            like_begin(int): 喜欢数最小值
            like_end(int): 喜欢数最大值
            liked_begin(int): 被喜欢数最小值
            liked_end(int): 被喜欢数最大值
            paid_begin(int): 投喂最小值
            paid_end(int): 投喂最大值
            income_begin(int): 收获最小值
            income_end(int): 收获最大值
        Returns:

        """
        PARAMS = {
            'tuid': None,
            'uids': None,
            'page_index': None,
            'page_size': None,
            'begin_time': None,
            'end_time': None,
            'order': None,
            'gender': None,
            'name': None,
            'phone': None,
            'stat_priority': None,
            'like_begin': None,
            'like_end': None,
            'liked_begin': None,
            'liked_end': None,
            'paid_begin': None,
            'paid_end': None,
            'income_begin': None,
            'income_end': None
        }
        params = {}
        for k in kwargs:
            if k in PARAMS and params.get(k, None) is not None:
                params[k] = params.get(k)
        url = self.generate_url(self.QUERY_USER)
        resp = requests.get(url,  params=params)
        return resp.json()
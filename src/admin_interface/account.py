# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
import requests
from .common import BaseHandler, urljoin


class Account(BaseHandler):
    VERIFY_USER = '/admin/account/verifyuser'
    QUERY_USER = '/admin/userinfo/user_query'
    LOGIN = '/admin/account/login'
    ACCOUNT_LIST = '/admin/account/list'
    RESET_PASSWORDD_URL = '/admin/account/resetpassword2'
    CAPTCHA_QUERY = '/admin/captcha/query'
    PAYMENT_QUERY = '/admin/finance/query_new'
    SCORE_QUERY = '/admin/userinfo/score_ledger'
    RECORD_QUERY = '/admin/callrecord/query'

    @classmethod
    def verify_user(cls, uid, password, host=''):
        url = urljoin(host, cls.VERIFY_USER)
        resp = requests.post(url, data={"uid": uid, 'password': password})
        return resp.json()

    def list(self, query, size=10, page=1, order_by='uid'):
        return self.request(
            self.ACCOUNT_LIST,
            method='get',
            params={'query': query,
                    'size': size,
                    'page': page,
                    'order_by': order_by}
        ).json()

    def reset_password(self, password, tuid, note=''):
        """重置密码.

        Args:
            password(str):
            tuid(str):
            note(str):

        Returns:

        """
        return self.request(
            self.RESET_PASSWORDD_URL,
            'post',
            data={
                'password': password,
                'tuid': tuid,
                'note': note
            }
        ).json()

    @classmethod
    def login(cls, uid, password, host=''):
        url = urljoin(host, cls.LOGIN)
        resp = requests.post(url, data={'uid': uid, 'password': password})
        return resp.json()

    def query_user(self, **kwargs):
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
        return self.request(self.QUERY_USER,
                            'get',
                            params=params).json()

    def captcha(self, phone, page_index=1, page_size=25, state=None, captcha_type=None, begin_time=None, end_time=None):
        """

        Args:
            phone:
            page_index:
            page_size:
            state:
            captcha_type:
            begin_time:
            end_time:

        Returns:

        """
        resp = self.request(self.CAPTCHA_QUERY,
                            'get',
                            params={
                                'phone': phone,
                                'page_index': page_index,
                                'page_size': page_size,
                                'state': state,
                                'captcha_type': captcha_type,
                                'begin_time': begin_time,
                                'end_time': end_time})
        return resp.json()

    def payment(self, tuid, page_index=1, page_size=25, type='', begin_time=None, end_time=None):
        """收支查询.

        Args:
            tuid:
            page_index:
            page_size:
            type:
            begin_time:
            end_time:

        Returns:

        """

        resp = self.request(url=self.PAYMENT_QUERY,
                            method='get',
                            params={
                                'tuid': tuid,
                                'type': type,
                                'page_index': page_index,
                                'page_size': page_size,
                                'begin_time': begin_time,
                                'end_time': end_time})
        return resp.json()

    def score(self, tuid, page_index=1, page_size=25, type='', begin_time=None, end_time=None):
        """积分明细.

        Returns:

        """
        params = {
            'tuid': tuid,
            'page_index': page_index,
            'page_size': page_size,
            'type': type,
            'begin_time': begin_time,
            'end_time': end_time
        }
        return self.request(self.SCORE_QUERY, 'get', params=params).json()

    def record(self, uid=None, uid2=None, call_id=None, state=None, end_state=-1, call_type=-1, channel=-1,
               begin_time=None, end_time=None, page_index=1, page_size=25, ):
        """通话记录查询.

        Returns:

        """
        params = {
            'uid1': uid,
            'uid2': uid2,
            'status': state,
            'finish_state': end_state,
            'begin_time': begin_time,
            'end_time': end_time,
            'page_index': page_index,
            'page_size': page_size,
            'call_type': call_type,
            'channel': channel,
            'call_id': call_id
        }
        return self.request(self.RECORD_QUERY, 'get', params=params).json()

# -*- coding: utf-8 -*-
from admin_interface.common import BaseHandler
from strings import METHOD_GET
from django.conf import settings


class LabelManageInterface(BaseHandler):

    API_REQUEST = '/admin/feed/topic'
    """
    host    请求的ip
    API_REQUEST     请求的接口名
    begin_index     起始页
    page_size       每页显示多少条数据
    """
    def get_feed_topic(self, uid, begin_index, page_size):
        params = {'version': 9999,
                  'uid': uid,
                  'page_size': page_size,
                  'begin_index': begin_index,
                  "session_data": "81ded44dbc365b7f8e05be22c7ceee32"}
        url = self.generate_url(self.API_REQUEST)
        data = self.query_method(True, METHOD_GET, url, **params)
        return data


class LabelDynamicInterface(object):
    API_REQUEST = '/admin/feed/topicpub'

    def __init__(self, host='http://172.16.10.134:9090'):
        self.host = host


class ReportDynamicInterface(object):
    API_REQUEST = '/admin/feed/userpub'

    def __init__(self, host='http://172.16.10.134:9090'):
        self.host = host


class WhiteListInterface(object):
    API_REQUEST = '/admin/feed/pub/whitelist'

    def __init__(self, host='http://172.16.10.134:9090'):
        self.host = host


class FeedInterface(object):
    API_REQUEST = '/admin/feed/pub/query'

    def __init__(self, host='http://172.16.10.134:9090'):
        self.host = host

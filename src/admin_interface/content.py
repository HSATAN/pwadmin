# -*- coding: utf-8 -*-
from admin_interface.common import BaseHandler
from strings import METHOD_GET, METHOD_POST
from django.conf import settings


class LabelManageInterface(BaseHandler):
    def get_feed_topic(self, api_request, begin_index, page_size):
        """
        标签管理
        Args:
            api_request:请求的api接口
            begin_index:起始页
            page_size:每页显示多少条数据

        Returns:
            A dict
            {
                "total": 19,
                "have_release": 0,
                "code": 0,
                "data": [
                    {
                        "count": 6,
                        "view_count": 4303,
                        "subtitle": "此标签用语auto_test",
                        "state": 0,
                        "content": "auto_test",
                        "creator_id": 1,
                        "create_time": "2017-04-05 16:00:48",
                        "real_count": 2,
                        "id": 594
                    },
                ],
                "current_time": 1507629185
            }

        Raises:
            pass
        """
        params = {'version': 9999,
                  'uid': 1,
                  'page_size': page_size,
                  'begin_index': begin_index,
                  "session_data": "81ded44dbc365b7f8e05be22c7ceee32"}
        url = self.generate_url(api_request)
        data = self.query_method(True, METHOD_GET, url, **params)
        print "data:", data
        return data

    def feed_topic_post(self, **kwargs):
        """
        query_method, api_request, tid, content, subtitle
        Args:
            query_method:请求sneaky接口的方式
            api_request:api接口名
            tid:标签id
            content:标签内容
            subtitle:标签标题

        Returns:

        """
        api_request = kwargs.pop('api_request')
        query_method = kwargs.pop('query_method')
        url = self.generate_url(api_request)
        data = self.query_method(True, query_method, url, **kwargs)
        return data


class LabelDynamicInterface(BaseHandler):
    API_REQUEST = '/admin/feed/topicpub'
    def get_topic_pub(self, uid, gender, page_size, page_index, version, end_time, begin_time, stat_priority, order):
        """
        Args:
            uid:
            gender:
            page_size:
            page_index:
            version:
            end_time:
            begin_time:
            stat_priority:
            order:
        args:{'uid': ['1'],
        'gender': ['-1'],
        'page_size': ['10'],
        'page_index': ['1'],
        'version': ['9999'],
        'end_time': [''],
        'begin_time': ['2017-10-04 00:00:00'],
        'stat_priority': ['0'],
        'order': ['1']},
        Returns:

        """


class ReportDynamicInterface(BaseHandler):
    API_REQUEST = '/admin/feed/userpub'
    pass


class WhiteListInterface(BaseHandler):
    API_REQUEST = '/admin/feed/pub/whitelist'
    pass


class FeedInterface(BaseHandler):
    API_REQUEST = '/admin/feed/pub/query'
    pass
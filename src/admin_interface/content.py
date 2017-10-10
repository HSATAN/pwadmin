# -*- coding: utf-8 -*-
from admin_interface.common import BaseHandler
from strings import METHOD_GET
from django.conf import settings


class LabelManageInterface(BaseHandler):

    API_REQUEST = '/admin/feed/topic'

    def get_feed_topic(self, uid, begin_index, page_size):
        """
        标签管理
        Args:
            uid:唯一标识
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
                  'uid': uid,
                  'page_size': page_size,
                  'begin_index': begin_index,
                  "session_data": "81ded44dbc365b7f8e05be22c7ceee32"}
        url = self.generate_url(self.API_REQUEST)
        data = self.query_method(True, METHOD_GET, url, **params)
        return data


class LabelDynamicInterface(BaseHandler):
    API_REQUEST = '/admin/feed/topicpub'
    pass


class ReportDynamicInterface(BaseHandler):
    API_REQUEST = '/admin/feed/userpub'
    pass


class WhiteListInterface(BaseHandler):
    API_REQUEST = '/admin/feed/pub/whitelist'
    pass


class FeedInterface(BaseHandler):
    API_REQUEST = '/admin/feed/pub/query'
    pass
# -*- coding: utf-8 -*-
import math
from six.moves.urllib_parse import urljoin
import requests
from requests import session
from functools import wraps


class BaseHandler(object):
    def __init__(self, host='http://172.16.10.134:9090', user=None, token=None):
        self.user = None
        self.host = host
        self.session = session()
        self.session.headers.update({"Authorization": "JWT {}".format(token)})

    def __del__(self):
        try:
            self.session.close()
        except TypeError:
            pass

    def request(self, url, method, params=None, data=None, **kwargs):
        """基础查询.

        Returns:

        """
        url = urljoin(self.host, url)
        resp = self.session.request(
            method=method,
            url=url,
            params=params,
            data=data,
            **kwargs
        )
        return resp.json()

    def query_method(self, auth=None, method='get', url='', **kwargs):
        url = urljoin(self.host, url)
        return getattr(self, method, self.not_implemented)(url, **kwargs)

    @wraps(requests.get)
    def get(self, url, params=None, **kwargs):
        return self.session.request('get', url, params=params, **kwargs)

    @wraps(requests.post)
    def post(self, url, data=None, json=None, **kwargs):
        return self.session.request('post', url=url, data=data, json=json, **kwargs)

    def not_implemented(self, **kwargs):
        raise NotImplementedError("")

    @staticmethod
    def get_page_list(begin_index, page_size, total):
        """
        分页
        Args:
            begin_index: 起始页，从0开始
            page_size: 每页显示多少条数据
            total: 总共多少条数据

        Returns:

        """
        pages_show = 5
        page_count = int(math.ceil(float(total) / page_size))
        mid = int(math.ceil(float(pages_show) / 2))
        if begin_index + 1 <= mid:
            page_from = 1
        elif begin_index + 1 >= page_count - pages_show + 1:
            page_from = page_count - pages_show + 1
        else:
            page_from = begin_index - mid + 2
        pages = []
        for count in range(page_from, page_from + 5):
            if count > page_count:
                continue
            if count <= 0:
                continue
            pages.append(count)
        return pages, page_count

    @staticmethod
    def get_left_right(page_now, page_count):
        page_left = page_now - 1
        if page_now == 1:
            page_left = 1
        page_right = page_now + 1
        if page_now == page_count:
            page_right = page_count
        return page_left, page_right

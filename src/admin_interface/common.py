# -*- coding: utf-8 -*-
import math
import time
import hashlib
from requests import request
from .strings import METHOD_GET
from urlparse import *


class BaseHandler(object):
    def __init__(self, host):
        self.host = host

    def generate_url(self, params):
        return "{}{}".format(self.host, params)

    @staticmethod
    def sign_request(method, path, params):
        keys = params.keys()
        keys.sort()
        params_list = []
        for key in keys:
            detail = params[key]
            if type(detail) is unicode:
                detail = detail.encode('utf-8')
            params_list.append('{}={}'.format(key, detail))
        params_str = ''.join(params_list)
        if type(params_str) is unicode:
            params_str = params_str.encode('utf-8')
        sign_src = '{}{}{}'.format(method, path, params_str)
        sign = hashlib.md5(sign_src).hexdigest().lower()
        return sign

    def query_method(self, auth, method, url, **kwargs):
        path = urlparse(url).path[1:]
        if auth:
            sign = self.sign_request(method, path, kwargs)
            kwargs.pop("session_data")
            kwargs["sign"] = sign
        if method == METHOD_GET:
            resp = request(method, url, params=kwargs)
        else:
            resp = request(method, url, data=kwargs)
        return resp.json()

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

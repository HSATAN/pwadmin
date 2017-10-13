# -*- coding: utf-8 -*-
import math
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
                detail = detail.decode().encode('utf-8')
            params_list.append('%s=%s' % (key, detail))
        params_str = ''.join(params_list)
        sign_src = ''.join((method, path, params_str))
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
        page_count = int(math.ceil(float(total) / page_size))
        mid = int(math.ceil(float(page_size) / 2))
        if begin_index in range(mid):
            page_from = 1
        else:
            if page_count - begin_index >= 2:
                page_from = begin_index - 1
            else:
                page_from = page_count - 4
        pages = []
        for count in range(page_from, page_from + 5):
            if count > page_count:
                continue
            pages.append(count)
        return pages, page_count

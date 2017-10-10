# -*- coding: utf-8 -*-
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
        params_str = ''.join([('%s=%s' % (key, params[key])) for key in keys])
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

# -*- coding: utf-8 -*-
import hashlib
import requests


class DataFromSneak(object):
    def __init__(self, host):
        self.host = host

    @staticmethod
    def generate_url(host, api):
        return "{}{}".format(host, api)

    @staticmethod
    def sign_request(method, path, params):
        keys = params.keys()
        keys.sort()
        params_str = ''.join([('%s=%s' % (key, params[key])) for key in keys])
        sign_src = ''.join((method, path, params_str))
        sign = hashlib.md5(sign_src).hexdigest().lower()
        return sign

    def query_method_get(self, method, path, params):
        url = self.generate_url(self.host, path)
        sign = self.sign_request(method, path[1:], params)
        params.pop("session_data")
        params["sign"] = sign
        resp = requests.get(url, params=params)
        return resp.json()

    def query_method_post(self, method, path, params):
        url = self.generate_url(self.host, path)
        sign = self.sign_request(method, path[1:], params)
        params.pop("session_data")
        params["sign"] = sign
        resp = requests.post(url, data=params)
        return resp.json()

# -*- coding: utf-8 -*-
import json
import requests
import hashlib


class LabelManageInterface(object):
    API_REQUEST = '/admin/feed/topic'

    def __init__(self, host='http://172.16.10.134:9090'):
        self.host = host

    def generate_url(self, url):
        return "{}{}".format(self.host, url)

    @staticmethod
    def sign_request(method, api_path, params):
        keys = params.keys()
        keys.sort()
        params_str = ''.join([('%s=%s' % (key, params[key])) for key in keys])
        sign_src = ''.join((method, api_path, params_str))
        sign = hashlib.md5(sign_src).hexdigest().lower()
        return sign

    def get_feed_topic(self, uid,  begin_index, page_size, path):
        path = 'admin/feed/topic'
        url = self.generate_url(self.API_REQUEST)
        params = {"uid": uid, "begin_index": begin_index, "page_size": page_size,
                  "session_data": "81ded44dbc365b7f8e05be22c7ceee32"}
        sign = self.sign_request('GET', path, params)
        params.pop("session_data")
        params["sign"] = sign
        resp = requests.post(url, data=params)
        return resp.json()


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

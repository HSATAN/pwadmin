# -*- coding: utf-8 -*-
from admin_interface.common import BaseHandler
from strings import METHOD_GET, METHOD_POST


class CommonInterface(BaseHandler):
    def query_sneaky(self, **kwargs):
        api_request = kwargs.pop('api_request')
        query_method = kwargs.pop('query_method')
        params_base = {
            'version': 9999,
            'uid': 1,
            "session_data": "81ded44dbc365b7f8e05be22c7ceee32"
        }
        params = dict(params_base.items() + kwargs.items())
        url = self.generate_url(api_request)
        data = self.query_method(True, query_method, url, **params)
        return data


class LabelManageInterface(BaseHandler):
    def get_feed_topic(self, api_request, begin_index, page_size):
        params = {'version': 9999,
                  'uid': 1,
                  'page_size': page_size,
                  'begin_index': begin_index,
                  "session_data": "81ded44dbc365b7f8e05be22c7ceee32"}
        url = self.generate_url(api_request)
        data = self.query_method(True, METHOD_GET, url, **params)
        return data

    def feed_topic_post(self, **kwargs):
        api_request = kwargs.pop('api_request')
        query_method = kwargs.pop('query_method')
        url = self.generate_url(api_request)
        data = self.query_method(True, query_method, url, **kwargs)
        return data


class LabelDynamicInterface(BaseHandler):
    API_REQUEST = '/admin/feed/topicpub'

    def get_topic_pub(self, api_request, **kwargs):
        if kwargs.get('state') == 4:
            kwargs['state'] = '2,3'
        params_base = {
            'version': 9999,
            'uid': 1,
            "session_data": "81ded44dbc365b7f8e05be22c7ceee32"
        }
        params = dict(params_base.items() + kwargs.items())
        url = self.generate_url(api_request)
        data = self.query_method(True, METHOD_POST, url, **params)
        return data

    def topic_pub_post(self, **kwargs):
        api_request = kwargs.pop('api_request')
        query_method = kwargs.pop('query_method')
        url = self.generate_url(api_request)
        data = self.query_method(True, query_method, url, **kwargs)
        return data


class SubmitDynamicInterface(BaseHandler):

    def get_user_pub(self, api_request, **kwargs):
        params_base = {
            'version': 9999,
            'uid': 1,
            "session_data": "81ded44dbc365b7f8e05be22c7ceee32"
        }
        params = dict(params_base.items() + kwargs.items())
        url = self.generate_url(api_request)
        data = self.query_method(True, METHOD_POST, url, **params)
        return data

    def submit_dynamic_post(self, **kwargs):
        api_request = kwargs.pop('api_request')
        query_method = kwargs.pop('query_method')
        url = self.generate_url(api_request)
        data = self.query_method(True, query_method, url, **kwargs)
        return data


class ReportDynamicInterface(BaseHandler):
    def get_feed_report(self, api_request, **kwargs):
        params_base = {
            'version': 9999,
            'uid': 1,
            "session_data": "81ded44dbc365b7f8e05be22c7ceee32"
        }
        params = dict(params_base.items() + kwargs.items())
        url = self.generate_url(api_request)
        data = self.query_method(True, METHOD_POST, url, **params)
        return data

    def report_dynamic_post(self, **kwargs):
        api_request = kwargs.pop('api_request')
        query_method = kwargs.pop('query_method')
        url = self.generate_url(api_request)
        data = self.query_method(True, query_method, url, **kwargs)
        return data


class WhiteListInterface(BaseHandler):
    API_REQUEST = '/admin/feed/pub/whitelist'

    def get_white_list(self, api_request):
        params = {
            'version': 9999,
            'uid': 1,
            "session_data": "81ded44dbc365b7f8e05be22c7ceee32"}
        url = self.generate_url(api_request)
        data = self.query_method(True, METHOD_GET, url, **params)
        return data

    def feed_pub_post(self, **kwargs):
        api_request = kwargs.pop('api_request')
        query_method = kwargs.pop('query_method')
        url = self.generate_url(api_request)
        data = self.query_method(True, query_method, url, **kwargs)
        return data


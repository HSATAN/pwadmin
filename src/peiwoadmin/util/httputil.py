#!/usr/bin/env python
# -*- coding: utf-8 -*-
# author:lewsan
import logging

import requests


def request_with_params(api_url, method='GET', timeout=5, params=None, **kwargs):
    # TODO 使用准备请求的方式
    kwargs['timeout'] = timeout
    try:
        if method.upper() == 'GET':
            response = requests.get(api_url, params=params, **kwargs)
        elif method.upper() == 'POST':
            response = requests.post(api_url, **kwargs)
        data = response.json()
        return data
    except Exception, e:
        logging.info('%s. %s %s with %s' % (e, method, api_url, kwargs))

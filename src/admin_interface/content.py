# -*- coding: utf-8 -*-
from copy import deepcopy
from admin_interface.common import BaseHandler
from strings import METHOD_GET, METHOD_POST
from admin_interface.strings import PAGE_SIZE


class CommonInterface(BaseHandler):
    def query_sneaky(self, **kwargs):
        api_request = kwargs.pop('api_request')
        query_method = kwargs.pop('query_method')
        data = self.query_method(True, query_method, api_request, **kwargs)
        return data

    def data_get(self, queries):
        backups = deepcopy(queries)
        page_size = int(queries.get('page_size', PAGE_SIZE))
        page_now = int(queries.get('page', 1))
        page_index = page_now - 1
        data = self.query_sneaky(**queries)
        page_list, page_count = self.get_page_list(page_index, page_size, data.get('total', 0))
        page_left, page_right = self.get_left_right(page_now, page_count)
        extends = {
            'page_count': page_count,
            'total_list': page_list,
            'page': page_now,
            'page_left': page_left,
            'page_right': page_right
        }
        extends = dict(backups.items() + extends.items())
        return data, extends
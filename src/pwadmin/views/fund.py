# -*- coding: utf-8 -*-
"""提现相关功能的开发.

"""
from __future__ import unicode_literals, absolute_import
import logging
import json
from django.http import JsonResponse
from contrib.views import LoginRequiredBaseView

logger = logging.getLogger(__file__)


class FUND(LoginRequiredBaseView):
    template = 'pwadmin/fund/list.html'

    def get_ajax(self, request, *args, **kwargs):
        params = dict(
            page=request.GET.get('page', 1),
            size=request.GET.get('size', 20),
            state=request.GET.get('state', None),
            query=request.GET.get('query', '') or None
        )
        resp = request.user.sdk.fund.query(params)
        return JsonResponse(resp)

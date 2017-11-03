# -*- coding: utf-8 -*-
import logging
from django.http import JsonResponse
from contrib.views import LoginRequiredBaseView

logger = logging.getLogger(__file__)


class Index(LoginRequiredBaseView):
    """配置管理.

    """
    template = 'pwadmin/config/list.html'

    def get_ajax(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"

        """
        key = request.GET.get('key', None)
        desc = request.GET.get('desc', None)
        page = request.GET.get('page', 1) or 1
        size = request.GET.get('size', 25) or 25
        user = request.user
        data = user.sdk.config.list(key, desc, page, size)
        return JsonResponse(data)


class AD(LoginRequiredBaseView):
    """

    """
    template = 'pwadmin/config/ad.html'

    def get_ajax(self, request, *args, **kwargs):
        _type = request.GET.get('type', -1) or -1
        page = request.GET.get('page', 1) or 1
        size = request.GET.get('size', 25) or 25
        user = request.user
        data = user.sdk.config.ad_query(type=_type, page=page, size=size)
        return JsonResponse(data)


class Gift(LoginRequiredBaseView):
    """

    """
    template = 'pwadmin/config/gift.html'

    def get_ajax(self, request, *args, **kwargs):
        query = request.GET.get('query', None) or None
        page = request.GET.get('page', 1) or 1
        size = request.GET.get('size', 25) or 25
        style = request.GET.get('style', None) or None
        state = request.GET.get('state', None) or None
        special = request.GET.get('special', None) or None
        user = request.user
        resp = user.sdk.config.gift(query=query, page=page, size=size, style=style, state=state, special=special)
        return JsonResponse(resp)

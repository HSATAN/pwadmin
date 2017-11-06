# -*- coding: utf-8 -*-
import logging
import json
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
        desc = request.GET.get('query', None)
        page = request.GET.get('page', 1) or 1
        size = request.GET.get('size', 25) or 25
        user = request.user
        data = user.sdk.config.list(desc=desc, page=page, size=size)
        return JsonResponse(data)

    def post(self, request, *args, **kwargs):
        key = request.POST.get('key', None)
        value = request.POST.get('value', None)
        description = request.POST.get('description', None)
        user = request.user
        resp = user.sdk.config.update(key=key, value=value, desc=description)
        return JsonResponse(resp)


class AD(LoginRequiredBaseView):
    """

    """
    template = 'pwadmin/config/ad.html'

    def get_ajax(self, request, *args, **kwargs):
        query = request.GET.get('query', None) or None
        _type = request.GET.get('type', -1) or -1
        page = request.GET.get('page', 1) or 1
        size = request.GET.get('size', 25) or 25
        user = request.user
        data = user.sdk.config.ad_query(query=query, type=_type, page=page, size=size)
        return JsonResponse(data)

    def post(self, request, *args, **kwargs):
        POST = json.loads(request.body)
        id = POST.get('id')
        title = POST.get('title')
        image_url = POST.get('image_url')
        link_url = POST.get('link_url')
        target_url = POST.get('target_url')
        extra = POST.get('extra')
        state = POST.get('state')
        _type = POST.get('type')
        index = POST.get('index')
        redirect_route = POST.get('redirect_route')
        tuid = POST.get('tuid')

        user = request.user
        data = {
            'id': id,
            'title': title,
            'image_url': image_url,
            'link_url': link_url,
            'target_url': target_url,
            'extra': extra,
            'state': state,
            'type': _type,
            'index': index,
            'redirect_route': redirect_route,
            'tuid': tuid
        }
        data = user.sdk.config.ad_update(data)
        return JsonResponse(data)

    def delete(self, request, *args, **kwargs):
        body = json.loads(request.body)
        _id = body.get('id')

        resp = request.user.sdk.config.ad_delete(data={'id': _id})
        return JsonResponse(resp)

    def put(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)


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

# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from contrib.views import LoginRequiredBaseView


class Statistic(View):
    template = 'pwadmin/statistic/index.html'

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class Wildcat(LoginRequiredBaseView):
    """匿名聊正在匹配的用户.

    """
    template = 'pwadmin/statistic/wildcat.html'

    def get_ajax(self, request, *args, **kwargs):
        resp = request.user.sdk.statistic.wildcat()
        return JsonResponse(resp)

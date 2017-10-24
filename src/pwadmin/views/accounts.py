# -*- coding: utf-8 -*-
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import View

from contrib.views import BaseView
from utils.sdk import SneakSDK

class Accounts(View):
    """用户-基础信息-注册用户.
    """
    template = 'pwadmin/accounts/register_user.html'
    account = SneakSDK(host=settings.API_HOST).account

    def get(self, request, *args, **kwargs):
        if request.path_info == reverse_lazy('pwadminAPI:accounts'):
            return self.get_api(request, *args, **kwargs)
        return self.get_template(request, *args, **kwargs)

    def get_api(self, request, *args, **kwargs):
        """

        Args:
            request:
            *args:
            **kwargs:

        Returns:

        """
        data = self.account.query()
        return JsonResponse(data=data)

    def get_template(self, request, *args, **kwargs):
        return render(request, self.template)

    def post(self, request, *args, **kwargs):
        return render(request, self.template, context={})

    def reported(self, request, *args, **kwargs):
        pass



class ReportedUser(BaseView):
    template = 'pwadmin/accounts/reported.html'

    def get_ajax(self, request, *args, **kwargs):
        pass

    def get_template(self, request, *args, **kwargs):
        return render(request, self.template, {})


class ResetPassword(BaseView):
    template = 'pwadmin/accounts/resetpassword.html'

    def get_ajax(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"
        paths:
          /accounts/password/:
            get:
              parameters:
                - name: query
                  in: query
                  required: true
                  description: |
                    the search field.
                  schema:
                    type: string
                - name: size
                  in: query
                  default: 10
                  description: page size
                  schema:
                    type: integer
                - name: page
                  in: query
                  default: 1
                  description: page
                  schema:
                    type: integer
                - name: order_by
                  in: query
                  default: uid
                  description: default order
                  schema:
                    type: string
              responses:
                '200':
                  content:
                    application/json:
        """
        query = request.GET.get('query')
        size = request.GET.get('size', '10')
        page = request.GET.get('page', '1')
        order_by = request.GET.get('order_by', 'uid')
        data = SneakSDK(host=settings.API_HOST, user=request.user).account.list(query, size=size, page=page, order_by=order_by)
        return JsonResponse(data)

    def get_template(self, request, *args, **kwargs):
        return render(request, self.template, {})

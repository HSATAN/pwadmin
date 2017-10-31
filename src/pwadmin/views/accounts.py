# -*- coding: utf-8 -*-
import math
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.urls import reverse_lazy
from django.views.generic import View
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from pwadmin import models as pwa_models
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


class AccountList(BaseView):
    """获取用户列表, 之所以不使用Accounts, 是因为使用了新的api.
    之后api统一了在移除之.

    """

    @method_decorator(login_required)
    def get_ajax(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"
        paths:
          /account/list/:
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
        data = SneakSDK(host=settings.API_HOST, user=request.user).account.list(query, size=size, page=page,
                                                                                order_by=order_by)
        return JsonResponse(data)


class ReportedUser(BaseView):
    template = 'pwadmin/accounts/reported.html'

    def get_ajax(self, request, *args, **kwargs):
        pass

    def get_template(self, request, *args, **kwargs):
        return render(request, self.template, {})


class ResetPassword(BaseView):
    template = 'pwadmin/accounts/resetpassword.html'

    @method_decorator(login_required)
    def post(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"
        paths:
          /account/password/:
            post:
              parameters:
                - name: password
                  in: query
                  required: true
                  description: |
                    the new password .
                  schema:
                    type: string
                - name: tuid
                  in: query
                  required: true
                  description: which user
                  schema:
                    type: string
                - name: note
                  in: query
                  default: ''
                  description: note
                  schema:
                    type: string
              responses:
                '200':
                  content:
                    application/json:
        """
        tuid = request.POST.get('tuid')
        assert tuid
        password = request.POST.get('password')
        assert password
        note = request.POST.get('note', '')
        resp = SneakSDK(host=settings.API_HOST, user=request.user).account.reset_password(password, tuid, note)
        return JsonResponse(resp)

    @method_decorator(login_required)
    def get_template(self, request, *args, **kwargs):
        return render(request, self.template, {})


class MessageManagement(BaseView):
    """系统消息管理.

    """
    template = 'pwadmin/accounts/messages.html'

    @method_decorator(login_required)
    def get_template(self, request, *args, **kwargs):
        return render(request, self.template, {})

    @method_decorator(login_required)
    def get_ajax(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"
        paths:
          /api/v1/pwadmin/account/messages/:
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
              responses:
                '200':
                  content:
                    application/json:
        """
        query = request.GET.get('query', '')
        size = request.GET.get('size', 20)
        page = request.GET.get('page', 1) or 1
        if not query:
            object_list = pwa_models.PwMessage.objects.all().order_by('-id')
        else:
            object_list = pwa_models.PwMessage.objects.filter(name__contains=query).order_by('-id')
        paginator = Paginator(object_list, size)
        try:
            object_list = paginator.page(page)
        except PageNotAnInteger:
            object_list = paginator.page(1)
        except EmptyPage:
            object_list = paginator.page(paginator.num_pages)
        return JsonResponse({
            'code': 0,
            'page': page,
            'data': [obj.to_dict() for obj in object_list],
            'total': math.ceil(object_list.paginator.count / float(size))
        })



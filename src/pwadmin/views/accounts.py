# -*- coding: utf-8 -*-
import math
import logging
from datetime import timedelta, date
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.urls import reverse_lazy
from django.views.generic import View
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from pwadmin import models as pwa_models
from contrib.views import BaseView

logger = logging.getLogger(__file__)


class Accounts(View):
    """用户-基础信息-注册用户.
    """
    template = 'pwadmin/accounts/register_user.html'

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
        data = request.user.sdk.account.query_user()
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
        data = request.user.sdk.account.list(query, size=size, page=page,
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
        resp = request.user.sdk.account.reset_password(password, tuid, note)
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


class CaptchaList(BaseView):
    """用户数据查询-验证码查询.

    """
    template = 'pwadmin/accounts/captcha-list.html'

    @method_decorator(login_required)
    def get_template(self, request, *args, **kwargs):
        return render(request, self.template, {})

    @method_decorator(login_required)
    def get_ajax(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"
        info:
          title: 验证码查询
          version: v1
        paths:
          /api/v1/pwadmin/account/captcha/:
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
                - name: state
                  in: query
                  default: None
                  description: 验证码审核状态.
                  schema:
                    type: integer
                - name: captcha_type
                  in: query
                  default: None
                  description: 验证码类型
                  schema:
                    type: integer
                - name: begin_time
                  in: query
                  default: 1
                  description: 修改时间的上限
                  schema:
                    type: string
                - name: end_time
                  in: query
                  default: 1
                  description: 修改时间的下限
                  schema:
                    type: string
              responses:
                '200':
                  content:
                    application/json:
        """
        query = request.GET.get('query')
        size = request.GET.get('size', 25) or 25
        page = request.GET.get('page', 1) or 1
        state = request.GET.get('state', None)
        captcha_type = request.GET.get('type', None)
        begin_time = request.GET.get('begin_time', None)
        end_time = request.GET.get('end_time', None)

        data = request.user.sdk.account.captcha(
            phone=query, page_index=page, page_size=size, state=state,
            captcha_type=captcha_type, begin_time=begin_time, end_time=end_time
        )
        return JsonResponse(data)


class BaseQueryList(BaseView):
    TIME_FORMAT = "%Y-%m-%d %H:%M:%S"

    def process_date(self, _date):
        """

        Args:
            _date:

        Returns:

        """
        # 无时间约束.

        if _date == '':
            return '', ''
        end_day = date.today() + timedelta(1)
        try:
            _date = int(_date)
        except TypeError as e:
            logger.warning(str(e))
            return '', ''

        begin_day = end_day + timedelta(-_date)
        return begin_day.strftime(self.TIME_FORMAT), end_day.strftime(self.TIME_FORMAT)

    @method_decorator(login_required)
    def get_template(self, request, *args, **kwargs):
        return render(request, self.template, {})


class PaymentList(BaseQueryList):
    """用户数据查询-雁阵吗查询.

    """

    template = 'pwadmin/accounts/payment-list.html'

    @method_decorator(login_required)
    def get_ajax(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"

        """
        tuid = request.GET.get('query')
        type = request.GET.get('type', '')
        date = request.GET.get('date', '')
        begin_time, end_time = self.process_date(date)
        data = request.user.sdk.account.payment(
            tuid, type=type, begin_time=begin_time, end_time=end_time)
        return JsonResponse(data)


class ScoreList(BaseQueryList):
    """用户数据查询-雁阵吗查询.

    """
    template = 'pwadmin/accounts/score-list.html'

    @method_decorator(login_required)
    def get_ajax(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"

        """
        tuid = request.GET.get('query')
        type = request.GET.get('type', '')
        date = request.GET.get('date', '')
        page_index = request.GET.get('page_index', 1) or 1
        page_size = request.GET.get('page_size', 25) or 25
        begin_time, end_time = self.process_date(date)
        data = request.user.sdk.account.score(
            tuid, page_index=page_index, page_size=page_size, type=type, begin_time=begin_time, end_time=end_time)
        return JsonResponse(data)


class RecordList(BaseQueryList):
    """用户数据查询-通话记录查询.

    """
    template = 'pwadmin/accounts/record-list.html'

    @method_decorator(login_required)
    def get_ajax(self, request, *args, **kwargs):
        """
        openapi: "3.0.0"

        """
        uid1 = request.GET.get('uid', None)
        uid2 = request.GET.get('uid2', None)
        state = request.GET.get('state', None)
        end_state = request.GET.get('end_state', None) or -1
        date = request.GET.get('date', '')
        page_index = request.GET.get('page_index', 1) or 1
        page_size = request.GET.get('page_size', 25) or 25
        call_type = request.GET.get('call_type', None) or -1
        channel = request.GET.get('channel', None) or -1
        call_id = request.GET.get('call_id', None) or 0
        begin_time, end_time = self.process_date(date)
        data = request.user.sdk.account.record(
            uid=uid1, uid2=uid2, state=state, page_index=page_index, page_size=page_size,
            end_state=end_state, call_type=call_type, channel=channel, call_id=call_id,
            begin_time=begin_time, end_time=end_time)
        return JsonResponse(data)

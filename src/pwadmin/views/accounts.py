# -*- coding: utf-8 -*-
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import View

from contrib.views import BaseView
from utils.sdk import sneakSDK


class Accounts(View):
    """用户-基础信息-注册用户.
    """
    template = 'pwadmin/accounts/register_user.html'
    account = sneakSDK.account

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

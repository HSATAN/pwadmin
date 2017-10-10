# -*- coding: utf-8 -*-
import requests
from django.conf import settings
from django.shortcuts import render
from django.views.generic import View
from utils.sdk import sneakSDK

class Accounts(View):
    """用户-基础信息-注册用户.
    """
    template = 'pwadmin/accounts/register_user.html'
    account = sneakSDK.account

    def get(self, request, *args, **kwargs):
        data = self.account.query()
        return render(request, self.template)

    def post(self, request, *args, **kwargs):
        return render(request, self.template, context={})

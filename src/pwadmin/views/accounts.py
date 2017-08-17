# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.generic import View

class Accounts(View):
    template = 'pwadmin/accounts/register_user.html'
    def get(self, request, *args, **kwargs):
        return render(request, self.template)
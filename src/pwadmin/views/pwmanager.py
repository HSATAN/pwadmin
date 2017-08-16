# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.generic import View

class SignIn(View):
    template = 'pwadmin/sign-in.html'
    def get(self, request, *args, **kwargs):
        return render(request, self.template, {})

    def post(self, request, *args, **kwargs):
        pass
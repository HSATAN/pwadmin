# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.conf import settings
from django.views.generic import View
from django.contrib.auth import authenticate, login
from django.contrib.auth import views as auth_view
from django.http import JsonResponse
from pwadmin.forms.pwmanager import SignInForm


class SignIn(View):
    template = 'pwadmin/sign-in.html'

    def get(self, request, *args, **kwargs):
        next = request.GET.get('next', '')
        if not next:
            next = settings.LOGIN_REDIRECT_URL
        return render(request, self.template, {'next': next})

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            form = SignInForm(data=request.POST)
            if form.is_valid():
                uid = form.cleaned_data['uid']
                password = form.cleaned_data['password']
                user = authenticate(request, uid=uid, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({
                        "code": 0
                    })
                return JsonResponse({
                    'code': 1,
                    'msg': '用户名或者密码错误'
                })
            else:
                return JsonResponse({
                    "code": 1,
                    'msg': form.errors.as_json()
                })
        else:
            pass



class LogoutView(auth_view.LogoutView):
    template_name = 'pwadmin/logged_out.html'
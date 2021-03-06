# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.contrib.auth import authenticate, login, logout as auth_logout
from django.contrib.auth import views as auth_view
from django.http import JsonResponse, HttpResponseRedirect
from pwadmin.forms.pwmanager import SignInForm
from admin_interface.account import Account
from django.conf import settings
from contrib.views import BaseView


class SignIn(BaseView):
    template = 'pwadmin/sign-in.html'

    def get_template(self, request, *args, **kwargs):
        next = request.GET.get('next', '')
        if not next:
            next = settings.LOGIN_REDIRECT_URL
        return render(request, self.template, {'next': next})

    def post_ajax(self, request, *args, **kwargs):
        form = SignInForm(data=request.POST)
        if form.is_valid():
            uid = form.cleaned_data['uid']
            password = form.cleaned_data['password']
            user = authenticate(request, uid=uid, password=password)
            if user is not None:
                token = Account.login(uid, password, host=settings.API_HOST)['token']
                user.set_sdk(token)
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


class LogoutView(auth_view.LogoutView):
    template_name = 'pwadmin/logged_out.html'

    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        user = request.user
        if hasattr(user, 'delete_token'):
            user.delete_token()
        auth_logout(request)
        next_page = self.get_next_page()
        if next_page:
            # Redirect to this page until the session has been cleared.
            return HttpResponseRedirect(next_page)
        return super(LogoutView, self).dispatch(request, *args, **kwargs)

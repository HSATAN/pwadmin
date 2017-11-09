# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
from django.http import JsonResponse


class BaseView(View):
    template = None
    func = None

    def get_template(self, request, *args, **kwargs):
        return render(request, self.template)

    def dispatch(self, request, *args, **kwargs):
        # Try to dispatch to the right method; if a method doesn't exist,
        # defer to the error handler. Also defer to the error handler if the
        # request method isn't on the approved list.

        method = request.method.lower()
        if not method in self.http_method_names:
            handler = self.http_method_not_allowed
        else:
            method = "{}_ajax".format(method) if request.is_ajax() else "{}_template".format(method)
            handler = getattr(self, method, getattr(self, request.method.lower(), self.http_method_not_allowed))
        return handler(request, *args, **kwargs)


class LoginRequiredBaseView(BaseView):
    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        # Try to dispatch to the right method; if a method doesn't exist,
        # defer to the error handler. Also defer to the error handler if the
        # request method isn't on the approved list.

        method = request.method.lower()
        if method not in self.http_method_names:
            handler = self.http_method_not_allowed
        else:
            method = "{}_ajax".format(method) if request.is_ajax() else "{}_template".format(method)
            handler = getattr(self, method, getattr(self, request.method.lower(), self.http_method_not_allowed))
        return handler(request, *args, **kwargs)


class BaseGroupsView(LoginRequiredBaseView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = user.sdk.common.query_sneaky(**request.POST.dict())
        return JsonResponse(data)
# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.views import View


class BaseView(View):
    template = None
    func = None

    def path_info(self):
        raise NotImplementedError("Need to be implement")

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

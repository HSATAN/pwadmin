# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from pwadmin.models.permissions import PwMenu
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class PWPermissions(View):
    template = 'pwadmin/permissions/base.html'

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class Menu(View):
    template = 'pwadmin/permissions/menu.html'
    model = PwMenu

    @staticmethod
    def format_to_int(astr, default=10):
        try:
            return int(astr)
        except ValueError as e:
            return default

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        items = self.format_to_int(request.GET.get('items', '25'), 25)
        page = self.format_to_int(request.GET.get('page', '50'), 50)
        menu_list = self.model.objects.all()
        paginator = Paginator(menu_list, items)
        try:
            menu_list = paginator.page(page)
        except EmptyPage:
            menu_list = paginator.page(paginator.num_pages)

        return render(request, self.template, {"object_list": menu_list})

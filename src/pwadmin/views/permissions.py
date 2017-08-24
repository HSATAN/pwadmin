# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.generic import View, ListView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from pwadmin.models.permissions import PwMenu, PwRole
from pwadmin.models.pwmanager import PwManager
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class PWPermissions(View):
    template = 'pwadmin/permissions/base.html'

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class MenuList(ListView):
    template_name = 'pwadmin/permissions/menu.html'
    model = PwMenu
    paginate_by = 50

    def get_context_data(self, **kwargs):
        context = super(MenuList, self).get_context_data(**kwargs)
        context['nav_name'] = 'perm_menu'
        return context


class ManagerList(ListView):
    paginate_by = 50
    template_name = 'pwadmin/permissions/manager.html'
    model = PwManager

    def get_context_data(self, **kwargs):
        context = super(ManagerList, self).get_context_data(**kwargs)
        context['nav_name'] = 'perm_manager'
        return context


class GroupList(ListView):
    paginate_by = 50
    template_name = 'pwadmin/permissions/group_list.html'
    model = PwRole

    def get_context_data(self, **kwargs):
        context = super(GroupList, self).get_context_data(**kwargs)
        context['nav_name'] = 'perm_group'
        return context

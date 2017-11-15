# -*- coding: utf-8 -*-
import json
from django.shortcuts import render
from django.core.cache import cache
from django.views.generic import View, ListView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from pwadmin.models.permissions import PwMenu, PwRole
from pwadmin.models.pwmanager import PwManager


class PWPermissions(View):
    template = 'pwadmin/permissions/base.html'

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        return render(request, self.template)


class MenuList(ListView):
    template_name = 'pwadmin/permissions/menu.html'
    model = PwMenu
    ordering = 'no'
    paginate_by = 50

    def get_context_data(self, **kwargs):
        context = super(MenuList, self).get_context_data(**kwargs)
        context['nav_name'] = 'perm_menu'
        return context


class ManagerList(ListView):
    ordering = 'id'
    paginate_by = 50
    template_name = 'pwadmin/permissions/manager.html'
    model = PwManager

    def get_context_data(self, **kwargs):
        context = super(ManagerList, self).get_context_data(**kwargs)
        context['nav_name'] = 'perm_manager'
        return context


class GroupList(ListView):
    ordering = 'name'
    paginate_by = 50
    template_name = 'pwadmin/permissions/group_list.html'
    model = PwRole

    def get_context_data(self, **kwargs):
        context = super(GroupList, self).get_context_data(**kwargs)
        context['nav_name'] = 'perm_group'
        return context


class MenuTree(View):
    model = PwMenu
    template_name = 'pwadmin/permissions/menu_tree.html'

    def get(self, request, *args, **kwargs):
        key = 'perm_menu_tree'
        tree = cache.get(key)
        if not tree:
            tree = self.model.objects.tree()
            cache.set(key, tree, 24 * 60 * 60)
        return render(request, self.template_name, {'tree': json.dumps(tree, ensure_ascii=False),
                                                    'nav_name': 'perm_menu_tree'})

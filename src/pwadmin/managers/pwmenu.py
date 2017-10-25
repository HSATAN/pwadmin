# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Manager
from django.db.models.functions import Length


class PwMenuManager(Manager):
    def first_level_menu(self, order_by='no'):
        return self.annotate(no_len=Length('no')).filter(no_len=2).order_by(order_by)

    def tree(self, order_by='no'):
        """

        Args:
            order_by:

        Returns(dict):
           {tree_self_key(): {},
            tree_children_key(): {},
           }

        """
        children = {}
        first_level_menu = self.first_level_menu(order_by)
        for i in first_level_menu:
            children.update(i.tree(order_by))
        return {
            'menu': {
                self.model.tree_self_key(): {'id': 'menu',
                                             'name': '菜单',
                                             'checked': False},
                self.model.tree_children_key(): children}
        }

# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.db.models.functions import Length
from pwadmin.managers.pwmenu import PwMenuManager


class PwMenu(models.Model):
    no = models.CharField(unique=True, max_length=255)
    name = models.CharField(max_length=255, blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    state = models.SmallIntegerField()
    type = models.SmallIntegerField()
    is_leaf = models.SmallIntegerField()
    index = models.IntegerField()
    create_time = models.DateTimeField()
    objects = PwMenuManager()

    class Meta:
        managed = False
        db_table = 'pw_menu'

    def all_level_children(self, order_by='no'):
        no_len = len(self.no) + 2
        return PwMenu.objects.filter(no__startswith=self.no).annotate(no_len=Length('no')).filter(
            no_len=no_len).order_by(order_by)

    def tree(self, order_by='no'):
        """返回menu树。

        Args:
            order_by(field): - 排序的字段

        Returns(dict):
          - menu_tree: -
            {tree_id_key: {
                    tree_self_key: tree_self_content,
                    tree_children_key: {
                    }
            }
        """
        if not self.all_level_children().exists():
            return {self.tree_id_key: {self.tree_self_key: self.tree_self_content,
                                       self.tree_children_key: {}}}
        children = {}
        for child in self.all_level_children(order_by):
            children.update(child.tree(order_by))
        return {
            self.tree_id_key: {
                self.tree_self_key: self.tree_self_content,
                self.tree_children_key: children}
        }

    @property
    def tree_id_key(self):
        return str(self.no)

    @property
    def tree_self_key(self):
        return 'node'

    @property
    def tree_self_content(self):
        return {'id': self.no,
                'name': self.name,
                'checked': False}

    @property
    def tree_children_key(self):
        return 'children'

    def __str__(self):
        return "{}".format(self.no)

    def __unicode__(self):
        return "{}".format(self.no)


class PwRole(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    state = models.SmallIntegerField()
    create_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_role'

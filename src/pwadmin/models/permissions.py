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
        if not self.all_level_children().exists():
            return {'node': self,
                    'children': []}
        children = []
        for child in self.all_level_children(order_by):
            children.append(child.tree(order_by))
        return {
            'node': self,
            'children': children
        }

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

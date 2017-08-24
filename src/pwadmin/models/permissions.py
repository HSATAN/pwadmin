# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


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

    class Meta:
        managed = False
        db_table = 'pw_menu'


class PwRole(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    state = models.SmallIntegerField()
    create_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_role'
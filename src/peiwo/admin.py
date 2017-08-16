# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from . import models


@admin.register(models.PwManager)
class PwManagerAdmin(admin.ModelAdmin):
    list_display = ['id', 'uid', 'name', 'role']

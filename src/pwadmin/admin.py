# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models.pwmanager import PwManager

@admin.register(PwManager)
class PwManagerAdmin(admin.ModelAdmin):
    list_display = ['id', 'uid', 'name', 'role']
    search_fields = ['id', 'uid', 'name']
    list_filter = ['create_time']
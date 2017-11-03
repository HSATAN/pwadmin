# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from pwadmin import models
from .models.pwmanager import PwManager


@admin.register(PwManager)
class PwManagerAdmin(admin.ModelAdmin):
    list_display = ['id', 'uid', 'name', 'role']
    search_fields = ['id', 'uid', 'name']
    list_filter = ['create_time']


@admin.register(models.PwMessage)
class PwMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'message', 'status', 'update_time']
    search_fields = ['id', 'name']
    list_filter = ['status']


@admin.register(models.PwBatchSetting)
class PwPwBatchSettingAdmin(admin.ModelAdmin):
    pass

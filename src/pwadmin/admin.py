# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from . import models
from .models.pwmanager import PwManager

@admin.register(PwManager)
class PwManagerAdmin(admin.ModelAdmin):
    list_display = ['id', 'uid', 'name', 'role']

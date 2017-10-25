# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from django.conf import settings
from admin_interface import SneakSDK

sneakSDK = SneakSDK(settings.API_HOST)

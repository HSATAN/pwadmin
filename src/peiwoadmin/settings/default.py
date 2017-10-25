# -*- coding: utf-8 -*-
from .base import *

INSTALLED_APPS += [
]

MIDDLEWARE += [
]

INTERNAL_IPS = [
    '127.0.0.1'
]
CORS_ORIGIN_ALLOW_ALL = True


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'peiwo_admin',
        'USER': 'peiwo_admin',
        "PASSWORD": '77WN88wwc',
        "HOST": '172.16.10.133',

    },
    'test': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'peiwo',
        'USER': 'peiwo',
        "PASSWORD": '123456',
        "HOST": '172.16.10.134',

    },
}

API_HOST = 'http://172.16.10.134:9090'

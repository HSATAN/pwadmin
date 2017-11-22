# -*- coding: utf-8 -*-
from .base import *

INTERNAL_IPS = [
    '127.0.0.1'
]
CORS_ORIGIN_ALLOW_ALL = True

DATABASES = {
    'test': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'peiwo',
        'USER': 'peiwo',
        "PASSWORD": '123456',
        "HOST": '172.16.10.134',

    },
}

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': os.path.join(BASE_DIR, 'tmp', 'django_cache'),
        'TIMEOUT': None,
        'OPTIONS': {
            'MAX_ENTRIES': 100 * 100 * 100
        }
    }
}

API_HOST = 'http://172.16.10.134:9090'
# API_HOST = 'http://10.10.100.58:9090'

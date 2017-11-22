from .base import *
from peiwoadmin import secret

DEBUG = False

ALLOWED_HOSTS = ['newadmin.raybo.com']
SECRET_KEY = secret.SECRET_KEY

DATABASES = {
    'default': secret.DB_TEST,
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

API_HOST = 'http://peiwo.admin.api:9090'

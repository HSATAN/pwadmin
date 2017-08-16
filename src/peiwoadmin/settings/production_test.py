# -*- coding: utf-8 -*-
from .base import *

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
    #
    'SQLDB_DSN_SHARDS_1': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'sneaky',
        'USER': 'sneaky',
        "PASSWORD": '77WN88wwc',
        "HOST": 'pwhaproxy.tcp.single',
    },
    'SQLDB_DSN_SHARDS_2_W': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'sneaky',
        'USER': 'sneaky',
        "PASSWORD": '77WN88wwc',
        "HOST": 'pwhaproxy.tcp.single',
        'PORT': '5430'
    },
    'SQLDB_DSN_SHARDS_2_R': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'sneaky',
        'USER': 'sneaky',
        "PASSWORD": '77WN88wwc',
        "HOST": 'pwhaproxy.tcp.single',
        'PORT': '5429'
    },
    'SQLDB_DSN_SHARDS_3_W': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'sneaky',
        'USER': 'sneaky',
        "PASSWORD": '77WN88wwc',
        "HOST": 'pwhaproxy.tcp.single',
        "PORT": '5428'
    },
    'SQLDB_DSN_SHARDS_3_R': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'sneaky',
        'USER': 'sneaky',
        "PASSWORD": '77WN88wwc',
        "HOST": 'pwhaproxy.tcp.single',
        "PORT": '5427'
    },

    # BI 数据库配置
    "SQLDB_DSN_BI": {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'peiwo_bi',
        'USER': 'peiwo_bi',
        "PASSWORD": 'raybo123',
        "HOST": 'pwhaproxy.tcp.single',
    },

    # 系统数据库配置
    "SQLDB_DSN_CHANNEL": {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'channel',
        'USER': 'channel',
        "PASSWORD": 'channel',
        "HOST": '172.16.10.162',
        "PORT": 5434,
    }

}

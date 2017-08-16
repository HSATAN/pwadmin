# -*- coding: utf-8 -*-
from __future__ import unicode_literals


class PeiwoRouter(object):
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'peiwo':
            return 'test'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write auth models go to auth_db.
        """
        if model._meta.app_label == 'peiwo':
            return 'test'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the auth app is involved.
        """
        if obj1._meta.app_label == 'peiwo' or \
                        obj2._meta.app_label == 'peiwo':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'auth_db'
        database.
        """
        if app_label == 'peiwo':
            return db == 'test'
        return None
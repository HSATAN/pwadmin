# -*- coding: utf-8 -*-
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models
from django.core.cache import cache
from django.conf import settings


class PwManager(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.IntegerField()
    name = models.CharField(max_length=255)
    role = models.IntegerField(blank=True, null=True)
    state = models.IntegerField()
    create_time = models.DateTimeField()
    last_login = models.DateTimeField(null=True, blank=True, auto_now_add=True)

    def __str__(self):
        return "{}".format(self.name)

    def __unicode__(self):
        return "{}".format(self.name)

    @property
    def is_staff(self):
        return True

    @property
    def is_active(self):
        return True

    def has_module_perms(self, package_name):
        return True

    def has_perms(perm_list, obj=None):
        return True

    def has_perm(perm, obj=None):
        return True

    @property
    def token(self):
        return cache.get('user_token_{}'.format(self.uid))

    def set_token(self, token):
        cache.set('user_token_{}'.format(self.uid), token, settings.SESSION_COOKIE_AGE)

    def delete_token(self):
        cache.delete('user_token_{}'.format(self.uid))

    @property
    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return True

    class Meta:
        managed = False
        db_table = 'pw_manager'

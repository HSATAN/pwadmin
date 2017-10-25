# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.generic import View

class Task(View):
    template = 'pwadmin/task/task.html'
    def get(self, request, *args, **kwargs):
        return render(request, self.template)
# -*- coding: utf-8 -*-
import json
import time
from copy import deepcopy
from django.views.generic import View
from admin_interface.strings import PAGE_SIZE
from admin_interface.common import BaseHandler
from pwadmin.views.generic import BaseGroupsView
from django.shortcuts import render, HttpResponse
from admin_interface.strings import METHOD_GET, METHOD_POST


class LabelManage(BaseGroupsView):
    template = 'pwadmin/contents/label_manage.html'


class LabelDynamic(BaseGroupsView):
    template = 'pwadmin/contents/label_dynamic.html'


class SubmitDynamic(BaseGroupsView):
    template = 'pwadmin/contents/submit_dynamic.html'


class ReportDynamic(BaseGroupsView):
    template = 'pwadmin/contents/report_dynamic.html'


class WhiteList(BaseGroupsView):
    template = 'pwadmin/contents/whiteList.html'

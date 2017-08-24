# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class PwAdminLog(models.Model):
    id = models.BigAutoField(primary_key=True)
    admin_uid = models.BigIntegerField()
    user_uid = models.BigIntegerField()
    opera_type = models.SmallIntegerField(blank=True, null=True)
    opera_reason = models.SmallIntegerField(blank=True, null=True)
    raw_data = models.TextField(blank=True, null=True)
    change_content = models.TextField(blank=True, null=True)
    add_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_admin_log'


class PwApply(models.Model):
    id = models.BigAutoField(primary_key=True)
    type = models.IntegerField()
    apply_uid = models.BigIntegerField()
    audit_uid = models.BigIntegerField()
    uid = models.BigIntegerField()
    extra = models.TextField(blank=True, null=True)
    audit_time = models.DateTimeField(blank=True, null=True)
    state = models.IntegerField()
    note = models.TextField(blank=True, null=True)
    audit_state = models.IntegerField()
    audit_note = models.TextField(blank=True, null=True)
    create_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_apply'


class PwAuditUser(models.Model):
    uid = models.BigIntegerField(primary_key=True)
    state = models.IntegerField()
    create_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_audit_user'


class PwBatch(models.Model):
    id = models.BigAutoField(primary_key=True)
    batch_id = models.IntegerField()
    batch_name = models.CharField(max_length=255)
    batch_date = models.DateField()
    status = models.SmallIntegerField()
    begin_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    detail = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    answer = models.CharField(max_length=255, blank=True, null=True)
    create_time = models.DateTimeField(blank=True, null=True)
    question = models.CharField(max_length=255, blank=True, null=True)
    uid = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_batch'


class PwBatchSetting(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    state = models.IntegerField()
    create_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_batch_setting'


class PwCallRecords(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.BigIntegerField()
    tuid = models.BigIntegerField()
    charge = models.IntegerField()
    call_duration = models.IntegerField()
    money = models.IntegerField()
    start_time = models.DateTimeField()
    caller_app = models.CharField(max_length=255, blank=True, null=True)
    callee_app = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_call_records'


class PwCustomerFeedback(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.IntegerField()
    customer_uid = models.IntegerField(blank=True, null=True)
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255, blank=True, null=True)
    comment = models.CharField(max_length=255, blank=True, null=True)
    create_time = models.DateTimeField()
    update_time = models.DateTimeField(blank=True, null=True)
    customer_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_customer_feedback'


class PwCustomerManual(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.IntegerField()
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    create_time = models.DateTimeField()
    update_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_customer_manual'


class PwDayData(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateField()
    increase_user = models.IntegerField()
    increase_user_male = models.IntegerField()
    increase_user_female = models.IntegerField()
    active_user = models.IntegerField()
    active_user_male = models.IntegerField()
    active_user_female = models.IntegerField()
    all_user = models.IntegerField()
    all_user_male = models.IntegerField()
    all_user_female = models.IntegerField()
    friends_call_request_user = models.IntegerField()
    friends_call_request_user_male = models.IntegerField()
    friends_call_request_user_female = models.IntegerField()
    friends_call_request_count = models.IntegerField()
    friends_call_request_count_male = models.IntegerField()
    friends_call_request_count_female = models.IntegerField()
    wildcat_call_request_user = models.IntegerField()
    wildcat_call_request_user_male = models.IntegerField()
    wildcat_call_request_user_female = models.IntegerField()
    wildcat_call_request_count = models.IntegerField()
    wildcat_call_request_count_male = models.IntegerField()
    wildcat_call_request_count_female = models.IntegerField()
    friends_call_success_count = models.IntegerField()
    friends_call_success_count_male = models.IntegerField()
    friends_call_success_count_female = models.IntegerField()
    friends_call_success_user = models.IntegerField()
    friends_call_success_user_male = models.IntegerField()
    friends_call_success_user_female = models.IntegerField()
    wildcat_call_success_count = models.IntegerField()
    wildcat_call_success_count_male = models.IntegerField()
    wildcat_call_success_count_female = models.IntegerField()
    wildcat_call_success_user = models.IntegerField()
    wildcat_call_success_user_male = models.IntegerField()
    wildcat_call_success_user_female = models.IntegerField()
    friends_call_time_count = models.BigIntegerField()
    wildcat_call_time_count = models.BigIntegerField()
    add_time = models.DateTimeField()
    wildcat_call_request_count_signup_user = models.IntegerField(blank=True, null=True)
    wildcat_call_request_count_signup_user_male = models.IntegerField(blank=True, null=True)
    wildcat_call_request_count_signup_user_female = models.IntegerField(blank=True, null=True)
    friends_call_request_count_signup_user = models.IntegerField(blank=True, null=True)
    friends_call_request_count_signup_user_male = models.IntegerField(blank=True, null=True)
    friends_call_request_count_signup_user_female = models.IntegerField(blank=True, null=True)
    send_im_permission_count = models.IntegerField(blank=True, null=True)
    send_im_permission_count_male = models.IntegerField(blank=True, null=True)
    send_im_permission_count_female = models.IntegerField(blank=True, null=True)
    wildcat_apply_request_count = models.IntegerField(blank=True, null=True)
    wildcat_apply_request_count_male = models.IntegerField(blank=True, null=True)
    wildcat_apply_request_count_female = models.IntegerField(blank=True, null=True)
    wildcat_apply_request_user = models.IntegerField(blank=True, null=True)
    wildcat_apply_request_user_male = models.IntegerField(blank=True, null=True)
    wildcat_apply_request_user_female = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_day_data'


class PwImageFilter(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.BigIntegerField()
    image_name = models.TextField()
    result = models.IntegerField()
    add_time = models.DateTimeField()
    result_raw = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'pw_image_filter'



class PwMessage(models.Model):
    message = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    update_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_message'


class PwReport(models.Model):
    add_time = models.DateTimeField(blank=True, null=True)
    handle_time = models.DateTimeField(blank=True, null=True)
    handle_user = models.IntegerField(blank=True, null=True)
    reason = models.IntegerField(blank=True, null=True)
    result = models.IntegerField(blank=True, null=True)
    tuid = models.IntegerField(blank=True, null=True)
    uid = models.IntegerField(blank=True, null=True)
    wildcat = models.IntegerField(blank=True, null=True)
    message = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_report'


class PwRole(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    state = models.SmallIntegerField()
    create_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_role'


class PwRoleItem(models.Model):
    role_id = models.IntegerField()
    menu_id = models.IntegerField()
    create_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_role_item'
        unique_together = (('role_id', 'menu_id'),)


class PwStatisticLog(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.IntegerField()
    ip = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    statistic_version = models.CharField(max_length=255)
    statistic_date = models.DateField()
    statistic_data = models.CharField(max_length=255)
    update_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_statistic_log'
        unique_together = (('uid', 'statistic_date'),)


class PwTagClick(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.BigIntegerField()
    tag = models.SmallIntegerField()
    add_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_tag_click'


class PwUserExtend(models.Model):
    uid = models.BigIntegerField(primary_key=True)
    gender = models.SmallIntegerField(blank=True, null=True)
    report_count = models.IntegerField()
    quality = models.SmallIntegerField()
    refresh_data_time = models.DateTimeField(blank=True, null=True)
    add_time = models.DateTimeField()
    signin_time = models.DateTimeField(blank=True, null=True)
    last_login_time = models.DateTimeField(blank=True, null=True)
    status = models.SmallIntegerField(blank=True, null=True)
    dubious = models.IntegerField(blank=True, null=True)
    high_quality = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_user_extend'


class PwUserRole(models.Model):
    uid = models.IntegerField()
    role_id = models.IntegerField()
    create_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pw_user_role'
        unique_together = (('uid', 'role_id'),)


class PwUserTrace(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.IntegerField()
    login_time = models.DateTimeField(blank=True, null=True)
    logout_time = models.DateTimeField(blank=True, null=True)
    online_times = models.IntegerField(blank=True, null=True)
    sign = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'pw_user_trace'


class PwUserVerification(models.Model):
    id = models.BigAutoField(primary_key=True)
    add_time = models.DateTimeField(blank=True, null=True)
    camera_photo = models.CharField(max_length=255, blank=True, null=True)
    life_photo = models.CharField(max_length=255, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    uid = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_user_verification'


class PwUserWarning(models.Model):
    id = models.BigAutoField(primary_key=True)
    uid = models.IntegerField()
    tuid = models.IntegerField()
    reason = models.SmallIntegerField()
    days = models.SmallIntegerField()
    message = models.TextField(blank=True, null=True)
    add_time = models.DateTimeField()
    status = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'pw_user_warning'


class PwWeixinLog(models.Model):
    id = models.BigAutoField(primary_key=True)
    add_time = models.DateTimeField(blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    userid = models.BigIntegerField(blank=True, null=True)
    webid = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_weixin_log'


class PwWeixinUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    add_time = models.DateTimeField(blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    county = models.CharField(max_length=255, blank=True, null=True)
    headimgurl = models.CharField(max_length=255, blank=True, null=True)
    nickname = models.CharField(max_length=255, blank=True, null=True)
    openid = models.CharField(max_length=255, blank=True, null=True)
    province = models.CharField(max_length=255, blank=True, null=True)
    sex = models.IntegerField(blank=True, null=True)
    unionid = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_weixin_user'


class PwWildcatInfo(models.Model):
    id = models.BigAutoField(primary_key=True)
    caller = models.IntegerField()
    callee = models.IntegerField()
    caller_start_time = models.DateTimeField()
    callee_start_time = models.DateTimeField()
    call_start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    like_type = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'pw_wildcat_info'


class PwWildcatLike(models.Model):
    id = models.BigAutoField(primary_key=True)
    end_time = models.DateTimeField(blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    tuid = models.BigIntegerField(blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    uid = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_wildcat_like'


class PwWildcatMatchRecord(models.Model):
    id = models.BigAutoField(primary_key=True)
    end_time = models.DateTimeField(blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    tuid = models.BigIntegerField(blank=True, null=True)
    uid = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pw_wildcat_match_record'

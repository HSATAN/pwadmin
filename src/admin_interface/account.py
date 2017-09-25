import requests
import json


class Account(object):
    VERIFYUSER = '/admin/account/verifyuser'

    def __init__(self, host='http://172.16.10.134:9090'):
        self.host = host

    def generate_url(self, url):
        return "{}{}".format(self.host, url)

    def verify_user(self, uid, password):
        url = self.generate_url(self.VERIFYUSER)
        resp = requests.post(url, data={"uid": uid, 'password': password})
        return resp.json()

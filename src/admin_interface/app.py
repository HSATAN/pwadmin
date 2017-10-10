from .account import Account
from .content import LabelManage


class SneakSDK(object):
    def __init__(self, host="http://172.16.10.134:9090"):
        self.host = host
        self.account = Account(host)
        self.content = LabelManage(host)
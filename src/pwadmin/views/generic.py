# -*- coding: utf-8 -*-
import logging
from datetime import date, timedelta
from contrib.views import LoginRequiredBaseView

logger = logging.getLogger(__file__)


class BaseQueryList(LoginRequiredBaseView):
    TIME_FORMAT = "%Y-%m-%d %H:%M:%S"

    def process_date(self, _date):
        """

        Args:
            _date:

        Returns:

        """
        # 无时间约束.
        if _date == '':
            return '', ''
        if _date == 'specified':
            return '', ''
        end_day = date.today() + timedelta(1)
        try:
            _date = int(_date)
        except TypeError as e:
            logger.warning(str(e))
            return '', ''

        begin_day = end_day + timedelta(-_date)
        return begin_day.strftime(self.TIME_FORMAT), end_day.strftime(self.TIME_FORMAT)

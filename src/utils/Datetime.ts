import moment, { Moment } from 'moment-timezone';

export function mapTimezone(datetime: Date): Moment {
  const momentTzSever: Moment = moment.tz(datetime, 'Europe/London');
  const momentTzLocal: Moment = momentTzSever.clone().tz('Asia/Bangkok');

  return momentTzLocal;
}

export function formatFromDatetime(
  datetime: Date,
  format: string = 'DD MMM YYYY HH:mm',
): string {
  if (!datetime) {
    return '';
  }

  const momentTzLocal: Moment = mapTimezone(datetime);
  return momentTzLocal.format(format);
}

export const DatetimeUtils = {
  formatFromDatetime,
};

export default DatetimeUtils;

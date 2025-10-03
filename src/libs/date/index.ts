import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function today(format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs().format(format);
}

export function todayAsDate() {
  return dayjs().toDate();
}

export function addDays(date: Date | string, days: number) {
  return dayjs(date).add(days, 'day');
}

export function addDaysAsDate(date: Date | string, days: number): Date {
  return dayjs(date).add(days, 'day').toDate();
}

export function startOfDay(date: Date | string, format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs(date).startOf('day').format(format);
}

export function endOfDay(date: Date | string, format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs(date).endOf('day').format(format);
}

export function formatDay(date: Date | string, format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

export function startOfMonth(date: Date | string, format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs(date).startOf('month').format(format);
}

export function endOfMonth(date: Date | string, format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs(date).endOf('month').format(format);
}

export function daysInMonth(date: Date | string) {
  return dayjs(date).daysInMonth();
}

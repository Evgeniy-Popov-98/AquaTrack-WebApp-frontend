import { useSelector } from 'react-redux';
import { getDaysInMonth, getMonthName } from '../const/const.js';
import { selectCalendar } from '../redux/calendar/selector.js';

const isLeapYear = year => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const displayFebruaryDays = year => {
  return isLeapYear(year) ? 29 : 28;
};

export const useDateFC = () => {
  const currentDate = useSelector(selectCalendar);

  // Використовуємо Date без форматування, щоб уникнути помилок з інвалідними датами
  const date = new Date(currentDate);
  const locale = navigator.language;

  const monthName = getMonthName(date.getMonth());
  const month = date.getMonth();
  const numberOfMonth = date.getDate();
  const year = date.getFullYear();
  const daysInMonth = getDaysInMonth(date.getMonth(), year);

  return {
    currentDate: date.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    monthName,
    year,
    daysInMonth,
    month,
    numberOfMonth,
  };
};

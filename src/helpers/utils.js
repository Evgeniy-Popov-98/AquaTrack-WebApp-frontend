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
  const monthName = getMonthName(new Date(currentDate).getMonth());
  const month = new Date(currentDate).getMonth();
  const numberOfMonth = new Date(currentDate).getDate();
  const year = new Date(currentDate).getFullYear();
  const daysInMonth = getDaysInMonth(new Date(currentDate).getMonth(), year);
  return {
    currentDate,
    monthName,
    year,
    daysInMonth,
    month,
    numberOfMonth,
  };
};

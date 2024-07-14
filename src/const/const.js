import { displayFebruaryDays } from '../helpers/utils.js';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getMonthName = monthIndex => months[monthIndex];

export const getDaysInMonth = (monthIndex, year) => {
  switch (monthIndex) {
    case 1: // February
      return displayFebruaryDays(year);
    case 0: // January
    case 2: // March
    case 4: // May
    case 6: // July
    case 7: // August
    case 9: // October
    case 11: // December
      return 31;
    default:
      return 30;
  }
};

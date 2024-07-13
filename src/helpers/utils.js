const isLeapYear = year => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const displayFebruaryDays = year => {
  return isLeapYear(year) ? 29 : 28;
};

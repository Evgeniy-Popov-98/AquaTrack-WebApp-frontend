// формат даних для форми User-setting
export const DECIMAL_PATTERN = /^\d+(\.\d+)?$/;

export const convertingToNumber = str => {
  return Math.floor(parseFloat(str) * 10) / 10;
};

export const dailyWaterRecomendCalculation = (gender, weight, sport) => {
  if (!weight) return 1.5;
  if (!sport) sport = 0;
  const baseValue = gender === 'female' ? 0.03 : 0.04;
  const sportValue = gender === 'female' ? 0.4 : 0.6;
  return (weight * baseValue + sport * sportValue).toFixed(1);
};

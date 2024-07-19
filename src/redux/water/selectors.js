export const selectWaterDate = (state) => state.water.date;
export const selectWaterItemsOfDay = (state) => state.water.waterItemsOfDay;
export const selectWaterItemsOfMonthly = (state) => state.water.waterItemsOfMonthly;
export const selectAllWater = (state) => state.water.allWaterByDay;
export const selectLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectWater = (state) => state.water;
export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectToken = state => state.auth.accessToken;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectLoading = state => state.auth.loading;
export const selectError = state => state.auth.error;
export const selectUserAvatar = state => state.auth.user.avatar;

export const selectUser = state => state.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectToken = state => state.auth.accessToken;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsLoading = state => state.auth.loading;

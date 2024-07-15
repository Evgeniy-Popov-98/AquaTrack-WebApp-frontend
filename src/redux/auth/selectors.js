export const selectUser = state => state.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectToken = state => state.auth.token;
export const selectIsRefreshing = state => state.auth.isRefreshing;

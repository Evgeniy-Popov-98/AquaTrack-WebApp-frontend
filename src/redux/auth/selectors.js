export const selectUser = state => state.user.user;
export const selectIsSignedIn = state => state.user.isLoggedIn;
export const selectCurrentUser = state => state.user.isRefreshing;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectToken = state => state.auth.token;
export const selectIsRefreshing = state => state.auth.isRefreshing;

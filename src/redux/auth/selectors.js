export const selectUser = state => state.user.user;
export const selectIsSignedIn = state => state.user.isLoggedIn;
export const selectCurrentUser = state => state.user.isRefreshing;

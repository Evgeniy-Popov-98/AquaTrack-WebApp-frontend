import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  // const { isLoggedIn, isRefreshing } = useAuth();
  const { isLoggedIn } = useAuth();

  // const shouldRedirect = !isLoggedIn && !isRefreshing;
  const shouldRedirect = !isLoggedIn;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../redux/auth/selectors';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isRefreshing = useSelector(selectIsRefreshing);

  const shouldRedirect = isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

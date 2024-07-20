import { useEffect } from 'react';
import { useDispatch,
  useSelector 
} from 'react-redux';
import { refreshUser } from '../redux/auth/operations.js'; // Імпорт операції рефрешу
import { selectToken, selectIsRefreshing } from '../redux/auth/selectors.js'; // Імпорт селекторів

const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Отримуємо токен із Redux стейту
  const isRefreshing = useSelector(selectIsRefreshing); // Отримуємо стан рефрешу із Redux стейту

  useEffect(() => {
    // Якщо існує токен і не виконується процес рефрешу, викликаємо операцію рефрешу
    if (token && !isRefreshing) {
      dispatch(refreshUser());
    }
    }, [dispatch]);
};

export default useTokenRefresh;
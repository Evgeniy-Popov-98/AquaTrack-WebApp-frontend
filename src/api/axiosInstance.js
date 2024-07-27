import axios from 'axios';
import { store } from '../redux/store';
import { refreshUser } from '../redux/auth/operations';

export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, token = null) => {
  pendingRequests.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  pendingRequests = [];
};

instance.interceptors.request.use(
  async config => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Перевірка, чи URL запиту не є URL-ом оновлення токена, щоб уникнути рекурсії
    // const isRefreshUrl = originalRequest.url === '/users/refresh-tokens';  
    // && !isRefreshUrl

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        store.dispatch(refreshUser()).then(resultAction => {
          if (refreshUser.fulfilled.match(resultAction)) {
            setToken(resultAction.payload.accessToken);
            originalRequest.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
            processQueue(null, resultAction.payload.accessToken);
            resolve(instance(originalRequest));
          } else {
            clearToken();
            processQueue(resultAction.payload, null);
            reject(resultAction.payload);
          }
        })
        .catch(refreshError => {
          clearToken();
          processQueue(refreshError, null);
          reject(refreshError);
        })
        .finally(() => {
          isRefreshing = false;
        });
      });
    }

    return Promise.reject(error);
  }
);


// import axios from 'axios';
// import { store } from '../redux/store';
// import { refreshUser } from '../redux/auth/operations';

// export const instance = axios.create({
//   // baseURL: 'https://aquatrack-webapp-backend.onrender.com',
//     baseURL: 'http://localhost:3000',
//   withCredentials: true,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// export const setToken = token => {
//   instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearToken = () => {
//   instance.defaults.headers.common.Authorization = '';
// };

// instance.interceptors.request.use(
//   async config => {
//     const state = store.getState();
//     const token = state.auth.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !error.config._retry
//     ) {
//       error.config._retry = true;

//       try {
//         const state = store.getState();
//         const refreshToken = state.auth.accessToken;
//         if (refreshToken) {
//           const resultAction = await store.dispatch(refreshUser());
//           if (refreshUser.fulfilled.match(resultAction)) {
//             setToken(resultAction.payload.accessToken);
//             error.config.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
//             return instance.request(error.config);
//           } else {
//             clearToken();
//             return Promise.reject(resultAction.payload);
//           }
//         }
//       } catch (refreshError) {
//         clearToken();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

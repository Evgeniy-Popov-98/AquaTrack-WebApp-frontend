import axios from 'axios';
import { store } from '../redux/store';
import { refreshUser } from '../redux/auth/operations';

export const instance = axios.create({
  // baseURL: 'https://aquatrack-webapp-backend.onrender.com',
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};
// let refreshTokenRequest = null

instance.interceptors.request.use(
    async (config) => {
      const state = store.getState();
      const token = state.auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // if (config.url === "/users/refresh-tokens") {
      //   console.log('config.url: ', config.url);
      //   console.log('refreshTokenRequest: ', refreshTokenRequest);
      //   if (refreshTokenRequest === null) {
      //     console.log('запит: ', refreshTokenRequest);
      //     refreshTokenRequest = store.dispatch(refreshUser());
      //     console.log('refreshTokenRequest: ', refreshTokenRequest);
      //   }
      //   const res = await refreshTokenRequest
      //   console.log('res: ', res);
      //   refreshTokenRequest = null
        
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401 && !error.config._retry) {
        error.config._retry = true;
  
        try {
          const state = store.getState();
          const refreshToken = state.auth.accessToken;
          if (refreshToken) {
            const resultAction = await store.dispatch(refreshUser());
            if (refreshUser.fulfilled.match(resultAction)) {
              setToken(resultAction.payload.accessToken);
              error.config.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
              return instance.request(error.config);
            } else {
              clearToken();
              return Promise.reject(resultAction.payload);
            }
          }
        } catch (refreshError) {
          clearToken();
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

  // import axios from 'axios';
// import { store } from '../redux/store';
// import { refreshUser } from '../redux/auth/operations';

// export const instance = axios.create({
//   // baseURL: 'https://aquatrack-webapp-backend.onrender.com',
//   baseURL: 'http://localhost:3000',
//   withCredentials: true,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// export const setToken = (token) => {
//   instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearToken = () => {
//   instance.defaults.headers.common.Authorization = '';
// };

// let refreshTokenRequest = null;
// // let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// instance.interceptors.request.use(
//     async (config) => {
//       const state = store.getState();
//       const token = state.auth.accessToken;
//       if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//      }
//      if (config.url === "/users/refresh-tokens") {
//       if (!refreshTokenRequest) {
//         console.log('config.url: ', config.url);
//         refreshTokenRequest = store.dispatch(refreshUser())
//         .then((resultAction) => {
//           if (refreshUser.fulfilled.match(resultAction)) {
//             const newToken = resultAction.payload.accessToken;
//             setToken(newToken);
//             processQueue(null, newToken);
//             return newToken;
//           } else {
//             clearToken();
//             processQueue(resultAction.payload, null);
//             return Promise.reject(resultAction.payload);
//           }
//         })
//         .finally(() => {
//           refreshTokenRequest = null;
//           // isRefreshing = false;
//         });
//       }
//      }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
//   instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.response && error.response.status === 401 && !error.config._retry) {
//         error.config._retry = true;
  
//         try {
//           const state = store.getState();
//           const refreshToken = state.auth.accessToken;
//           if (refreshToken) {
//             const resultAction = await store.dispatch(refreshUser());
//             if (refreshUser.fulfilled.match(resultAction)) {
//               setToken(resultAction.payload.accessToken);
//               error.config.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
//               return instance.request(error.config);
//             } else {
//               clearToken();
//               return Promise.reject(resultAction.payload);
//             }
//           }
//         } catch (refreshError) {
//           clearToken();
//           return Promise.reject(refreshError);
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );

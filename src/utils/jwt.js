// import { getUnixTime } from './date.js';

// const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;

// export const isTokenExpired = (token) => {
//   if (!token) {
//     return true;
//   }

//   try {
//     // Декодуйте токен, якщо це JWT
//     const tokenInfoDecoded = window.atob(token.split('.')[1]);
//     const { exp, iat } = JSON.parse(tokenInfoDecoded);

//     // Час до закінчення токена
//     const tokenLeftTime = exp - getUnixTime();

//     // Мінімальний час життя токена для оновлення
//     const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER;

//     return tokenLeftTime < minLifeTimeForUpdate;
//   } catch (e) {
//     return true;
//   }
// };

import { getUnixTime } from "./date"

const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return true;
    }

    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const tokenInfoDecoded = JSON.parse(atob(base64));
    const { exp, iat } = tokenInfoDecoded;

    const tokenLeftTime = exp - getUnixTime();
    const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER;

    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (e) {
    return true;
  }
};

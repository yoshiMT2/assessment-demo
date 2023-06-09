import { tokenAtom, userAtom } from './atom';
import { getCookie } from "./cookies";
import { useAtom } from 'jotai';
import jwt_decode from 'jwt-decode';
import { LOGIN_ENDPOINT, FORGOT_ENDPOINT, REFRESH_ENDPOINT, RESET_ENDPOINT, BACKEND_URL } from "./constants";
import { Token, Decoded, User } from './type'

export const useLogin = () => {

  const csrftoken = getCookie("csrftoken");
  const login = async (email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": csrftoken!,
      },
      body: JSON.stringify({ email, password })
    };
    const resp = await fetch(LOGIN_ENDPOINT, requestOptions);
    const token = await resp.json()

    if (token) {
      localStorage.setItem("token", JSON.stringify(token))
      const decoded: Decoded = jwt_decode(token.access);
      const userId = decoded.user_id
      const resp = await fetch(`${BACKEND_URL}api/user/view/${userId}`, {
        headers: {
          'Authorization': `JWT ${token.access}`,
        }
      })
      const user: User = await resp.json()
      localStorage.setItem("user", JSON.stringify(user))
    }
  };
  return { login }
}

export const resetPassword = async (resetkey, newPassword) => {
  const payload = { "reset_secret": resetkey, "password": newPassword };
  const resp = await fetch(RESET_ENDPOINT);
  return resp;
};


async function refreshToken(token) {
  const response = await fetch(REFRESH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"refresh": token.refresh}),
  });
  if (response.ok) {
    const refreshedToken = await response.json();
    const newToken = {access: refreshedToken.access, refresh: token.refresh}
    localStorage.setItem("token", JSON.stringify(newToken))
    return refreshedToken.access
  } else if (response.status === 401) {
    window.location.href = '/login';
    return null
  }
}

export const requestWithTokenRefresh = async (url, options = {}) => {
  const tokenFromStorage = localStorage.getItem("token")
  const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null
  let response;
  if (token) {
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': 'JWT ' + token.access,
      }
    });
  } else {
    window.location.href = '/login';
  }
  if (response.status === 401) {
    const newToken = await refreshToken(token);
    if (newToken) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': 'JWT ' + newToken,
        }
      });
    }
  }
  return response;
}
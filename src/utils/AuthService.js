import { tokenAtom } from './atom';
import { getCookie } from "./cookies";
import { useAtom } from 'jotai';
import jwt_decode from 'jwt-decode';
import {
  LOGIN_ENDPOINT,
  FORGOT_ENDPOINT,
  RESET_ENDPOINT,
} from "./constants";


export const useLogin = () => {
  const [, setToken] = useAtom(tokenAtom)
  const csrftoken = getCookie("csrftoken");

  const login = async (email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ email, password })
    };
    console.log(LOGIN_ENDPOINT)
    const resp = await fetch(LOGIN_ENDPOINT, requestOptions);

    const token = await resp.json()
    console.log(token)
    if (token) {
      setToken(token)
      const decoded = jwt_decode(token);
      console.log(decoded)
      localStorage.setItem("userDetails", JSON.stringify(decoded));
    }
  };
  return { login }
}



export const sendLink = async (email) => {
  const payload = { email };
  const resp = await fetch(FORGOT_ENDPOINT, payload, {});
  return resp;
};

export const resetPassword = async (resetkey, newPassword) => {
  const payload = { "reset_secret": resetkey, "password": newPassword };
  const resp = await fetch(RESET_ENDPOINT, payload, {});
  return resp;
};

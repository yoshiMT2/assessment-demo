import { tokenAtom, userAtom } from './atom';
import { getCookie } from "./cookies";
import { useAtom } from 'jotai';
import jwt_decode from 'jwt-decode';
import { LOGIN_ENDPOINT, FORGOT_ENDPOINT, RESET_ENDPOINT, BACKEND_URL } from "./constants";
import { Token, Decoded, User } from './type'

export const useLogin = () => {
  const [, setAccessToken] = useAtom(tokenAtom)
  const [, setUser] = useAtom(userAtom)

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
    const token: Token = await resp.json()

    if (token) {
      setAccessToken(token.access)
      const decoded: Decoded = jwt_decode(token.access);
      const userId = decoded.user_id
      const resp = await fetch(`${BACKEND_URL}api/user/display/${userId}/`)
      const data: User = await resp.json()
      setUser(data)
    }
  };
  return { login }
}



export const sendLink = async (email) => {
  const payload = { email };
  const resp = await fetch(FORGOT_ENDPOINT);
  return resp;
};

export const resetPassword = async (resetkey, newPassword) => {
  const payload = { "reset_secret": resetkey, "password": newPassword };
  const resp = await fetch(RESET_ENDPOINT);
  return resp;
};

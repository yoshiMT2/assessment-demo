export const BACKEND_URL =
    // '__env__' in window ? window.__env__.BACKEND_URL : 'https://heartbeatdraft5-production.up.railway.app/';
    '__env__' in window ? window.__env__.BACKEND_URL : 'https://heartbeatdraft6auth-production.up.railway.app/';

export const LOGIN_ENDPOINT = BACKEND_URL + 'api/auth/jwt/create/'

export const REFRESH_ENDPOINT = BACKEND_URL + 'api/auth/jwt/refresh/'

export const VERIFY_ENDPOINT = BACKEND_URL + 'api/auth/jwt/verify/'

export const RESET_ENDPOINT = BACKEND_URL + 'api/password/reset/?'

export const FORGOT_ENDPOINT = BACKEND_URL + 'api/password/forgot/'

export const EVALUATION_ENDPOINT = BACKEND_URL + 'api/evaluations/'

export const ANSWER_ENDPOINT = BACKEND_URL + 'api/answer/'

export const SCORE_ENDPOINT = BACKEND_URL + 'api/score/'

export const TEAM_ENDPOINT = BACKEND_URL + 'api/score/team/list/'

export const MEMBER_ENDPOINT = BACKEND_URL + 'api/user/'

export const COMPANY_ENDPOINT = BACKEND_URL + 'api/company/'



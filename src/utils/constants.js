export const BACKEND_URL =
    // '__env__' in window ? window.__env__.BACKEND_URL : 'https://heartbeatdraft5-production.up.railway.app/';
    '__env__' in window ? window.__env__.BACKEND_URL : 'https://heartbeatdraft6auth-production.up.railway.app/';

export const LOGIN_ENDPOINT = BACKEND_URL + 'api/auth/jwt/create/'

export const REFRESH_ENDPOINT = BACKEND_URL + 'api/auth/jwt/refresh/'

export const VERIFY_ENDPOINT = BACKEND_URL + 'api/auth/jwt/verify/'

export const  RESET_ENDPOINT = BACKEND_URL + 'api/password/reset/?'

export const  FORGOT_ENDPOINT = BACKEND_URL + 'api/password/forgot/'

export const COMPANY_ENDPOINT = BACKEND_URL + 'api/company/'

export const TEAM_ENDPOINT = BACKEND_URL + 'api/team/'




export const QUESTIONS = [
  { id: 1, text: "このチームでは私の失敗が非難されがちだ" },
  { id: 2, text: "このチームでは私は言いたいことを我慢している" },
  { id: 3, text: "このチームでは自分の居場所がなく感じることがある" },
  { id: 4, text: "このチームでは私の個性が尊重されている" },
  { id: 5, text: "このチームでは私は周囲にも言いたいことを言わせている" },
  { id: 6, text: "このチームでは私はＨＥＬＰを出しにくい" },
  { id: 7, text: "このチームでは私は適度に挨拶をしている" },
  { id: 8, text: "私は自分の仕事に対する原動力が明らかになっている" },
  { id: 9, text: "私が自分が仕事において何を価値観として大事にしたいかが明らかになっている" },
  { id: 10, text: "私は自分のキャリアビジョンが描けている（短期的でもよい）" },
]

export const USER =  { id: 0, name: "自分" , group_id: 1, assessor_id:3}
export const DEFAULT_OPTION = { value: 0, label: "自分" }

export const MEMBERS = [
  { id: 1, name: "山田 太郎", group_id: 1, assessor_id: 2 },
  { id: 2, name: "田中 花子", group_id: 1, assessor_id: 4 },
  { id: 3, name: "所 ジョージ", group_id: 2, assessor_id: 1 },
  { id: 4, name: "今井 美樹", group_id: 2, assessor_id: 0 },
]
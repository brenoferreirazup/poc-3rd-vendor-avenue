const AVENUE_API_URL = "https://sapopemba-api.avenuesec.io"

export const PATH = {
    AUTHORIZE_APP: `${AVENUE_API_URL}/auth/authorize_app`,
    AUTHORIZATION_STATUS: `${AVENUE_API_URL}/auth/authorization_status`,
    AUTH_TOKENS: `${AVENUE_API_URL}/auth/tokens`,
    GET_PUBLIC_KEY: `${AVENUE_API_URL}/auth/keys`,
    REFRESH_TOKENS: `${AVENUE_API_URL}/auth/refresh_token`,
    GET_QUOTES: `${AVENUE_API_URL}/fx/quotes/latest`,
    GET_BALANCE_POSITION: `${AVENUE_API_URL}/account/balance_position`
}
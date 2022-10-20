import axios from "axios"

const API_KEY = ""
const AVENUE_API_URL = ""
const AUTHORIZE_APP = `${AVENUE_API_URL}/auth/authorize_app`
const AUTHORIZATION_STATUS = `${AVENUE_API_URL}/auth/authorizaiton_status`
const AUTH_TOKENS = `${AVENUE_API_URL}/auth/tokens`
const GET_PUBLIC_KEY = `${AVENUE_API_URL}/auth/keys`
const REFRESH_TOKENS = `${AVENUE_API_URL}/auth/refresh_token`

const CLIENT_ID = ""
const CLIENT_SECRET = ""
const USER_EMAIL = ""

class AuthorizeAppRequest {
    readonly params =  { key: API_KEY }
    readonly client_id: string = CLIENT_ID
    readonly client_secret: string = CLIENT_SECRET

    constructor(
        readonly user_email: string
    ) {}
}

class CodeRequest {
    readonly params =  { key: API_KEY }
    readonly client_id: string = CLIENT_ID
    readonly client_secret: string = CLIENT_SECRET

    constructor(
        readonly code: string
    ) {}
}

class RefreshTokensRequest {
    readonly params =  { key: API_KEY }
    readonly client_id: string = CLIENT_ID
    readonly client_secret: string = CLIENT_SECRET

    constructor(
        readonly access_token: string,
        readonly refresh_token: string,
        readonly code: string
    ) {}
}

interface AuthorizeAppResponse {
    access_token: string,
    refresh_token: string
    code: string
}

interface AuthorizeAppStatusResponse {
    decision_made: boolean,
    user_accepted: boolean,
    accepted_when: Date
}

interface TokensResponse {
    access_token: string,
    refresh_token: string
}

interface GetPublicKeyResponse {
    keys: [
        {
            kid: string, // KEY ID
            kty: string, // KEY TYPE
            alg: string, // ALGORITHM
            e: string,  
            n: string,  
            use: string 
        }
    ]
}

interface RefreshTokensResponse {

}

export class AvenueRequest {
    
    async authorizeApp(): Promise<AuthorizeAppResponse> {
        return await axios.post(
            AUTHORIZE_APP,
            new AuthorizeAppRequest(USER_EMAIL)
        )
    }

    async authorizizationStatus(code: string): Promise<AuthorizeAppStatusResponse> {
        return await axios.post(
            AUTHORIZATION_STATUS,
            new CodeRequest(code)
        ) 
    }

    async authTokens(code: string): Promise<TokensResponse> {
        return await axios.post(
            AUTH_TOKENS,
            new CodeRequest(code)
        )
    }

    async getPublicKey(): Promise<GetPublicKeyResponse> {
        return await axios.get(
            GET_PUBLIC_KEY,
            { params: { key: API_KEY }}
        )
    }

    async refreshTokens(
        code: string, 
        access_token: string, 
        refresh_token: string
    ): Promise<RefreshTokensResponse> {
        return await axios.post(
            REFRESH_TOKENS,
            new RefreshTokensRequest(access_token, refresh_token, code)
        )
    }

}
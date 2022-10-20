import axios from "axios"
import { CredentialRequest } from "./credential"
import { PATH } from "./path"
import { PROPS } from "./constant"

class AuthorizeAppRequest extends CredentialRequest {
    constructor(
        readonly user_email: string
    ) {
        super()
    }
}

class CodeRequest extends CredentialRequest {
    constructor(
        readonly code: string
    ) {
        super()
    }
}

class RefreshTokensRequest extends CredentialRequest {
    constructor(
        readonly access_token: string,
        readonly refresh_token: string,
        readonly code: string
    ) {
        super()
    }
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
    
    async authorizeApp(user_email: string): Promise<AuthorizeAppResponse> {
        return await axios.post(
            PATH.AUTHORIZE_APP,
            new AuthorizeAppRequest(user_email)
        )
    }

    async authorizizationStatus(code: string): Promise<AuthorizeAppStatusResponse> {
        return await axios.post(
            PATH.AUTHORIZATION_STATUS,
            new CodeRequest(code)
        ) 
    }

    async authTokens(code: string): Promise<TokensResponse> {
        return await axios.post(
            PATH.AUTH_TOKENS,
            new CodeRequest(code)
        )
    }

    async getPublicKey(): Promise<GetPublicKeyResponse> {
        return await axios.get(
            PATH.GET_PUBLIC_KEY,
            { params: { key: PROPS.API_KEY }}
        )
    }

    async refreshTokens(
        code: string, 
        access_token: string, 
        refresh_token: string
    ): Promise<RefreshTokensResponse> {
        return await axios.post(
            PATH.REFRESH_TOKENS,
            new RefreshTokensRequest(access_token, refresh_token, code)
        )
    }

}
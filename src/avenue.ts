import axios from "axios"
import { PATH } from "./path"
import { PROPS } from "./constant"
import { 
    AuthorizeAppRequest, 
    AuthorizeAppResponse, 
    AuthorizeAppStatusResponse, 
    CodeRequest, 
    TokensResponse,
    GetPublicKeyResponse,
    RefreshTokensRequest,
    QuotesResponse
} from "./models"

export class AvenueRequest {
    
    async authorizeApp(user_email: string): Promise<AuthorizeAppResponse> {
        return await axios.post(
            `${PATH.AUTHORIZE_APP}?key=${PROPS.API_KEY}`,
            new AuthorizeAppRequest(user_email)
        ).then(result => result.data)
        .catch(error => console.log(error))
    }

    async authorizationStatus(code: string): Promise<AuthorizeAppStatusResponse> {
        return await axios.post(
            `${PATH.AUTHORIZATION_STATUS}?key=${PROPS.API_KEY}`,
            new CodeRequest(code)
        ).then(result => result.data)
        .catch(error => console.log(error))
    }

    async authTokens(code: string): Promise<TokensResponse> {
        return await axios.post(
            `${PATH.AUTH_TOKENS}?key=${PROPS.API_KEY}`,
            new CodeRequest(code)
        ).then(result => result.data)
        .catch(error => console.log(error))
    }

    async getPublicKey(): Promise<GetPublicKeyResponse> {
        return await axios.get(
            PATH.GET_PUBLIC_KEY,
            { params: { key: PROPS.API_KEY }}
        ).then(result => result.data)
        .catch(error => console.log(error))
    }

    async refreshTokens(
        code: string, 
        access_token: string, 
        refresh_token: string
    ): Promise<TokensResponse> {
        return await axios.post(
            `${PATH.REFRESH_TOKENS}?key=${PROPS.API_KEY}`,
            new RefreshTokensRequest(access_token, refresh_token, code)
        ).then(result => result.data)
        .catch(error => console.log(error))
    }

    async getQuotes(access_token: string): Promise<QuotesResponse> {
        return await axios.get(
            `${PATH.GET_QUOTES}?key=${PROPS.API_KEY}`,
            { headers: { "Authorization": `Bearer ${access_token}` } }
        ).then(result => result.data)
        .catch(error => console.log(error))
    }

    async getPositionAssets(access_token: string): Promise<QuotesResponse> {
        return await axios.get(
            `${PATH.GET_BALANCE_POSITION}?key=${PROPS.API_KEY}`,
            { headers: { "Authorization": `Bearer ${access_token}` } }
        ).then(result => result.data)
        .catch(error => console.log(error))
    }
}
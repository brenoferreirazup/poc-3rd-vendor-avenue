import { AVENUECONFIGS } from "./constant"

class CredentialRequestBase {
    readonly client_id: string = AVENUECONFIGS.CLIENT_ID
    readonly client_secret: string = AVENUECONFIGS.CLIENT_SECRET
}

export class AuthorizeAppRequest extends CredentialRequestBase {
    constructor(
        readonly user_email: string
    ) {
        super()
    }
}

export class CodeRequest extends CredentialRequestBase {
    constructor(
        readonly code: string
    ) {
        super()
    }
}

export class RefreshTokensRequest extends CredentialRequestBase {
    constructor(
        readonly access_token: string,
        readonly refresh_token: string,
        readonly code: string
    ) {
        super()
    }
}

export interface AuthorizeAppResponse {
    code: string
}

export interface AuthorizeAppStatusResponse {
    decision_made: boolean,
    user_accepted: boolean,
    accepted_when: Date
}

export interface TokensResponse {
    access_token: string,
    refresh_token: string
}

export interface Key {
    kid: string, // KEY ID
    kty: string, // KEY TYPE
    alg: string, // ALGORITHM
    e: string,  
    n: string,  
    use: string 
}

export interface GetPublicKeyResponse {
    keys: Key[]
}

export interface QuotesResponse {
    rate: number
}

export interface BalanceResponse {
    open_buy: number,
    open_sell: number,
    buy_power: number,
    available: number,
    blocked: number
}

export interface PositionAssetsResponse {
    name: string,
    url_image: string,
    symbol: string,
    qty: number,
    avpx: number,
    open_buy: number,
    open_sell: number,
    category: number
}

export interface PositionResponse {
    balance_usd: BalanceResponse,
    balance_brl: BalanceResponse,
    position_assets: PositionAssetsResponse[]
}
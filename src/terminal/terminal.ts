import * as dotenv from 'dotenv'
dotenv.config()
import { AvenueRequest } from "../avenue.js"
import { PATH } from '../path.js'
import { AVENUECONFIGS } from "../constant.js"

const sout = (path: string, response: any) => {
    console.log('[AVENUE RESPONSE]');
    console.log(`${path}`);
    console.log(response, '\n');
}

(async function(){
    let response = {}
    const avenue = new AvenueRequest()

    const authorizeAppResponse = await avenue.authorizeApp(AVENUECONFIGS.CLIENT_EMAIL)
    sout(PATH.AUTHORIZE_APP, authorizeAppResponse)

    response = await avenue.authorizationStatus(authorizeAppResponse.code)
    sout(PATH.AUTHORIZATION_STATUS, response)

    const tokenResponse = await avenue.authTokens(authorizeAppResponse.code)
    sout(PATH.AUTH_TOKENS, tokenResponse)

    response = await avenue.getQuotes(tokenResponse.access_token)
    sout(PATH.GET_QUOTES, response)

    response = await avenue.getPositionAssets(tokenResponse.access_token)
    sout(PATH.GET_BALANCE_POSITION, response)

    response = await avenue.refreshTokens(authorizeAppResponse.code, tokenResponse.access_token, tokenResponse.refresh_token)
    sout(PATH.REFRESH_TOKENS, response)
})()
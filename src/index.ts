import { AvenueRequest } from "./avenue"
import { PATH } from './path'


(async function(){
    let response = {}
    const avenue = new AvenueRequest()

    // nyzdlinxxym3tqfk42skgj@avenue.us
    // rtgmvgrjsfhxxjlxjb7ogm@avenue.us
    // sbdsjrm27nialvsobfctza@avenue.us
    const authorizeAppResponse = await avenue.authorizeApp("nyzdlinxxym3tqfk42skgj@avenue.us")
    console.log(`${PATH.AUTHORIZE_APP}`, authorizeAppResponse)

    response = await avenue.authorizationStatus(authorizeAppResponse.code)
    console.log(`${PATH.AUTHORIZATION_STATUS}`, response)

    const tokenResponse = await avenue.authTokens(authorizeAppResponse.code)
    console.log(`${PATH.AUTH_TOKENS}`, tokenResponse)

    response = await avenue.getQuotes(tokenResponse.access_token)
    console.log(`${PATH.GET_QUOTES}`, response)

    response = await avenue.getPositionAssets(tokenResponse.access_token)
    console.log(`${PATH.GET_BALANCE_POSITION}`, response)

    response = await avenue.refreshTokens(authorizeAppResponse.code, tokenResponse.access_token, tokenResponse.refresh_token)
    console.log(`${PATH.REFRESH_TOKENS}`, response)
})()
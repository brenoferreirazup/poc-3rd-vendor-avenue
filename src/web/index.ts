import express, { Express, Request, Response } from 'express'

import { AvenueRequest } from '../avenue'
import { AVENUECONFIGS } from '../constant'

const WEBSERVERPORT = 3333
const app = express()

app.get('/avenue/all-api-requests', async (request: Request, response: Response) => {

    const avenue = new AvenueRequest()

    try {
        const authorizeAppResponse = await avenue.authorizeApp(AVENUECONFIGS.CLIENT_EMAIL)
        const authorizationStatusResponse = await avenue.authorizationStatus(authorizeAppResponse.code)
        const tokenResponse = await avenue.authTokens(authorizeAppResponse.code)
        const getQuoteResponse = await avenue.getQuotes(tokenResponse.access_token)
        const getPositionAuthResponse = await avenue.getPositionAssets(tokenResponse.access_token)
        const refreshTokenResponse = await avenue.refreshTokens(authorizeAppResponse.code, tokenResponse.access_token, tokenResponse.refresh_token)
    
        response.status(200).json({
            vendor: {
                name: "Avenue",
                url: process.env.BASE_URL
            },
            responses: [ 
                {
                    endpoint: '/auth/authorize_app',
                    response: authorizeAppResponse
                },
                {
                    endpoint: '/auth/authorization_status',
                    response: authorizationStatusResponse
                },
                {
                    endpoint: '/auth/tokens',
                    response: tokenResponse
                },
                {
                    endpoint: '/fx/quotes/latest',
                    response: getQuoteResponse
                },
                {
                    endpoint: '/account/balance_position',
                    response: getPositionAuthResponse
                },
                {
                    endpoint: '/auth/refresh_token',
                    response: refreshTokenResponse
                }
            ]
        })
    } catch (error) {
        console.log('[ERROR]: ', error)
        response.status(500).json({
            message: "Unable to execute the request sequence, please check your terminal."
        })
    }
})

app.listen(WEBSERVERPORT, () => {
    console.log(`[APPLICATION UP AND RUNNING ON PORT ${WEBSERVERPORT}]`)
})
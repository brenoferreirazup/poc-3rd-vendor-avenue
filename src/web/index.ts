import * as dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

dotenv.config()
const app = express()


const PORT = 3333

app.listen(PORT, () => {
    console.log(`[APPLICATION UP AND RUNNING ON PORT ${PORT}]`)
})
import { PROPS } from "./constant"

export class CredentialRequest {
    readonly params =  { key: PROPS.API_KEY }
    readonly client_id: string = PROPS.CLIENT_ID
    readonly client_secret: string = PROPS.CLIENT_SECRET
}
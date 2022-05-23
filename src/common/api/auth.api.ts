import { HttpStatus, Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

export type CheckTokenReq = {
    token: string
}

export type CheckTokenResult = "ok" | "invalid"

export type CheckTokenResp = {
    result: CheckTokenResult
}


/**
 * AuthApi implementation
 *
 * @export
 * @class AuthApi
 */
@Injectable()
export class AuthApi {
    /**
     * baseUrl of api
     *
     * @private
     * @type {string}
     * @memberof AuthApi
     */
    private readonly baseUrl: string

    /**
     * Creates an instance of AuthApi.
     * @param {HttpService} httpService
     * @param {ConfigService} configService
     * @memberof AuthApi
     */
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrl = configService.get<string>("PARKING_AUTH_API_URI")
    }

    /**
     * checkToken method
     *
     * @param {CheckTokenReq} req
     * @return {*}  {Promise<CheckTokenResp>}
     * @memberof AuthApi
     */
    async checkToken(
        req: CheckTokenReq,
    ): Promise<CheckTokenResp> {
        const resp = this.httpService.post(
            this.baseUrl + '/auth/checkToken',
            req,
            {

            }
        )
        
        try {    
            const result = await firstValueFrom(resp)
            switch (result.status) {
                case HttpStatus.OK:
                    return {
                        result: "ok"
                    }
                default:
                    return {
                        result: "invalid"
                    }
            }
        } catch(e) {
            return {
                result: "invalid"
            }
        }
    }
}
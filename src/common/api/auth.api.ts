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


@Injectable()
export class AuthApi {
    private readonly baseUrl: string

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrl = configService.get<string>("PARKING_AUTH_API_URI")
    }

    async checkToken(
        req: CheckTokenReq,
    ): Promise<CheckTokenResp> {
        const resp = this.httpService.post(
            this.baseUrl + '/auth/checkToken',
            req,
            {

            }
        )

        const result = await firstValueFrom(resp)
        switch (result.data) {
            case HttpStatus.OK:
                return {
                    result: "ok"
                }
            default:
                return {
                    result: "invalid"
                }
        }
    }
}
import { HttpException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";

import { Request, Response, NextFunction } from 'express';
import { AuthApi, CheckTokenResp } from "../api/auth.api";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly authApi: AuthApi,
    ) {

    }

    async use(req: Request, res: Response, next: NextFunction ) {
        const authHeader = req.headers.authorization
        if(authHeader == undefined) {
            throw new UnauthorizedException()
        }

        const [_, token] = authHeader.split(" ")
        if(token == undefined) {
            throw new UnauthorizedException()
        }
        const resp = await this.authApi.checkToken({token: token})
        if (resp.result == "invalid") {
            throw new UnauthorizedException()
        }

        next()
    }

}
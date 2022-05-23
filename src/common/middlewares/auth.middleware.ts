import { HttpException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";

import { Request, Response, NextFunction } from 'express';
import { AuthApi, CheckTokenResp } from "../api/auth.api";

/**
 * AuthMiddleware to auth req
 *
 * @export
 * @class AuthMiddleware
 * @implements {NestMiddleware}
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    /**
     * Creates an instance of AuthMiddleware.
     * @param {AuthApi} authApi
     * @memberof AuthMiddleware
     */
    constructor(
        private readonly authApi: AuthApi,
    ) {

    }

    /**
     * middleware method
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof AuthMiddleware
     */
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
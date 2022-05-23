import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { parseJwt } from "../utils/get-jwt-payload";

/**
 * Decorator to get userId from req token
 *
 * @export
 * @constant UserId
 */
export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest<Request>()
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return 0
        }

        const [_, token] = authHeader.split(" ")
        if(!token) {
            return 0
        }

        const {payload: {userId}} = parseJwt(token)

        return userId
    }
)
import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../models/roles";
import { Request } from "express";
import { parseJwt } from "../utils/get-jwt-payload";
// import { JwtService } from "@nestjs/jwt";


/**
 * Roles guard to check if user can run method
 *
 * @export
 * @class RoleGuard
 * @implements {CanActivate}
 */
@Injectable()
export class RoleGuard implements CanActivate { 
    /**
     * Creates an instance of RoleGuard.
     * @param {Reflector} reflector
     * @memberof RoleGuard
     */
    constructor (
        private reflector: Reflector, 
        // private readonly jwtService: JwtService,
    ) {}
    
    /**
     * can active method
     *
     * @param {ExecutionContext} context
     * @return {*}  {(boolean | Promise<boolean> | Observable<boolean>)}
     * @memberof RoleGuard
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass()
            ]
        )

        const req = context.switchToHttp().getRequest<Request>()
        const authHeader = req.headers.authorization
        if (authHeader == undefined) {
            return false
        }

        const [_, token] = authHeader.split(" ")
        if (token == undefined) {
            return false
        }
        const {payload: {role: decodedRole}} = parseJwt(token)

        return requiredRoles.some((role) => decodedRole.includes(role))
    }

}
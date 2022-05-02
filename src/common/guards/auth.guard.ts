import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../models/roles";
import { Request } from "express";
import { parseJwt } from "../utils/get-jwt-payload";
// import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private reflector: Reflector, 
        // private readonly jwtService: JwtService,
    ) {}
    
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
        const {role: decodedRole} = parseJwt(token)

        return requiredRoles.some((role) => decodedRole.includes(role))
    }

}
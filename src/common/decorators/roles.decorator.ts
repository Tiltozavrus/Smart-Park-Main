import { SetMetadata } from "@nestjs/common";
import { Role } from "../models/roles";

/**
 * Roles key in metadata
 *
 * @export
 * @constant ROLES_KEY
 */
export const ROLES_KEY = 'roles';

/**
 * Roles decorator for roles guard
 * 
 *
 * @export
 * @constant Roles
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
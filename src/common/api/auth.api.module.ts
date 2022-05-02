import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthApi } from "./auth.api";

@Module(
    {
        imports: [
            HttpModule,
            ConfigModule,
        ],
        exports: [
            AuthApi,
        ],
        providers: [
            AuthApi,
        ]
    }
)
export class AuthApiModule{}
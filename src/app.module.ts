import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthApiModule } from './common/api/auth.api.module';
import { ParkingController } from './parking/parking.controller';
import { ParkingModule } from './parking/parking.module';
import { HttpModule } from "@nestjs/axios";
import { AuthMiddleware } from './common/middlewares/auth.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(
            {
                isGlobal: true,
            }
        ),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                autoLoadEntities: true,
                synchronize: true,
                url: configService.get<string>("PARKING_DATABASE_URI")
            }),
            inject: [ConfigService]
        }),
        ParkingModule,
        HttpModule,
        AuthApiModule,
    ],
    controllers: [
        
    ],
    providers: [
        
    ],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(ParkingController)
    }

}

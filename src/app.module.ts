import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from './parking/parking.module';

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
        ParkingModule
    ],
    controllers: [
        
    ],
    providers: [
        
    ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkPlace } from './entity/park-place.entity';
import { Park } from './entity/park.entity';
import { ParkPlacesInfo } from './entity/park-place-info.entity';
import { ReservedPlace } from './entity/reserved-place.entity';
import { ReservedPlaceInfo } from './entity/reserved-place-info.entity';
import { AuthApiModule } from '../common/api/auth.api.module';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                Park,
                ParkPlacesInfo,
                ParkPlace,
                ReservedPlace,
                ReservedPlaceInfo,
            ]
        ),
        ConfigModule,
        AuthApiModule,
        HttpModule,
    ],
    providers: [
        ParkingService
    ],
    controllers: [
        ParkingController
    ]
})
export class ParkingModule {}

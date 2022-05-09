import { GoneException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geometry, Point } from 'geojson';
import { FindOneOptions, Repository, Timestamp } from 'typeorm';
import { CreateParkReq } from './dto/create-park.dto';
import { GetParkParams } from './dto/get-park.dto';
import { GetParksParams } from './dto/get-parks.dto';
import { ParkPlacesInfo } from './entity/park-place-info.entity';
import { ParkPlace } from './entity/park-place.entity';
import { Park } from './entity/park.entity';
import { ReservedPlace } from './entity/reserved-place.entity';
import { ParkEdges, ParkEdgesUtils } from './models/park-edges.model';
import { PlaceType } from './models/place-type';
import { ParkingServiceError, ParkingServiceErrorType } from './parking.service.errors';

@Injectable()
export class ParkingService {
    constructor(
        @InjectRepository(Park)
        private readonly parkReposiotry: Repository<Park>,

        @InjectRepository(ParkPlacesInfo)
        private readonly parkPlacesInfoReposiotry: Repository<ParkPlacesInfo>,

        @InjectRepository(ParkPlace)
        private readonly parkPlaceReposiotry: Repository<ParkPlace>,

        @InjectRepository(ReservedPlace)
        private readonly reservedPlaceReposiotry: Repository<ReservedPlace>,
    ) {
    }

    createPark(
        req: CreateParkReq
    ) {
        const merged =  this.parkReposiotry.merge(
            this.parkReposiotry.create(),
            req,
        )
        
        return this.parkReposiotry.save(
            merged
        )
    }

    getPark(
        id: number,
        params: GetParkParams
    ) {
        return this.parkReposiotry.findOne(
            id,
            {
                relations: params.edges 
            }
        )
    }

    getParks(
        params: GetParksParams,
    ) {
        return this.parkReposiotry.find(
            {
                relations: params.edges,
            }
        )
    }

    async getLastParkPlacesInfo(
        parkId: number
    ) {
        return this.parkPlacesInfoReposiotry.findOne(
            {
                where: {
                    park: {
                        id: parkId
                    }
                }
            }
        )
    }

    createParkPlaceInfo(
        parkId: number,
        req: {
            freeSpaces: number,
            occupiedSpaces: number,
        }
    ) {
        const info = this.parkPlacesInfoReposiotry.merge(
            this.parkPlacesInfoReposiotry.create(),
            req,
        )

        info.park = this.createForeignPark(parkId)

        return this.parkPlacesInfoReposiotry.save(info)
    }

    createParkPlace(
        parkId: number,
        req: {
            floor: number,
            placeUUID: string,
            placeType: PlaceType,
            coords: Point
        }
    ) {
        const place = this.parkPlaceReposiotry.merge(
            this.parkPlaceReposiotry.create(),
            req,
        )

        place.park = this.createForeignPark(parkId)

        return this.parkPlaceReposiotry.save(place)
    }

    private createForeignPark(parkId: number): Park {
        return this.parkReposiotry.merge(
            this.parkReposiotry.create(),
            {
                id: parkId,
            }
        )
    }

    private createForeignParkPlace(
        placeId: number,
    ) {
        return this.parkPlaceReposiotry.merge(
            this.parkPlaceReposiotry.create(),
            {
                id: placeId,
            }
        )
    }

    async placeIsReserved(
        placeId: number
    ) {
        const reservedPlace = await this.reservedPlaceReposiotry.findOne(
            {
                where: {
                    parkPlace: {
                        id: placeId
                    }
                },
                order: {
                    createdAt: 'ASC'
                }
            }
        )

        if(!reservedPlace || reservedPlace.done) {
            return false
        }

        return true
    }

    async getPlace(
        placeId: number,
    ) {
        return this.parkPlaceReposiotry.findOne(placeId)
    }

    async reservePlace(
        placeId: number,
        req: {
            from: Date,
            to: Date,
            user_id: number
        }
    ) {
        const place = await this.getPlace(placeId)
        if(!place) {
            throw new ParkingServiceError(ParkingServiceErrorType.PlaceNotFound)
        }

        const reservedForUser = await this.getReservedPlaceForUser(req.user_id)
        if(reservedForUser) {
            throw new ParkingServiceError(ParkingServiceErrorType.UserAlreadyReservePlace)
        }
        
        if((await this.placeIsReserved(placeId))) {
            throw new ParkingServiceError(ParkingServiceErrorType.PlaceIsReserved)
        }

        const reservePlace = this.reservedPlaceReposiotry.merge(
            this.reservedPlaceReposiotry.create(),
            req,
        )

        reservePlace.parkPlace = place

        return this.reservedPlaceReposiotry.save(reservePlace)
    }

    getReservedPlaceForUser(
        userId: number
    ) {
        return this.reservedPlaceReposiotry.findOne(
            {
                where: {
                    user_id: userId,
                    done: false,
                },
                
            }
        )
    }
}

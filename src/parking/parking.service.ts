import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geometry, Point } from 'geojson';
import { FindOneOptions, Repository, Timestamp } from 'typeorm';
import { CreateParkReq } from './dto/create-park.dto';
import { GetParkParams } from './dto/get-park.dto';
import { GetParksParams } from './dto/get-parks.dto';
import { ParkPlacesInfo } from './entity/park-place-info.entity';
import { ParkPlace } from './entity/park-place.entity';
import { Park } from './entity/park.entity';
import { ParkEdges, ParkEdgesUtils } from './models/park-edges.model';
import { PlaceType } from './models/place-type';

@Injectable()
export class ParkingService {
    constructor(
        @InjectRepository(Park)
        private readonly parkReposiotry: Repository<Park>,

        @InjectRepository(ParkPlacesInfo)
        private readonly parkPlacesInfoReposiotry: Repository<ParkPlacesInfo>,

        @InjectRepository(ParkPlace)
        private readonly parkPlaceReposiotry: Repository<ParkPlace>
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
}

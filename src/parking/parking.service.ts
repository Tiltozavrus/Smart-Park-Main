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

/**
 * Parking service implementetion
 *
 * @export
 * @class ParkingService
 */
@Injectable()
export class ParkingService {
    /**
     * Creates an instance of ParkingService.
     * @param {Repository<Park>} parkReposiotry
     * @param {Repository<ParkPlacesInfo>} parkPlacesInfoReposiotry
     * @param {Repository<ParkPlace>} parkPlaceReposiotry
     * @param {Repository<ReservedPlace>} reservedPlaceReposiotry
     * @memberof ParkingService
     */
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

    /**
     * create park
     *
     * @param {CreateParkReq} req
     * @return {*} 
     * @memberof ParkingService
     */
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

    /**
     * get park
     *
     * @param {number} id
     * @param {GetParkParams} params
     * @return {*} 
     * @memberof ParkingService
     */
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

    /**
     * get parks with filtering and edges
     *
     * @param {GetParksParams} params
     * @return {*} 
     * @memberof ParkingService
     */
    getParks(
        params: GetParksParams,
    ) {
        return this.parkReposiotry.find(
            {
                relations: params.edges,
            }
        )
    }

    /**
     * get last park info of park
     *
     * @param {number} parkId
     * @return {*} 
     * @memberof ParkingService
     */
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

    /**
     * ceate parkPlace info list
     *
     * @param {number} parkId
     * @param {{
     *             freeSpaces: number,
     *             occupiedSpaces: number,
     *         }} req
     * @return {*} 
     * @memberof ParkingService
     */
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

    /**
     * create park place
     *
     * @param {number} parkId
     * @param {{
     *             floor: number,
     *             placeUUID: string,
     *             placeType: PlaceType,
     *             coords: Point
     *         }} req
     * @return {*} 
     * @memberof ParkingService
     */
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

    /**
     * create foreign park
     *
     * @private
     * @param {number} parkId
     * @return {*}  {Park}
     * @memberof ParkingService
     */
    private createForeignPark(parkId: number): Park {
        return this.parkReposiotry.merge(
            this.parkReposiotry.create(),
            {
                id: parkId,
            }
        )
    }

    /**
     * create foreign park place
     *
     * @private
     * @param {number} placeId
     * @return {*} 
     * @memberof ParkingService
     */
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

    /**
     * check if place reserved
     *
     * @param {number} placeId
     * @return {*} 
     * @memberof ParkingService
     */
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

    /**
     * get park place
     *
     * @param {number} placeId
     * @return {*} 
     * @memberof ParkingService
     */
    async getPlace(
        placeId: number,
    ) {
        return this.parkPlaceReposiotry.findOne(
            {
                where: {
                    id: placeId,
                },
                relations: ['park']
            }
        )
    }

    /**
     * resreve place
     *
     * @param {number} placeId
     * @param {{
     *             from: Date,
     *             to: Date,
     *             user_id: number
     *         }} req
     * @return {*} 
     * @memberof ParkingService
     */
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

        const lastInfo = await this.getLastParkPlacesInfo(place.park.id)
        this.createParkPlaceInfo(
            place.park.id,
            {
                freeSpaces: lastInfo.freeSpaces - 1,
                occupiedSpaces: lastInfo.occupiedSpaces + 1,
            }
        )

        return this.reservedPlaceReposiotry.save(reservePlace)
    }

    /**
     * cancel reserve
     *
     * @param {number} reservedPlaceId
     * @param {{
     *             user_id: number,
     *         }} req
     * @memberof ParkingService
     */
    async cancelReserve(
        reservedPlaceId: number,
        req: {
            user_id: number,
        }
    ) {
        const resrvedPlace = await this.reservedPlaceReposiotry.findOne(
            {
                where: {
                    id: reservedPlaceId,
                },
                relations: ['parkPlace', 'parkPlace.park']
            }
        )
        if(!resrvedPlace) {
            throw new ParkingServiceError(ParkingServiceErrorType.ReservedPlaceNotFound)
        }

        if (resrvedPlace.user_id != req.user_id) {
            throw new ParkingServiceError(ParkingServiceErrorType.YouNotReserveThisPlace)
        }

        const lastInfo = await this.getLastParkPlacesInfo(resrvedPlace.parkPlace.park.id)
        this.createParkPlaceInfo(
            resrvedPlace.parkPlace.park.id,
            {
                freeSpaces: lastInfo.freeSpaces + 1,
                occupiedSpaces: lastInfo.occupiedSpaces - 1,
            }
        )

        resrvedPlace.done = true
        this.reservedPlaceReposiotry.save(resrvedPlace)
    }

    /**
     * get reserved place for user
     *
     * @param {number} userId
     * @return {*} 
     * @memberof ParkingService
     */
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

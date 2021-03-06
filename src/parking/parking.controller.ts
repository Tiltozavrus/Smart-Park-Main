import { BadRequestException, Body, Catch, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { Roles } from '../common/decorators/roles.decorator';
import { UserId } from '../common/decorators/user-id.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { Role } from '../common/models/roles';
import { ParkingServiceError, ParkingServiceErrorType } from './parking.service.errors';
import { ValueOrArrayToArray } from '../common/pipes/vallue-or-array-to-array.pipe';
import { ValuesInEnumPipe } from '../common/pipes/value-in-enum.pipe';
import { CreateParkPlaceReq } from './dto/create-park-place.dto';
import { CreateParkReq, CreateParkResp } from './dto/create-park.dto';
import { CreateReservePlaceReq } from './dto/create-reserve-place.dto';
import { GetParkPlaceInfoResp } from './dto/get-park-place-info.dto';
import { GetParkParams, GetParkResp } from './dto/get-park.dto';
import { GetParksParams, GetParksResp } from './dto/get-parks.dto';
import { ParkEdges, ParkEdgesUtils } from './models/park-edges.model';
import { ParkingService } from './parking.service';
import { GetReservedPlaceResp } from './dto/get-reserve-place.dto';
import { GetParkPlaceResp } from './dto/get-park-place.dto';

/**
 * parking controller for http requests
 *
 * @export
 * @class ParkingController
 */
@ApiTags("parking")
@Controller('parking')
export class ParkingController {

    /**
     * Creates an instance of ParkingController.
     * @param {ParkingService} service
     * @memberof ParkingController
     */
    constructor(
        private readonly service: ParkingService,
    ) {}

    /**
     * create park
     *
     * @param {CreateParkReq} req
     * @return {*} 
     * @memberof ParkingController
     */
    @Post()
    @ApiBody({type: CreateParkReq})
    @ApiResponse({type: CreateParkResp, status: 201})
    @ApiBearerAuth()
    async createPark(
        @Body() req: CreateParkReq,
    ) {
        return this.service.createPark(req).then(
            (park) => {
                this.service.createParkPlaceInfo(park.id, {freeSpaces: park.totalPlaces, occupiedSpaces: 0})
                return park
            }
        )
    }

    /**
     * get park by id
     *
     * @param {number} id
     * @param {GetParkParams} query
     * @return {*} 
     * @memberof ParkingController
     */
    @Get('/:id')
    @ApiResponse({type: GetParkResp})
    @ApiQuery({enum: ParkEdges, isArray: true, enumName: "edges", required: false, name: 'edges'})
    @ApiParam({name: 'id', description: "id of park", type: Number})
    @ApiBearerAuth()
    getPark(
        @Param('id') id: number,
        @Query(
            new ValueOrArrayToArray<GetParkParams, string>(
                value => value.edges,
                (value, array) => value.edges = array
            ),
            new ValuesInEnumPipe<GetParkParams>(
                value => value.edges,
                value => ParkEdgesUtils.valueIn(value),
                (value, newValues) => value.edges = newValues
            )
        ) query: GetParkParams
    ) {
        return this.service.getPark(
            id,
            query,
        )
    }

    /**
     * get parks
     *
     * @param {GetParksParams} query
     * @return {*} 
     * @memberof ParkingController
     */
    @Get()
    @ApiResponse({type: GetParksResp, status: 200})
    @ApiQuery({enum: ParkEdges, isArray: true, enumName: "edges", required: false, name: 'edges'})
    @ApiBearerAuth()
    async getParks(
        @Query(
            new ValueOrArrayToArray<GetParksParams, string>(
                value => value.edges,
                (value, array) => value.edges = array
            ),
            new ValuesInEnumPipe<GetParksParams>(
                value => value.edges,
                value => ParkEdgesUtils.valueIn(value),
                (value, newValues) => value.edges = newValues
            )
        ) query: GetParksParams,
    ) {
        const parks = await this.service.getParks(query)
        return {
            items: parks
        }
    }

    /**
     * get last park place infos
     *
     * @param {number} id
     * @return {*} 
     * @memberof ParkingController
     */
    @Get('/:id/parkPlacesInfo/last')
    @ApiResponse({type: GetParkPlaceInfoResp, status: 200})
    @ApiParam({name: 'id', description: "id of park", type: Number})
    @ApiBearerAuth()
    async getLastParkPlacesInfo(
        @Param('id') id: number,
    ) {
        const lastParkPlaceInfo = await this.service.getLastParkPlacesInfo(id)
        if(!lastParkPlaceInfo) {
            throw new NotFoundException()
        }
        return lastParkPlaceInfo
    }

    /**
     * create park place
     *
     * @param {CreateParkPlaceReq} req
     * @param {number} id
     * @return {*} 
     * @memberof ParkingController
     */
    @Post('/:id/place')
    @ApiBody({type: CreateParkPlaceReq})
    @ApiParam({name: 'id', description: "id of park", type: Number})
    @ApiBearerAuth()
    @ApiResponse({type: GetParkPlaceResp, status: 201})
    async createPlace(
        @Body() req: CreateParkPlaceReq,
        @Param('id') id: number,
    ) {
        
        try {
            const place = await this.service.createParkPlace(id, req)
            return place
        } catch(e) {
            if(e instanceof QueryFailedError) {
                throw new NotFoundException("Park not found")
            }
        }
    }

    /**
     * resreve place
     *
     * @param {number} placeId
     * @param {number} userId
     * @param {CreateReservePlaceReq} req
     * @return {*} 
     * @memberof ParkingController
     */
    @Post('place/:placeId')
    @ApiParam({name: 'placeId', description: "id of place", type: Number})
    @ApiBody({type: CreateReservePlaceReq})
    @ApiResponse({type: GetReservedPlaceResp, status: 201})
    @ApiBearerAuth()
    async reservePlace(
        @Param('placeId') placeId: number,
        @UserId() userId: number,
        @Body() req: CreateReservePlaceReq,
    ) {
        try {
            const reserved = await this.service.reservePlace(placeId, {user_id: userId, ...req})
            return reserved
        } catch(e) {
            if(e instanceof ParkingServiceError) {
                switch(e.type) {
                    case ParkingServiceErrorType.PlaceIsReserved:
                        throw new BadRequestException(e.message)
                    case ParkingServiceErrorType.PlaceNotFound:
                        throw new NotFoundException(e.message)
                    case ParkingServiceErrorType.UserAlreadyReservePlace:
                        throw new BadRequestException(e.message)
                }
            }
            // If not catchable
            throw e
        }
    }

    /**
     * get reserved place for user
     *
     * @param {number} userId
     * @return {*} 
     * @memberof ParkingController
     */
    @Get('/place/reserved/me')
    @ApiResponse({type: GetReservedPlaceResp, status: 200})
    @ApiBearerAuth()
    async getReservedPlaceForUser(
        @UserId() userId: number,
    ) {
        const reservedPlace = await this.service.getReservedPlaceForUser(userId)
        if(!reservedPlace) {
            throw new NotFoundException(ParkingServiceErrorType.UserDontHaveReservedPlace)
        }
        return reservedPlace
    }

    /**
     * cancel reserved place for user
     *
     * @param {number} userId
     * @memberof ParkingController
     */
    @Delete('/place/reserved/cancel/me')
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    async cancelReserveForUser(
        @UserId() userId: number,
    ) {
        try {
            const reservedPlace = await this.getReservedPlaceForUser(userId)
            const _ = await this.service.cancelReserve(reservedPlace.id, {user_id: userId})
        } catch(e) {
            if(e instanceof ParkingServiceError) {
                switch(e.type) {
                    case ParkingServiceErrorType.ReservedPlaceNotFound:
                        throw new NotFoundException(ParkingServiceErrorType.ReservedPlaceNotFound)
                    case ParkingServiceErrorType.YouNotReserveThisPlace:
                        throw new ForbiddenException(ParkingServiceErrorType.ReservedPlaceNotFound)
                }
            }

            throw e
        }
    }
}

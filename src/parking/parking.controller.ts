import { Body, Catch, Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { Role } from '../common/models/roles';

import { ValueOrArrayToArray } from '../common/pipes/vallue-or-array-to-array.pipe';
import { ValuesInEnumPipe } from '../common/pipes/value-in-enum.pipe';
import { CreateParkPlaceReq } from './dto/create-park-place.dto';
import { CreateParkReq, CreateParkResp } from './dto/create-park.dto';
import { GetParkPlaceInfoResp } from './dto/get-park-place-info.dto';
import { GetParkParams, GetParkResp } from './dto/get-park.dto';
import { GetParksParams, GetParksResp } from './dto/get-parks.dto';
import { ParkEdges, ParkEdgesUtils } from './models/park-edges.model';
import { ParkingService } from './parking.service';

@ApiTags("parking")
@Controller('parking')
export class ParkingController {

    constructor(
        private readonly service: ParkingService,
    ) {}

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

    @Post('/:id/place')
    @ApiBody({type: CreateParkPlaceReq})
    @ApiParam({name: 'id', description: "id of park", type: Number})
    @ApiBearerAuth()
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
}

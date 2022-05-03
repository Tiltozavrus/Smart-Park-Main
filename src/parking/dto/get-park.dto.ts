import { ApiProperty } from "@nestjs/swagger"
import { randomUUID } from "crypto"
import { ParkPlace } from "../models/park-place.model"
import { ParkPlacesInfo } from "../models/park-places-info.model"
import { Park } from "../models/park.model"
import { GetParkPlaceInfoResp } from "./get-park-place-info.dto"
import { GetParkPlaceResp } from "./get-park-place.dto"

export class GetParkParams {
    edges?: [GetParkParamsEdges] | GetParkParamsEdges
}

export enum GetParkParamsEdges {
    ParkPlacesInfo = "parkPlacesInfo",
    ParkPlaces = "parkPlaces"
}

export class GetParkResp implements Park {
    @ApiProperty()
    id: number

    @ApiProperty(
        {
            example: randomUUID({})
        }
    )
    parkUUID: string

    @ApiProperty()
    longitude: number

    @ApiProperty()
    latitude: number

    @ApiProperty()
    address: string

    @ApiProperty()
    totalPlaces: number

    @ApiProperty({
        example: new Date(Date.now())
    })
    createdAt: Date

    @ApiProperty({
        example: new Date(Date.now())
    })
    updatedAt: Date

    @ApiProperty(
        {
            type: [GetParkPlaceInfoResp],
            nullable: true,
            required: false,
        }
    )
    parkPlacesInfo?: GetParkPlaceInfoResp[]

    @ApiProperty(
        {
            type: [GetParkPlaceResp],
            nullable: true,
            required: false,
        }
    )
    parkPlaces?: GetParkPlaceResp[]
}
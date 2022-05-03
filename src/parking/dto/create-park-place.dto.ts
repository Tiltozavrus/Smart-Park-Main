import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber, IsUUID } from "class-validator"
import { randomUUID } from "crypto"
import { Geometry, Position } from "geojson"
import { Point } from "../../common/models/point"
import { PlaceType } from "../models/place-type"

export class CreateParkPlaceReq {
    @ApiProperty()
    @IsNumber()
    floor: number

    @ApiProperty(
        {
            example: randomUUID(),
        }
    )
    @IsUUID()
    placeUUID: string

    @ApiProperty(
        {
            enum: PlaceType,
            example: PlaceType.Standart
        }
    )
    @IsEnum(PlaceType, {})
    placeType: PlaceType
    
    @ApiProperty(
        {
            example: {
                coordinates: [1, 2]
            },
            type: [Number, Number]
        }
    )
    coords: Point
}

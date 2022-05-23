import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber, IsUUID } from "class-validator"
import { randomUUID } from "crypto"
import { Geometry, Position } from "geojson"
import { Point } from "../../common/models/point"
import { PlaceType } from "../models/place-type"

/**
 * CreateParkPlaceReq
 *
 * @export
 * @class CreateParkPlaceReq
 */
export class CreateParkPlaceReq {
    /**
     * floor of place
     *
     * @type {number}
     * @memberof CreateParkPlaceReq
     */
    @ApiProperty()
    @IsNumber()
    floor: number

    /**
     * placeUUID
     *
     * @type {string}
     * @memberof CreateParkPlaceReq
     */
    @ApiProperty(
        {
            example: randomUUID(),
        }
    )
    @IsUUID()
    placeUUID: string

    /**
     * place type
     *
     * @type {PlaceType}
     * @memberof CreateParkPlaceReq
     */
    @ApiProperty(
        {
            enum: PlaceType,
            example: PlaceType.Standart
        }
    )
    @IsEnum(PlaceType, {})
    placeType: PlaceType
    
    /**
     * coords of place
     *
     * @type {Point}
     * @memberof CreateParkPlaceReq
     */
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

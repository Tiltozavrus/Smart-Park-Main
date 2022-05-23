import { ApiProperty } from "@nestjs/swagger"
import { randomUUID } from "crypto"
import { ParkEdges } from "../models/park-edges.model"
import { ParkPlace } from "../models/park-place.model"
import { ParkPlacesInfo } from "../models/park-places-info.model"
import { Park } from "../models/park.model"
import { GetParkPlaceInfoResp } from "./get-park-place-info.dto"
import { GetParkPlaceResp } from "./get-park-place.dto"

/**
 * query params 
 *
 * @export
 * @class GetParkParams
 */
export class GetParkParams {
    /**
     * edges of park
     *
     * @type {string[]}
     * @memberof GetParkParams
     */
    edges?: string[]
}

/**
 * park responce
 *
 * @export
 * @class GetParkResp
 * @implements {Park}
 */
export class GetParkResp implements Park {
    /**
     * park id
     *
     * @type {number}
     * @memberof GetParkResp
     */
    @ApiProperty()
    id: number

    /**
     * park UUID
     *
     * @type {string}
     * @memberof GetParkResp
     */
    @ApiProperty(
        {
            example: randomUUID({})
        }
    )
    parkUUID: string

    /**
     * longitude
     *
     * @type {number}
     * @memberof GetParkResp
     */
    @ApiProperty()
    longitude: number

    /**
     *     latitude
     *
     * @type {number}
     * @memberof GetParkResp
     */
    @ApiProperty()
    latitude: number

    /**
     * addres of park
     *
     * @type {string}
     * @memberof GetParkResp
     */
    @ApiProperty()
    address: string

    /**
     * total places in park
     *
     * @type {number}
     * @memberof GetParkResp
     */
    @ApiProperty()
    totalPlaces: number

    /**
     * created time of park
     *
     * @type {Date}
     * @memberof GetParkResp
     */
    @ApiProperty({
        example: new Date(Date.now())
    })
    createdAt: Date

    /**
     * updated time of park
     *
     * @type {Date}
     * @memberof GetParkResp
     */
    @ApiProperty({
        example: new Date(Date.now())
    })
    updatedAt: Date

    /**
     * parkPlacesInfo of park
     *
     * @type {GetParkPlaceInfoResp[]}
     * @memberof GetParkResp
     */
    @ApiProperty(
        {
            type: [GetParkPlaceInfoResp],
            nullable: true,
            required: false,
        }
    )
    parkPlacesInfo?: GetParkPlaceInfoResp[]

    /**
     * parkPlaces of park
     *
     * @type {GetParkPlaceResp[]}
     * @memberof GetParkResp
     */
    @ApiProperty(
        {
            type: [GetParkPlaceResp],
            nullable: true,
            required: false,
        }
    )
    parkPlaces?: GetParkPlaceResp[]
}
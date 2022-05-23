import { ApiProperty } from "@nestjs/swagger";
import { ParkPlacesInfo } from "../models/park-places-info.model";

/**
 * GetParkPlaceInfo respocne
 *
 * @export
 * @class GetParkPlaceInfoResp
 * @implements {ParkPlacesInfo}
 */
export class GetParkPlaceInfoResp implements ParkPlacesInfo{
    /**
     * id of park place ingo
     *
     * @type {number}
     * @memberof GetParkPlaceInfoResp
     */
    @ApiProperty({})
    id: number;

    /**
     * free spaces
     *
     * @type {number}
     * @memberof GetParkPlaceInfoResp
     */
    @ApiProperty({})
    freeSpaces: number;

    /**
     * occupied spaces
     *
     * @type {number}
     * @memberof GetParkPlaceInfoResp
     */
    @ApiProperty({})
    occupiedSpaces: number;

    /**
     * cratedAt of record
     *
     * @type {Date}
     * @memberof GetParkPlaceInfoResp
     */
    @ApiProperty({})
    createdAt: Date;
}
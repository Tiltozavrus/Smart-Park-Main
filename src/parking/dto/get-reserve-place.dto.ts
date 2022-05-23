import { ApiProperty } from "@nestjs/swagger";
import { ReservedPlace } from "../models/reserver-place.model";

/**
 * Get reserved place responce
 *
 * @export
 * @class GetReservedPlaceResp
 * @implements {ReservedPlace}
 */
export class GetReservedPlaceResp implements ReservedPlace{
    /**
     * id of reserved place entity
     *
     * @type {number}
     * @memberof GetReservedPlaceResp
     */
    @ApiProperty()
    id: number;

    /**
     * user id that reserve place
     *
     * @type {number}
     * @memberof GetReservedPlaceResp
     */
    @ApiProperty()
    user_id: number;

    /**
     * reserved from date
     *
     * @type {Date}
     * @memberof GetReservedPlaceResp
     */
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    from: Date;

    /**
     * reserved to date
     *
     * @type {Date}
     * @memberof GetReservedPlaceResp
     */
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    to: Date;
    
    /**
     * is done reserved process
     *
     * @type {boolean}
     * @memberof GetReservedPlaceResp
     */
    @ApiProperty(
        {
            example: true
        }
    )
    done: boolean;
    
    /**
     * createdAt date of entity
     *
     * @type {Date}
     * @memberof GetReservedPlaceResp
     */
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    createdAt: Date;
    
    /**
     * updateAt date of entity
     *
     * @type {Date}
     * @memberof GetReservedPlaceResp
     */
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    updatedAt: Date;

}
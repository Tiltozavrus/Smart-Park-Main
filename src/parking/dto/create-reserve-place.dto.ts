import { ApiProperty } from "@nestjs/swagger"
import { IsDateString } from "class-validator"

/**
 * created reserved place req
 *
 * @export
 * @class CreateReservePlaceReq
 */
export class CreateReservePlaceReq {
    /**
     * resreved from date
     *
     * @type {Date}
     * @memberof CreateReservePlaceReq
     */
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    @IsDateString()
    from!: Date

    /**
     * reserved to date
     *
     * @type {Date}
     * @memberof CreateReservePlaceReq
     */
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    @IsDateString()
    to!: Date
}
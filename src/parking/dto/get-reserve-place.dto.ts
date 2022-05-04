import { ApiProperty } from "@nestjs/swagger";
import { ReservedPlace } from "../models/reserver-place.model";

export class GetReservedPlaceResp implements ReservedPlace{
    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    from: Date;

    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    to: Date;
    
    @ApiProperty(
        {
            example: true
        }
    )
    done: boolean;
    
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    createdAt: Date;
    
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    updatedAt: Date;

}
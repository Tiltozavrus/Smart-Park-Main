import { ApiProperty } from "@nestjs/swagger"
import { IsDateString } from "class-validator"

export class CreateReservePlaceReq {
    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    @IsDateString()
    from!: Date

    @ApiProperty(
        {
            example: new Date(Date.now())
        }
    )
    @IsDateString()
    to!: Date
}
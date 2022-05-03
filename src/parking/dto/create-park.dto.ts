import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsLatitude, IsLongitude, IsString, IsUUID } from "class-validator"

export class CreateParkReq {
    @ApiProperty()
    @IsLongitude()
    longitude: number

    @ApiProperty()
    @IsLatitude()
    latitude: number

    @ApiProperty({example: "Проспект вернадского, д 78"})
    @IsString()
    address: string
    
    @ApiProperty({example: 12})
    @IsInt()
    totalPlaces: number

    @ApiProperty({example: "c2d29867-3d0b-d497-9191-18a9d8ee7830"})
    parkUUID: string
}

export class CreateParkResp {
    @ApiProperty()
    id: number

    @ApiProperty()
    parkUUID: string

    @ApiProperty()
    longitude: number

    @ApiProperty()
    latitude: number

    @ApiProperty()
    address: string

    @ApiProperty()
    totalPlaces: number

    @ApiProperty()
    createdAt: string

    @ApiProperty()
    updatedAt: string
}
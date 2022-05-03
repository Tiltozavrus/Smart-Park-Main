import { ApiProperty } from "@nestjs/swagger";
import { ParkPlacesInfo } from "../models/park-places-info.model";

export class GetParkPlaceInfoResp implements ParkPlacesInfo{
    @ApiProperty({})
    id: number;

    @ApiProperty({})
    freeSpaces: number;

    @ApiProperty({})
    occupiedSpaces: number;

    @ApiProperty({})
    createdAt: Date;
}
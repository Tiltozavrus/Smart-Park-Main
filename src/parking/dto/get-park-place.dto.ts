import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { Geometry } from "geojson";
import { Point } from "../../common/models/point";
import { ParkPlace } from "../models/park-place.model";
import { PlaceType } from "../models/place-type";

export class GetParkPlaceResp implements ParkPlace {
    @ApiProperty()
    id: number;

    @ApiProperty()
    floor: number;

    @ApiProperty(
        {
            example: randomUUID()
        }
    )
    placeUUID: string;

    @ApiProperty(
        {
            example: PlaceType.Standart,
        }
    )
    placeType: PlaceType;

    @ApiProperty(
        {
            example: {
                type: "Point",
                coordinates: [1, 2]
            },
        }
    )
    coords: Point;
}
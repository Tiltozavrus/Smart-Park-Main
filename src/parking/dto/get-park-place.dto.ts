import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { Geometry } from "geojson";
import { Point } from "../../common/models/point";
import { ParkPlace } from "../models/park-place.model";
import { PlaceType } from "../models/place-type";

/**
 * GetParkPlace respnce
 *
 * @export
 * @class GetParkPlaceResp
 * @implements {ParkPlace}
 */
export class GetParkPlaceResp implements ParkPlace {
    /**
     * id of park palce
     *
     * @type {number}
     * @memberof GetParkPlaceResp
     */
    @ApiProperty()
    id: number;

    /**
     * floor of place
     *
     * @type {number}
     * @memberof GetParkPlaceResp
     */
    @ApiProperty()
    floor: number;

    /**
     * place UUID
     *
     * @type {string}
     * @memberof GetParkPlaceResp
     */
    @ApiProperty(
        {
            example: randomUUID()
        }
    )
    placeUUID: string;

    /**
     * place type
     *
     * @type {PlaceType}
     * @memberof GetParkPlaceResp
     */
    @ApiProperty(
        {
            example: PlaceType.Standart,
        }
    )
    placeType: PlaceType;

    /**
     * coords of place
     *
     * @type {Point}
     * @memberof GetParkPlaceResp
     */
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
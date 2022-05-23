import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsLatitude, IsLongitude, IsString, IsUUID } from "class-validator"

/**
 * CreateParkReq body
 *
 * @export
 * @class CreateParkReq
 */
export class CreateParkReq {
    /**
     * longitude of park
     *
     * @type {number}
     * @memberof CreateParkReq
     */
    @ApiProperty()
    @IsLongitude()
    longitude: number

    /**
     * latitude of park
     *
     * @type {number}
     * @memberof CreateParkReq
     */
    @ApiProperty()
    @IsLatitude()
    latitude: number

    /**
     * address of park
     *
     * @type {string}
     * @memberof CreateParkReq
     */
    @ApiProperty({example: "Проспект вернадского, д 78"})
    @IsString()
    address: string
    
    /**
     * total places in the park
     *
     * @type {number}
     * @memberof CreateParkReq
     */
    @ApiProperty({example: 12})
    @IsInt()
    totalPlaces: number

    /**
     * parkUUID 
     *
     * @type {string}
     * @memberof CreateParkReq
     */
    @ApiProperty({example: "c2d29867-3d0b-d497-9191-18a9d8ee7830"})
    parkUUID: string
}

/**
 * create park respocne
 *
 * @export
 * @class CreateParkResp
 */
export class CreateParkResp {
    /**
     * id of park
     *
     * @type {number}
     * @memberof CreateParkResp
     */
    @ApiProperty()
    id: number

    /**
     * parkUUID 
     *
     * @type {string}
     * @memberof CreateParkResp
     */
    @ApiProperty()
    parkUUID: string

    /**
     * longitutde of park
     *
     * @type {number}
     * @memberof CreateParkResp
     */
    @ApiProperty()
    longitude: number

    /**
     * latitude of park
     *
     * @type {number}
     * @memberof CreateParkResp
     */
    @ApiProperty()
    latitude: number

    /**
     * address of park
     *
     * @type {string}
     * @memberof CreateParkResp
     */
    @ApiProperty()
    address: string

    /**
     * totalPlaces
     *
     * @type {number}
     * @memberof CreateParkResp
     */
    @ApiProperty()
    totalPlaces: number

    /**
     * createdAt date of park
     *
     * @type {string}
     * @memberof CreateParkResp
     */
    @ApiProperty()
    createdAt: string

    /**
     * updatedAt date of entity
     *
     * @type {string}
     * @memberof CreateParkResp
     */
    @ApiProperty()
    updatedAt: string
}
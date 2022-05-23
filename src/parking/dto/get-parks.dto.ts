import { ApiProperty } from "@nestjs/swagger";
import { GetParkResp } from "./get-park.dto";

/**
 * edges param
 *
 * @export
 * @class GetParksParams
 */
export class GetParksParams {
    /**
     * edges
     *
     * @type {string[]}
     * @memberof GetParksParams
     */
    edges?: string[]
}

/**
 * Get parks responce
 *
 * @export
 * @class GetParksResp
 */
export class GetParksResp {
    /**
     * parks
     *
     * @type {[GetParkResp]}
     * @memberof GetParksResp
     */
    @ApiProperty(
        {
            type: [GetParkResp],
        }
    )
    items: [GetParkResp]
}